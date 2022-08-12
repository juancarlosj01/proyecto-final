import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faBoxArchive, faCartShopping, faSignOut } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (token) {
      setShow(true);
    } else {
      navigate("/login");
    }
  };

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };

  const token = localStorage.getItem("token");

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <div className="icon-container">
            <Navbar.Brand className="text-primary" href="/#/">e-commerce</Navbar.Brand>
          </div>
          <div className="link-container">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/* <Nav.Link href="/#/shop/:id">Product Detail</Nav.Link> */}
                {token ? (
                  <Nav.Link onClick={logout}><FontAwesomeIcon className="icon-navbar" icon={faSignOut} /></Nav.Link>
                ) : (
                  <Nav.Link href="/#/Login"><FontAwesomeIcon className="icon-navbar" icon={faUser} /></Nav.Link>
                )}
                <Nav.Link href="/#/Purchases"><FontAwesomeIcon className="icon-navbar" icon={faBoxArchive} /></Nav.Link>
                <Nav.Link onClick={handleShow}><FontAwesomeIcon className="icon-navbar" icon={faCartShopping} /></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
      <Cart show={show} handleClose={handleClose} />
    </>
  );
};

export default NavBar;
