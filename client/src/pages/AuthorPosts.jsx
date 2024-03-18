import React, { useState,useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios'
import Loader from '../component/Loader'
import PostAuthor from "../component/PostAuthor";


const AuthorPosts = () => {
  const [resource,setResource] = useState([]);
  const [isLoading,setIsloading]=useState(false)

  const {id}=useParams()
 
  useEffect(()=>{
   const fetchPosts = async()=>{
     setIsloading(true);
     try {
       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`)
       setResource(response?.data)
     } catch (err) {
       console.log(err)
     }
     setIsloading(false)
   }
     fetchPosts()
  },[id])
 
  if(isLoading){
   return <Loader/>
  }
 
  return (
     <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
       {resource.map(({ _id:id, title, description,creator, thumbnail, category,createdAt }) => (
         <div key={id} className="col">
           <div className="card h-100">
             <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} className="card-img-top img-fluid" alt="post" /> {/* Ensure images are responsive */}
             <div className="card-body">
               <h5 className="card-title">{title}</h5>
               <p className="card-text">{description}</p>
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

export default AuthorPosts;
