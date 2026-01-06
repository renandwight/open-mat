import './App.css';
import { useEffect, useState } from 'react';
import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
// do I need this here? see line below - arnold
// import { useAuth } from './context/AuthContext';
import NavBar from './components/NavBar';

function App() {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <NavBar user={user} onLogout={handleLogout} />
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;