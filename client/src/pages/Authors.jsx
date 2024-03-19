import React, { useState,useContext,useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios'
import Loader from '../component/Loader'


const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  const {currentUser}=useContext(UserContext)
  const token=currentUser?.token;
  const navigate=useNavigate()
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])

  useEffect(()=>{
    const getAuthors = async()=>{
      setIsLoading(true);
      try{
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`)
        setAuthors(response.data)
      }
      catch(error){
        console.log(error)
      }
      setIsLoading(false)
    }
    getAuthors()
  },[])





  return (
    <div className="container py-5">
      <div className="row g-4">
        {authors.map(({ _id:id, avatar, name, posts }) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={id}>
            <Link to={`/posts/users/${id}`} className="text-decoration-none">
              <div className="card mb-4 shadow-sm" style={{ width: "15rem" }}>
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img
                      src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                      className="card-img rounded-circle"
                      alt={name}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{name}</h5>
                      <p className="card-text">Posts: {posts}</p>
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

export default Authors 
