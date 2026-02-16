import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
