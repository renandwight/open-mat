import './App.css';
import { useEffect, useState } from 'react';
import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
// do I need this here? see line below - arnold
// import { useAuth } from './context/AuthContext';

function App() {


  return (
    <>
    <Outlet/>
    </>
  )
}

export default App
