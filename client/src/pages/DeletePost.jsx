import React, { useState,useContext,useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

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
    <div>DeletePost</div>
  )
}

export default DeletePost