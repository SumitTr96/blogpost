import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import {UserContext} from '../context/userContext'
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const[error,setError]=useState("")
  const navigate=useNavigate()

  const {setCurrentUser}=useContext(UserContext)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginUser=async(e)=>{
    e.preventDefault()
    setError('')
    try {
      const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`,formData)
      const user=await response.data
      setCurrentUser(user)
      navigate('/')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={loginUser}>
          {error &&<p className="form_error_message">{error}</p>}
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Login
            </button>
          </form>
          <div className="mt-3 text-center">
            <p className="mb-0">
              Don't have an account{" "}
              <Link to="/Register" className="text-decoration-none">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
