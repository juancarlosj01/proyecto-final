import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";

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
          <Navbar.Brand href="/#/">E-Commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/#/">Home</Nav.Link>
              <Nav.Link href="/#/shop/:id">Product Detail</Nav.Link>
              <Nav.Link href="/#/Purchases">Purchases</Nav.Link>
              {token ? (
                <Nav.Link as={Button} onClick={logout}>
                  Log out
                </Nav.Link>
              ) : (
                <Nav.Link href="/#/Login">Login</Nav.Link>
              )}
            </Nav>
            <Nav.Link onClick={handleShow}>Cart (Sidebar)</Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Cart show={show} handleClose={handleClose} />
    </>
  );
};

export default NavBar;
