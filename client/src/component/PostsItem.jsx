import React, { useState } from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import data from "../data.json";

const PostsItem = () => {
 const [resource] = useState(data);

 return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {resource.map(({ id, title, description, thumbnail, category }) => (
        <div key={id} className="col">
          <div className="card h-100">
            <img src={thumbnail} className="card-img-top img-fluid" alt="postImage" /> {/* Ensure images are responsive */}
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <Link to="/PostDetail" className="btn btn-primary">
                Read More
              </Link>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
              <PostAuthor />
              <Link to="/CategoryPosts" className="btn btn-light">
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
