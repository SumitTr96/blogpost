import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./avatar1.jpg";

const PostAuthor = () => {
  return (
    <div className="d-flex align-items-center">
      <Link
        to={"/AuthorPosts"}
        className="d-flex align-items-center text-decoration-none"
      >
        <img
          src={Avatar}
          alt="avatarImg"
          className="rounded-circle me-2"
          style={{
            width: "3rem",
            height: "3rem",
          }}
        />
        <h5 className="mb-0 d-none d-sm-block">David</h5>
      </Link>
    </div>
  );
};

export default PostAuthor;
