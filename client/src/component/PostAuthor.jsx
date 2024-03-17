import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const PostAuthor = ({authorId, createdAt}) => {
const [author,setAuthor]=useState([])

  useEffect(()=>{
    const getAuthor=async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorId}`)
      setAuthor(response?.data)
    } catch (error) {
      
    }
  }
  getAuthor()
  },[])

  return (
    <div className="d-flex align-items-center">
      <Link
        to={"/posts/users/sdfsdf"}
        className="d-flex align-items-center text-decoration-none"
      >
        <img
          src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`}
          alt="avatarImg"
          className="rounded-circle me-2"
          style={{
            width: "3rem",
            height: "3rem",
          }}
        />
        <h5 className="mb-0 d-none d-sm-block">By: {author?.name}</h5>
      </Link>
    </div>
  );
};

export default PostAuthor;
