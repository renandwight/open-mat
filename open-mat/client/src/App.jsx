import './App.css';
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from './context/AuthContext';
import NavBar from './components/NavBar';

function App() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <NavBar user={isAuthenticated} onLogout={handleLogout} />
      <Outlet />
    </>
  );
}

export default App;