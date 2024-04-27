import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Table from 'react-bootstrap/Table';

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
        <div className="row justify-content-md-center mt-5">
          <div className="col-6">
            <div className="container">
              <h2 className="text-center">Detail Pengguna, {user.name}</h2>
                <div className="card mt-3">
                  <div className="card-body">
                  <Table responsive>
                    <tr>
                      <td>Nama Lengkap</td>
                      <td>{user.name}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <td>Umur</td>
                      <td>{user.age} tahun</td>
                    </tr>
                    <tr>
                      <td>Jenis Kelamin</td>
                      <td>{user.gender}</td>
                    </tr>
                    <tr>
                      <td>Tanggal Lahir</td>
                      <td>{user.birthDate}</td>
                    </tr>
                  </Table>
                  <p className="text-center">
                    <button onClick={() => navigate('/dashboard')} className="btn btn-secondary mt-3">Dashboard</button>
                    <button onClick={handlePutUser} className="btn btn-primary mt-3">Ubah Detail</button>
                    <button onClick={handleUpdatePassword} className="btn btn-danger mt-3"> Ubah Kata Sandi </button>
                  </p>
                    
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UserProfile;