import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import * as yup from 'yup';

import axiosConfig from '../axiosConfig';


const Add = () => {
    const navigate = useNavigate();
    const [servererrors, setServerErrors] = useState({});
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const formik = useFormik({
        initialValues: {
            userid: '',
            password: '',
            email: '',
            name: '',
            department: '',
            degree: '',
            phone1: '',
            bloodgroup: '',
            gender: '',
            religion: '',
          },
          validationSchema: yup.object({
            name: yup.string().required(),
            email: yup.string().email().required(),
            department: yup.string().required(),
            degree: yup.string().required(),
            bloodgroup: yup.string().required().oneOf(['A pos', 'B pos', 'O Pos', 'AB pos', 'AB neg', 'O neg', 'B neg', 'A neg']),
            gender: yup.string().required(),
            religion: yup.string().oneOf(['Islam', 'Hinduism', 'Buddhism', 'Christianity', 'Other']),
            phone1: yup.string().matches(/^(01[3-9]\d{8})$/, "Invalid Phone Number").min(11, 'Must be exactly 11 digits')
            .max(11, 'Must be exactly 11 digits').required(),
            userid: yup.string().required().max(10, 'Maximum Length 10'),
            password: yup.string().required().min(6, 'Minimum Password Length 6').max(32),
            }),
          onSubmit: (values, {resetForm}) => {
            // console.log(values);
            axiosConfig.post("http://127.0.0.1:8000/api/admin/doctor/add", values)
            .then(response=>{
                var data = response.data;
                console.log(data);
                if(data['errors']){
                    // console.log(data);
                    setSuccess(false);
                    setServerErrors(data);
                    setShow(true);
                }
                else{
                    setShow(false);
                    setSuccess(true);
                    resetForm({value: ''});
                }
            }).catch(error=>{
                console.log(error.message);
                // navigate('/admin');
            });
          }
    });
    // useEffect(()=>{
    //     axiosConfig.get('admin/state')
    //     .then(response=>{
    //     })
    //     .catch(error=>{
    //     // console.log(error.message);
    //     navigate('/admin');
    //     })
    // },[]);

    const renderNameError = formik.touched.name && formik.errors.name && (
                <span style={{ color: 'red' }}>{formik.errors.name}</span>);
    const renderUseridError = formik.touched.userid && formik.errors.userid && (
                <span style={{ color: 'red' }}>{formik.errors.userid}</span>);
    const renderPasswordError = formik.touched.password && formik.errors.password && (
                <span style={{ color: 'red' }}>{formik.errors.password}</span>);
    const renderEmailError = formik.touched.email && formik.errors.email && (
                <span style={{ color: 'red' }}>{formik.errors.email}</span>);
    const renderDepartmentError = formik.touched.department && formik.errors.department && (
                <span style={{ color: 'red' }}>{formik.errors.department}</span>);
    const renderDegreeError = formik.touched.degree && formik.errors.degree && (
                <span style={{ color: 'red' }}>{formik.errors.degree}</span>);
    const renderPhoneError = formik.touched.phone1 && formik.errors.phone1 && (
                <span style={{ color: 'red' }}>{formik.errors.phone1}</span>);
    const renderGenderError = formik.touched.gender && formik.errors.gender && (
                <span style={{ color: 'red' }}>{formik.errors.gender}</span>);
    const renderReligionError = formik.touched.religion && formik.errors.religion && (
                <span style={{ color: 'red' }}>{formik.errors.religion}</span>);
    const renderBloodGroupError = formik.touched.bloodgroup && formik.errors.bloodgroup && (
                <span style={{ color: 'red' }}>{formik.errors.bloodgroup}</span>);

  return (
        <Card className="mt-4 p-4" style={{ width: '65%', left: '20%' }}>
        <Card.Header>
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/dashboard" }}> Dashboard </Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/doctor/view" }}> Doctor </Breadcrumb.Item>
                <Breadcrumb.Item active>Add</Breadcrumb.Item>
            </Breadcrumb>
        </Card.Header>
        <Card.Body>
            <Card.Title className="mb-4">Fill the doctor's information</Card.Title>
            <div>
                { success ? <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
                                <Alert.Heading>Successfully Added</Alert.Heading>
                            </Alert> : null }
                { show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                <Alert.Heading>Error!</Alert.Heading>
                                {servererrors['errors']['userid'] && servererrors['errors']['userid'].map((err, i)=><p className="pb-0 mb-0" key={i}>{err}</p>)}
                                {servererrors['errors']['email'] && servererrors['errors']['email'].map((err, i)=><p className="mb-0 pb-0" key={i}>{err}</p>)}
                                {servererrors['errors']['phone1'] && servererrors['errors']['phone1'].map((err, i)=><p className="mb-0 pb-0" key={i}>{err}</p>)}
                            </Alert> : null}
                <Form onSubmit={formik.handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    Username
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="tel" name="userid" value={formik.values.userid} onChange={formik.handleChange} placeholder="Username" required />
                    {/* {renderNameError} */}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    Password
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="password" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Password" required />
                    {renderPasswordError}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    Name
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="tel" name="name" value={formik.values.name} onChange={formik.handleChange} placeholder="Name" required />
                    {renderNameError}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    Email
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="email" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Email" required />
                    {renderEmailError}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    Degree
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control as="textarea" rows={2} name="degree" value={formik.values.degree} onChange={formik.handleChange} placeholder="Degree" required />
                    {renderDegreeError}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    Department
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="tel" name="department" value={formik.values.department} onChange={formik.handleChange} placeholder="Department" required />
                    {renderDepartmentError}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    BloodGroup
                    </Form.Label>
                    <Col sm={10}>
                    <select
                    id="bloodgroup"
                    name="bloodgroup"
                    className="form-control"
                    value={formik.values.bloodgroup}
                    onChange={formik.handleChange} >
                    <option>
                    Select
                    </option>
                    <option value="A pos" onClick={()=>formik.values.bloodgroup='A pos'}>A pos</option>
                    <option value="B pos" onClick={()=>formik.values.bloodgroup='B pos'}>B pos</option>
                    <option value="O pos" onClick={()=>formik.values.bloodgroup='O pos'}>O pos</option>
                    <option value="AB pos" onClick={()=>formik.values.bloodgroup='AB pos'}>AB pos</option>
                    <option value="AB neg" onClick={()=>formik.values.bloodgroup='AB neg'}>AB neg</option>
                    <option value="O neg" onClick={()=>formik.values.bloodgroup='O neg'}>O neg</option>
                    <option value="B neg" onClick={()=>formik.values.bloodgroup='B neg'}>B neg</option>
                    <option value="A neg" onClick={()=>formik.values.bloodgroup='A neg'}>A neg</option>
                    </select>
                    {renderBloodGroupError}
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    Gender
                    </Form.Label>

                    <Col sm={10}>
                    <Form.Label column sm={3}>
                    <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="s"
                    value='Male'
                    onClick={()=>formik.values.gender='Male'}
                    onChange={formik.handleChange}
                    // checked={getValue((v) => v.number) === 2}
                    /> Male
                    </Form.Label>
                    
                    <Form.Label column sm={3}>
                    <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="e"
                    value='Female'
                    onClick={()=>formik.values.gender='Female'}
                    onChange={formik.handleChange}
                    // checked={getValue((v) => v.number) === 2}
                    /> Female
                    </Form.Label>

                    <Form.Label column sm={2}>
                    <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="x"
                    value='Other'
                    onClick={()=>formik.values.gender='Other'}
                    onChange={formik.handleChange}
                    // checked={getValue((v) => v.number) === 2}
                    /> Other
                    </Form.Label> <br />
                    {renderGenderError}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    Religion
                    </Form.Label>
                    <Col sm={10}>
                    <select
                    id="religion"
                    name="religion"
                    className="form-control"
                    required
                    value={formik.values.religion}
                    onChange={formik.handleChange} >
                    <option>
                    Select
                    </option>
                    <option value="Islam" onClick={()=>formik.values.religion='Islam'}>Islam</option>
                    <option value="Hinduism" onClick={()=>formik.values.religion='Hinduism'}>Hinduism</option>
                    <option value="Buddhism" onClick={()=>formik.values.religion='Buddhism'}>Buddhism</option>
                    <option value="Christianity" onClick={()=>formik.values.religion='Christianity'}>Christianity</option>
                    <option value="Other" onClick={()=>formik.values.religion='Other'}>Other</option>
                    </select>
                    {renderReligionError}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    Phone
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="tel" name="phone1" value={formik.values.phone1} onChange={formik.handleChange} placeholder="Phone" required />
                    {renderPhoneError}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit" style={{ float: 'right' }}>Add</Button>
                    </Col>
                </Form.Group>
                </Form>
            </div>
        </Card.Body>
        </Card>
  )
}

export default Add