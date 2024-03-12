import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from 'axios'

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const[error,setError]=useState('')
  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData(prevState=>{
      return {...prevState,[e.target.name]:e.target.value}
    });
  };
  const registerUser=async(e)=>{
    e.preventDefault()
    setError('')
    try {
      const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`,formData)
      const newUser=await response.data
      console.log(newUser)
      if(!newUser){
        setError("Could not register user")
      }
      navigate('/')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={registerUser}>
            {error &&<p className="form_error_message">{error}</p>}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Register
            </button>
          </form>
          <div className="mt-3 text-center">
            <p className="mb-0">
              Already have an account{" "}
              <Link to="/Login" className="text-decoration-none">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
