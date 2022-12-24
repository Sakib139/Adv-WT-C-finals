import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import TopnavContent from './admin/TopnavContent';
import ProtectedNav from './admin/ProtectedNav';

const Topnav = ({isLoggedIn}) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
          <Navbar.Brand as={Link} to="#">MedEX</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <ProtectedNav isLoggedIn={isLoggedIn} > <TopnavContent /> </ProtectedNav>
          <Nav>
            <Nav.Link as={Link} to="medex/faqs">FAQs</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  )
}

export default Topnav