import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Offcanvas, Container, Button } from 'react-bootstrap';
import { HiMenu } from 'react-icons/hi';
import logo from '../assets/logo.png';

function NavBar({ user, onLogout }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    onLogout();
    setShow(false);
  };

  return (
    <>
      <Navbar bg="transparent" className="mb-3">
        <Container>
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Open Mat" style={{ height: '150px', width: 'auto' }} />
          </Link>
          <Button 
            className="hamburger-button"
            onClick={handleShow}
          >
            <HiMenu style={{ fontSize: '30px', color: '#555555' }} />
          </Button>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={handleClose}>Home</Nav.Link>
            <Nav.Link as={Link} to="/gyms" onClick={handleClose}>Gyms</Nav.Link>
            
            {user ? (
            <>
                <Nav.Link as={Link} to="/events" onClick={handleClose}>Manage Events</Nav.Link>
                <Nav.Link as={Link} to="/favorites" onClick={handleClose}>Favorites</Nav.Link>
                <Nav.Link as={Link} to="/dojo" onClick={handleClose}>Dojo</Nav.Link>
                <Nav.Link as={Link} to="/profile" onClick={handleClose}>Profile</Nav.Link>
                <Nav.Link as={Link} to="/gyms/my" onClick={handleClose}>My Gyms</Nav.Link>
            </>
            ) : (
            <Nav.Link as={Link} to="/dojo" onClick={handleClose}>Dojo</Nav.Link>
            )}

            <hr />
            
            {user ? (
              <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
            ) : (
              <Button as={Link} to="/loginsignup" variant="outline-primary" onClick={handleClose}>
                Login / Register
              </Button>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavBar;
