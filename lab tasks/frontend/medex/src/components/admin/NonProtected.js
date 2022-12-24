import React from 'react';
import { Navigate } from 'react-router-dom';

const NonProtected = ({isLoggedIn, children}) => {
  if(isLoggedIn){
    return <Navigate to="/admin/dashboard" replace />
  }
  return children;
}

export default NonProtected;