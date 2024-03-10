import React, { useState } from "react";
import { Link } from "react-router-dom";
import data from "../data.json";

const Authors = () => {
  const [authors, setAuthors] = useState(data);
  return (
    <div className="container py-5">
      <div className="row g-4">
        {authors.map(({ id, author, authorDP }) => (
          <div key={id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Link to={"/AuthorPosts"} className="text-decoration-none">
              <div className="card mb-4 shadow-sm" style={{ width: "15rem" }}>
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img
                      src={authorDP}
                      className="card-img rounded-circle"
                      alt={author}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{author}</h5>
                      <p className="card-text">Posts: {id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Authors;
