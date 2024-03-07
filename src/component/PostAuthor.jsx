import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from './avatar1.jpg'

const PostAuthor = () => {
  return (
    <div className="btn btn-secondary">

    <Link to={"/AuthorPosts"}>
      <Image
        src={+Avatar} alt="avatarImg"
        style={{
          width: "3rem",
          height: "3rem",
        }}
        roundedCircle
        ></Image>
      <h5 >David</h5>
    </Link>
        </div>
  );
};

export default PostAuthor;
