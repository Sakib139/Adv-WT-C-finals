import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
// import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
// import { format } from 'date-fns';

import axiosConfig from '../axiosConfig';

const View = () => {
const navigate = useNavigate();
  const [data, setData] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = () => {
    axiosConfig.get('admin/doctor/view')
    .then(response=>{
      console.log(response.data);
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
    axiosConfig.delete(`admin/doctor/remove/${id}`)
    .then(response=>{
      // console.log(response.data);
      const filter = data.filter((data)=>data.id !== id);
      setData(filter);
    })
    .catch(error=>{
        // console.log(error.message);
    })
  }
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
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/dashboard" }}> Dashboard </Breadcrumb.Item>
                <Breadcrumb.Item >Doctor </Breadcrumb.Item>
                <Breadcrumb.Item active>View</Breadcrumb.Item>
            </Breadcrumb>
        </Card.Header>
        <Card.Body>
            <Card.Title className="mb-4">Registered Doctors's information</Card.Title>
            {isLoading ? <strong style={{ color: 'yellow' }}>Data Loading. Please Wait a Moment...</strong> : 
            <Table bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Degrees</th>
                <th>Department</th>
                <th>Phone</th>
                <th>Religion</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {data && data.length===0 && <tr><td colSpan='5' style={{ backgroundColor: 'yellow', textAlign: 'center' }}><strong>No Data Found</strong></td></tr>}
            {data && data.length>0 && 
            data.map((data, index) => (
                <tr key={index}>
                    <td>{++index}</td>
                    <td>{data.username}</td>
                    <td>{data.doctordetail.name}</td>
                    <td>{data.doctordetail.email}</td>
                    <td>{data.doctordetail.degrees}</td>
                    <td>{data.doctordetail.department}</td>
                    <td>{data.doctordetail.phone1}</td>
                    <td> {data.doctordetail.religion} </td>
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