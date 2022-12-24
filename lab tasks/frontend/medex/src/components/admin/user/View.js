import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
// import { format } from 'date-fns'

import axiosConfig from '../axiosConfig';

const View = () => {
const navigate = useNavigate();
  const [data, setData] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = () => {
    axiosConfig.get('admin/user/view')
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
                <Breadcrumb.Item >User </Breadcrumb.Item>
                <Breadcrumb.Item active>View</Breadcrumb.Item>
            </Breadcrumb>
        </Card.Header>
        <Card.Body>
            <Card.Title className="mb-4">Registered Counter's information</Card.Title>
            {isLoading ? <strong style={{ color: 'yellow' }}>Data Loading. Please Wait a Moment...</strong> : 
            <Table bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>BloodGroup</th>
                <th>DOB</th>
                <th>Sex</th>
                <th>Phone</th>
                <th>Address</th>
                </tr>
            </thead>
            <tbody>
            {data && data.length===0 && <tr><td colSpan='5' style={{ backgroundColor: 'yellow', textAlign: 'center' }}><strong>No Data Found</strong></td></tr>}
            {data && data.length>0 && 
            data.map((data, index) => (
                <tr key={index}>
                    <td>{++index}</td>
                    <td>{data.userdetail.name}</td>
                    <td>{data.email}</td>
                    <td>{data.userdetail.bloodgroup}</td>
                    <td>{data.userdetail.dob}</td>
                    <td>{data.userdetail.sex}</td>
                    <td>{data.userdetail.phone}</td>
                    <td>{data.userdetail.address}</td>
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