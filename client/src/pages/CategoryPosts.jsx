import PostsItem from "../component/PostsItem";
import React, { useState,useContext,useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const AuthorPosts = () => {
  const {currentUser}=useContext(UserContext)
  const token=currentUser?.token;
  const navigate=useNavigate()
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])
  return (
    <section>
      {
        <ul>
          <PostsItem />{" "}
          {/*The data will look same because it renders same home component*/}
        </ul>
      }
    </section>
  );
};

export default AuthorPosts;
