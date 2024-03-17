import React, { useContext,useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate,Link } from "react-router-dom";

const DeletePost = () => {
  const {currentUser}=useContext(UserContext)
  const token=currentUser?.token;
  const navigate=useNavigate()
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])
  return (
    <Link to={`posts/users/deletePost`} className="btn btn-danger">
                  DELETE
                </Link>
  )
}

export default DeletePost