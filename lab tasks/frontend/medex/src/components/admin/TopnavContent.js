import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const TopnavContent = () => {
  return (
    <>
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
          <Nav.Link as={Link} to="admin/dashboard"> Dashboard </Nav.Link>
          <Nav.Link as={Link} to="admin/user/view"> User </Nav.Link>
      
          <NavDropdown title="Doctors" id="collasible-nav-dropdown">
          <NavDropdown.Item as={Link} to="admin/doctor/view">View</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="admin/doctor/add">Add New</NavDropdown.Item>
          </NavDropdown>
         
          <NavDropdown title="Counters" id="collasible-nav-dropdown">
          <NavDropdown.Item as={Link} to="admin/counter/view">View All</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="admin/counter/add">Add New</NavDropdown.Item>
          </NavDropdown>
      </Nav>
      <Nav.Link as={Link} to="#">Contact</Nav.Link>
      <Nav>
          {/* <Nav.Link as={Link} to="#">Icon</Nav.Link> */}
          <NavDropdown title="Accounts" id="collasible-nav-dropdown">
          <NavDropdown.Item as={Link} to="#">Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as={Link} to="admin/signout">Sign out</NavDropdown.Item>
          </NavDropdown>
      </Nav>
      </Navbar.Collapse>
    </>
  )
}

export default TopnavContent