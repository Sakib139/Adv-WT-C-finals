import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axiosConfig from './axiosConfig';
import Cardinfo from './Cardinfo';

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState('');
  const [doctors, setDoctors] = useState('');
  const [counters, setCounters] = useState('');
  const [operators, setOperators] = useState('');
  useEffect(()=>{
    axiosConfig.get('admin/dashboard')
    .then(response=>{
      var res = response.data;
      // console.log(res);
      setUsers(res.users);
      setDoctors(res.doctors);
      setCounters(res.counters);
      setOperators(res.operators);
    })
    .catch(error=>{
      console.log(error.message);
      navigate('/admin');
    })
  }, [])
    return (
        <Container>
            <Row>
              <Col><Cardinfo type='Users' data={users} color='#ffc107' rd={'/admin/user/view'}/></Col>
              <Col><Cardinfo type='Doctors'data={doctors} color='#17a2b8' rd={'/admin/doctor/view'}/></Col>
            </Row>
            <Row>
              <Col><Cardinfo type='Counters' data={counters} color='#20c997' rd={'/admin/counter/view'}/></Col>
              <Col><Cardinfo type='Operators' data={operators} color='#fd7e14' /></Col>
            </Row>
        </Container>
        
    )
}

export default Dashboard