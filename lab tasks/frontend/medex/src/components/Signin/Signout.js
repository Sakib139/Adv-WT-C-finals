import React, {useState ,useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import axiosConfig from '../admin/axiosConfig';

const Signout = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        axiosConfig.get('user/signout')
        .then(response=>{
        // props.onHandleSignOut(false);
        // var res = response.data;
        // console.log(response.message);
        localStorage.clear();
        navigate('/');
        })
        .catch(error=>{
        // console.log(error.message);
        navigate('/');
        })
    }, [])

  return (
    <div><h4 style={{ marginLeft: '7.5%', marginTop: '1%', color: 'crimson' }}>Signing out...</h4></div>
  )
}

export default Signout