import React, { useState,useContext,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Avatar from "../images/avatar1.jpg";
import { FaCheck, FaEdit } from "react-icons/fa";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const UserProfile = () => {
  const [avatar, setAvatar] = useState(Avatar);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isAvatarTouched,setIsAvatarTouched]=useState(false)
  const [error,setError]=useState('')

  const {id}=useParams()

  const {currentUser}=useContext(UserContext)
  const token=currentUser?.token;
  const navigate=useNavigate()
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])

  useEffect(()=>{
    const getUser=async()=>{
      const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${id}`,
      {withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
      const {name,email,avatar}=response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar)
    }
    getUser()
  },[])

  const changeAvatarHandler=async()=>{
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set('avatar',avatar)
      const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`,postData,
      {withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
      setAvatar(response?.data.avatar)
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  const updateUserDetail=async(e)=>{
    e.preventDefault()
    try{
    const userData=new FormData()
    userData.set('name',name);
    userData.set('email',email);
    userData.set('currentPassword',currentPassword);
    userData.set('newPassword',newPassword);
    userData.set('confirmNewPassword',confirmNewPassword);

    const response=await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`,userData,
    {withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
    if(response.status===200)
    {navigate('/logout')}
    }catch(error){
      setError(error.response.data.message)
    }
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-4">
          <Link to={`/myposts/${currentUser.id}`} className="btn btn-primary">
            My Dashboard
          </Link>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="text-center mb-4">
              <div className="profile_avatar">
                <img
                  src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                  alt="avatarImg"
                  className="img-fluid rounded-circle"
                />
              </div>
              <form className="mt-2">
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  accept="image/png, image/jpeg, image/jpg"
                  className="d-none"
                />
                <label htmlFor="avatar" className="btn btn-light" onClick={()=>setIsAvatarTouched(true)} >
                  <FaEdit />
                </label>
              </form>
             {isAvatarTouched && <button className="btn btn-success mt-2" onClick={changeAvatarHandler} >
                <FaCheck /> Save
              </button>}
            </div>
            <form className="profile_form" onSubmit={updateUserDetail} >
              {error && <p className="form_error-message text-danger mb-3">
                {error}
              </p>}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="form-control"
                />
              </div>
              <button className="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
