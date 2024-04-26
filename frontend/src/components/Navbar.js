import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NavScrollExample() {
    const navigate = useNavigate();
    const handleUpdatePassword= async () => {
        navigate('/');
      };
    const handleUpdateUser = async () => {
        try {
          await axios.post('/auth/logout');
          localStorage.removeItem('token');
          navigate('/');
        } catch (error) {
          console.log('Error logging out:', error);
        }
      };
    const handleDetail = async () => {
        try {
          await axios.post('/auth/logout');
          localStorage.removeItem('token');
          navigate('/');
        } catch (error) {
          console.log('Error logging out:', error);
        }
      };
    const handleLogout = async () => {
        try {
          await axios.post('/auth/logout');
          localStorage.removeItem('token');
          navigate('/');
        } catch (error) {
          console.log('Error logging out:', error);
        }
      };


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand onClick={() => navigate(`/dashboard`)}>Nyenyak</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Riwayat</Nav.Link>
          </Nav>
          <Nav>
                <NavDropdown title="Profile" id="navbarScrollingDropdown">
                    <NavDropdown.Item onClick={() => navigate(`/profile`)}>Detail User</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate(`/profile/update`)}>Update Detail</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate(`/profile/update-password`)}>Update Password</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
