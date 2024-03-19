import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import Loader from "./Loader";
import axios from 'axios'

const PostsItem = () => {
 const [resource,setResource] = useState([]);
 const [isLoading,setIsloading]=useState(false)
 const MAX_DESCRIPTION_LENGTH = 150;

 useEffect(()=>{
  const fetchPosts = async()=>{
    setIsloading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`)
      setResource(response?.data)
    } catch (err) {
      console.log(err)
    }
    setIsloading(false)
  }
    fetchPosts()
 },[])

 if(isLoading){
  return <Loader/>
 }

 const shortenDescription = (description) => {
  if (description.length <= MAX_DESCRIPTION_LENGTH) {
    return description;
  } else {
    return `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`;
  }
}

 return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {resource.map(({ _id:id, title, description,creator, thumbnail, category,createdAt }) => (
        <div key={id} className="col">
          <div className="card h-100">
            <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} className="card-img-top img-fluid" alt="post" /> {/* Ensure images are responsive */}
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p dangerouslySetInnerHTML={{__html: shortenDescription(description)}} />              
              <Link to={`posts/${id}`} className="btn btn-primary"> {/*Redirect to PostDetail */}
                Read More
              </Link>
              
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
              <PostAuthor authorId={creator} createdAt={createdAt} />
              <Link to={`posts/categories/${category}`} className="btn btn-light">
                {category}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
 );
};

export default PostsItem;
