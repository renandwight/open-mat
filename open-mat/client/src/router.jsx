import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AllGyms from "./pages/AllGyms"
import DetailedGym from "./pages/DetailedGym"
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import FavoritePage from "./pages/FavoritePage";
import AllEvents from "./pages/AllEvents";
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
                element: <FavoritePage />,
            },
            {
                path: "events",
                element: <AllEvents />,
            },
            {
                path: "manageevent",
                element: <EventsManager />,
            },
        ],
    },
]);

export default router;