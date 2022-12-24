import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedNav = ({isLoggedIn, children}) => {
  if(isLoggedIn){
      return children;
    }
  return null;
}

export default ProtectedNav;