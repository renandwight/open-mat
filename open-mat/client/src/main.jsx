import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import router from "./router";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
