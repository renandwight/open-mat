import './index.css';
import router from './router';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)