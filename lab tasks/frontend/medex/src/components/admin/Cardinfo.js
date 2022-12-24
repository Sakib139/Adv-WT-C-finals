import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import { Link, NavLink } from "react-router-dom";

const Cardinfo = (props) => {
  const {type, data, color, rd} = props;
  return (
    <Card style={{ backgroundColor: color }} className="mt-5 p-2">
      <Card.Header>Stats</Card.Header>
      <Card.Body>
        <Card.Title>{type}</Card.Title>
        <Card.Text>
          Registered: {data}
        </Card.Text>
      </Card.Body>
      <Card.Footer as={Link} to={rd}> More Info </Card.Footer>
    </Card>
  )
}

export default Cardinfo