import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../component/avatar1.jpg';
import { FaCheck, FaEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserProfile = () => {
 const [avatar, setAvatar] = useState(Avatar);
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [currentPassword, setCurrentPassword] = useState('');
 const [newPassword, setNewPassword] = useState('');
 const [confirmNewPassword, setConfirmNewPassword] = useState('');

 return (
    <section className="d-flex align-items-center justify-content-center vh-100">
      {/* Apply responsive margins to the container */}
      <div className="container mx-auto mx-md-5">
        <div className="text-center mb-3">
          <Link to={'/Dashboard'} className="btn btn-primary">My Dashboard</Link>
        </div>

        <div className="profile_details">
          <div className="avatar_wrapper text-center">
            <div className="profile_avatar">
              <img src={avatar} alt="avatarImg" className="img-fluid rounded-circle" />
            </div>

            {/* Form to update avatar */}
            <form className="avatar_form">
              <input type="file" name='avatar' id='avatar' onChange={e => setAvatar(e.target.files[0])} accept='image/png, image/jpeg, image/jpg' className="d-none" />
              <label htmlFor="avatar" className="btn btn-light"><FaEdit /> Edit Avatar</label>
            </form>
            <button className="btn btn-success profile_avatar-btn"><FaCheck /> Save</button>
          </div>
          {/* Form to update user detail */}
          <form className="form profile_form">
            <p className="form_error-message text-danger">This is an error message</p>
            <div className="mb-3">
              <input type="text" placeholder='Full Name' value={name} onChange={e => setName(e.target.value)} className="form-control" />
            </div>
            <div className="mb-3">
              <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
            </div>
            <div className="mb-3">
              <input type="password" placeholder='Current password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="form-control" />
            </div>
            <div className="mb-3">
              <input type="password" placeholder='New password' value={newPassword} onChange={e => setNewPassword(e.target.value)} className="form-control" />
            </div>
            <div className="mb-3">
              <input type="password" placeholder='Confirm new password' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} className="form-control" />
            </div>
            <button className='btn btn-primary'>Update</button>
          </form>
        </div>
      </div>
    </section>
 );
};

export default UserProfile;
