import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
// import { format } from 'date-fns'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import axiosConfig from '../axiosConfig';
import Search from '../Search';

const View = () => {
const navigate = useNavigate();
  const [data, setData] = useState('');
  const [originData, setOriginData] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = () => {
    axiosConfig.get('admin/counter/view')
    .then(response=>{
      setOriginData(response.data);
      setData(response.data);
      setIsLoading(false);
      setError(false);
    })
    .catch(error=>{
        setError(true);
        setIsLoading(false);
        // console.log(error.message);
    })
  }

  const handleDelete = (id) => {
    axiosConfig.delete(`admin/counter/remove/${id}`)
    .then(response=>{
      // console.log(response.data);
      const filter = data.filter((data)=>data.id !== id);
      setData(filter);
    })
    .catch(error=>{
        // console.log(error.message);
    })
  }
  const handleSearch = (searchText) => {
    // console.log('abc');
    let value = searchText.toLowerCase();
    if(originData){
        const newData = originData.filter((data)=>{
        const userName = data.countername.toLowerCase();
        if(userName.startsWith(value))
          return userName.startsWith(value);
        const userNameS = data.username.toLowerCase();
          return userNameS.startsWith(value);
      })
      setData(newData);
    }
  };
//   const [error, setErrors] = useState('');
  useEffect(()=>{
    fetchData();
    // console.log('rendering');
  }, [])

  return (
    <div>
        <Card className="mt-4">
        <Card.Header>
            <Breadcrumb>
            {/* as={Link} to="admin/dashboard" */}
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/dashboard" }}> Dashboard </Breadcrumb.Item>
                <Breadcrumb.Item >Counter </Breadcrumb.Item>
                <Breadcrumb.Item active>View</Breadcrumb.Item>
            </Breadcrumb>
        </Card.Header>
        <Card.Body>
            <Card.Title className="mb">
            <Row className="g-2">
              <Col md className='pt-3'>
                Registered Counter's information 
              </Col>
              <Col md><Search onHandleSearch={handleSearch} /></Col>
            </Row>
            </Card.Title>
            
            {isLoading ? <strong style={{ color: 'yellow' }}>Data Loading. Please Wait a Moment...</strong> : 
            <Table bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>UserID</th>
                <th>Created At</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {data && data.length===0 && <tr><td colSpan='5' style={{ backgroundColor: 'yellow', textAlign: 'center' }}><strong>No Data Found</strong></td></tr>}
            {data && data.length>0 && 
            data.map((data, index) => (
                <tr key={index}>
                    <td>{++index}</td>
                    <td>{data.countername}</td>
                    <td>{data.username}</td>
                    <td>{data.created_at}</td>
                    <td>
                        <Button className="me-2" variant="info">Edit</Button>
                        <Button variant="danger" onClick={()=>{handleDelete(data.id)}}>Delete</Button>
                    </td>
                </tr>
            ))}
            </tbody>
            
            </Table>}
            {error ? <strong style={{ color: 'red' }}>Unexpected Error. Please Try Again</strong> : null} 
        </Card.Body>
        </Card>
    </div>
  )
}

export default View