import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/users', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        });
        setUser(response.data.user);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handlePutUser = () => {
    navigate('/profile/update');
  };

  const handleUpdatePassword = () => {
    navigate('/profile/update-password');
  };

  return (
    <Layout>
      <div className="col-12">
        <Navbar />
        <div className="container mt-5">
        <h2 className="text-center">User Profile</h2>
        <div className="text-center mt-3">
            <button onClick={handleUpdatePassword} className="btn btn-primary">
              Update Password
            </button>
          </div>
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">Name: {user.name}</h5>
            <p className="card-text">Email: {user.email}</p>
            <p className="card-text">Age: {user.age}</p>
            <p className="card-text">Gender: {user.gender}</p>
            <p className="card-text">Birth Date: {user.birthDate}</p>
            <button onClick={handlePutUser} className="btn btn-primary mt-3">Update Profile</button>
            <button onClick={() => navigate('/dashboard')} className="btn btn-secondary mt-3">Back to Dashboard</button>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}

export default UserProfile;
