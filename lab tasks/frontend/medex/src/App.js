import react, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import axiosConfig from './components/admin/axiosConfig';

//Admin_Start
import Protected from './components/admin/Protected';
import NonProtected from './components/admin/NonProtected';
import Home from "./components/Home";
import Topnav from "./components/Topnav";
import Signin from "./components/admin/signin/Signin";
import Signout from "./components/admin/signin/Signout";
import Dashboard from "./components/admin/Dashboard";
import UView from './components/admin/user/View';
import DView from './components/admin/doctor/View';
import DAdd from './components/admin/doctor/Add';
import CView from './components/admin/counter/View'; 
import CAdd from './components/admin/counter/Add';
//Admin_End

//User_Start
import Index from './components/user/Index';
import USignout from './components/Signin/Signout';
import Faqs from './components/FAQ/FAQS';
//User_End

function App() {
  const status = localStorage.getItem('status');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    if(status)
      setIsLoggedIn(true);
  }, [])
  const handleSignIn = (value) => {
    setIsLoggedIn(value);
  }
  const handleSignOut = (value) => {
    setIsLoggedIn(value);
  }
  return (
    <BrowserRouter>
      {/* {usertype.userid && <Topnav />} */}
      <Topnav isLoggedIn={isLoggedIn} />
      <Container>
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route exact path="/admin" element={ <NonProtected isLoggedIn={isLoggedIn}> <Signin onHandleSignIn={handleSignIn} /> </NonProtected> }/>
        <Route exact path="/admin/signout" element={ <Signout onHandleSignOut={handleSignIn} /> } />
        <Route exact path="/admin/dashboard" element={ <Protected isLoggedIn={isLoggedIn}> <Dashboard /> </Protected> } />
        <Route exact path="/admin/user/view" element={ <Protected isLoggedIn={isLoggedIn}> <UView /> </Protected> } />
        <Route exact path="/admin/doctor/view" element={ <Protected isLoggedIn={isLoggedIn}> <DView /> </Protected> } />
        <Route exact path="/admin/doctor/add" element={ <Protected isLoggedIn={isLoggedIn}> <DAdd /> </Protected> } />
        <Route exact path="/admin/counter/view" element={ <Protected isLoggedIn={isLoggedIn}> <CView /> </Protected> } />
        <Route exact path="/admin/counter/add" element={ <Protected isLoggedIn={isLoggedIn}> <CAdd /> </Protected> } />
        {/* <Route exact path="/admin/counter/remove" element={ <CAdd /> } /> */}

        <Route exact path="/user/dashboard" element={ <Index /> } />
        <Route exact path="/user/signout" element={ <USignout /> } />
        <Route exact path="/medex/faqs" element={ <Faqs /> } />
      </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
