import React, { useState,useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useNavigate, useParams} from "react-router-dom";
import axios from 'axios'
import Loader from '../component/Loader'
import DeletePost from './DeletePost'

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const {currentUser}=useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
  const {id} = useParams()


  const token=currentUser?.token;
  const navigate=useNavigate()
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])

  useEffect(()=>{
  const fetchPost=async()=>{
    setIsLoading(true)
    try {
      const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`,
      {withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
      setPosts(response.data)

    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  fetchPost()
  },[id,token])
  
  if(isLoading){
    return <Loader/>
  }

  return (
    <section className="dashboard py-4">
      <div className="container">
        {posts.map((post) => (
          <article key={post.id} className="dashboard_post mb-4 border rounded">
            <div className="row">
              <div className="col-md-4">
                <img
                  src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`}
                  className=" img-fluid"
                  alt="authorDp"
                />
              </div>
              <div className="col-md-8">
                <h5 className="mb-0">{post.title}</h5>
                <div className="d-flex justify-content-end">
                  <Link
                    to={`/posts/${post._id}`}
                    className="btn btn-link text-primary mr-2"
                  >
                    View
                  </Link>
                  <Link
                    to={`/posts/${post._id}/edit`}
                    className="btn btn-link text-warning mr-2"
                  >
                    Edit
                  </Link>
                  <DeletePost postId={post._id}/>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
