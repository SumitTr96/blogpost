import React, { useState,useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "../component/avatar1.jpg";
import { FaCheck, FaEdit } from "react-icons/fa";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [avatar, setAvatar] = useState(Avatar);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const {currentUser}=useContext(UserContext)
  const token=currentUser?.token;
  const navigate=useNavigate()
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-4">
          <Link to={"/Dashboard"} className="btn btn-primary">
            My Dashboard
          </Link>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="text-center mb-4">
              <div className="profile_avatar">
                <img
                  src={avatar}
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
                <label htmlFor="avatar" className="btn btn-light">
                  <FaEdit /> Edit Avatar
                </label>
              </form>
              <button className="btn btn-success mt-2">
                <FaCheck /> Save
              </button>
            </div>
            <form className="profile_form">
              <p className="form_error-message text-danger mb-3">
                This is an error message
              </p>
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
