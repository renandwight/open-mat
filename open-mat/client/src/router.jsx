import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AllGyms from "./pages/AllGyms";
import DetailedGym from "./pages/DetailedGym";
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import FavoritePage from "./pages/FavoritePage";
import LoginSignup from "./pages/LoginSignup";
import ProfilePage from "./pages/ProfilePage";
import DojoPage from "./pages/DojoPage";
import EventsManager from "./pages/EventsManagerPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        
        errorElement: <ErrorPage />,
        
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'gyms',
                element: <AllGyms/>
            },
            {
                path: 'gym/:id',
                element: <DetailedGym/>
            },
            {
                path: "favorites",
                element: <FavoritePage />
            },
            {
                path: "events",
                element: <EventsManager />
            },
            {
                path: "loginsignup",
                element: <LoginSignup/>
            },
            {
                path: "profile",
                element: <ProfilePage/>
            },
            {
                path: "dojo",
                element: <DojoPage/>
            },
        ]
    }
]);

export default router;