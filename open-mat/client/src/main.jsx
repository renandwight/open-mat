import './index.css';
import router from './router';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
)
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
