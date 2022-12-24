import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";

const Signin = ({onHandleSignIn}) => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const [token, setToken] = useState('');
  const {username, password} = user;
  const navigate = useNavigate();
  const handleChange = (e) => {
    const filledName = e.target.name;
    setUser({...user,[e.target.name]:e.target.value});
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/admin/signin", user)
    .then(response=>{
        onHandleSignIn(true);
        var data = response.data;
        // console.log(data);
        var admin = {userid: data.username, access_token: data.token};
        localStorage.setItem('status', 'admin');
        localStorage.setItem('admin', JSON.stringify(admin));
        navigate('/admin/dashboard');
        // console.log(localStorage.getItem('admin'));
    }).catch(error=>{
        console.log(error);
    });
  }
  return (
        <div style={{ width: '50%', marginTop: '10%', marginLeft: '25%', boxShadow: '4px 3px 8px 1px', padding: '40px' }}>
            <h3 className="mb-0" style={{ textAlign: 'center' }}>MedEx: Admin</h3> <br/>
            <hr className="m-0 p-0"/>
            <p className="mt-2" style={{ textAlign: 'center' }}>Sign in to start your session</p>
            <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Username
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="tel" name="username" value={username} onChange={handleChange} placeholder="Enter your username" required />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                Password
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="password" name="password" value={password} onChange={handleChange} placeholder="Enter you password" required />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit" style={{ float: 'right' }}>Sign in</Button>
                </Col>
            </Form.Group>
            </Form>
        </div>
  )
}

export default Signin