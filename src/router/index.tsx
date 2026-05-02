// import { createBrowserRouter } from "react-router";
// 使用哈希路由
import { createHashRouter } from "react-router";
import ResidentialDetails from "@/views/residential-details";
import Home from "@/views/home";

const router = createHashRouter([
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
