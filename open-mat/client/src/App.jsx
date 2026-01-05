import './App.css';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from './components/NavBar';

function App() {
  const [user, setUser] = useState({ name: 'Test User' }); 
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