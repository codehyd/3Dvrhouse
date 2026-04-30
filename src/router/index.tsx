import { createBrowserRouter } from "react-router";
import ResidentialDetails from "@/views/residential-details";
import Home from "@/views/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/residential-details",
    element: <ResidentialDetails />,
  },
]);

export default router;
