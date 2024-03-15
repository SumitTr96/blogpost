import React, { useState,useContext,useEffect } from "react";
import data from "../data.json";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState(data);
  const {currentUser}=useContext(UserContext)
  const token=currentUser?.token;
  const navigate=useNavigate()
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])
  return (
    <section className="dashboard py-4">
      <div className="container">
        {posts.map((post) => (
          <article key={post.id} className="dashboard_post mb-4 border rounded">
            <div className="row">
              <div className="col-md-4">
                <img
                  src={post.authorDP}
                  className="rounded-circle img-fluid"
                  alt="authorDp"
                />
              </div>
              <div className="col-md-8">
                <h5 className="mb-0">{post.title}</h5>
                <div className="d-flex justify-content-end">
                  <Link
                    to={"/PostDetail"}
                    className="btn btn-link text-primary mr-2"
                  >
                    View
                  </Link>
                  <Link
                    to={"/EditPost"}
                    className="btn btn-link text-warning mr-2"
                  >
                    Edit
                  </Link>
                  <Link to={"/DeletePost"} className="btn btn-link text-danger">
                    Delete
                  </Link>
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
