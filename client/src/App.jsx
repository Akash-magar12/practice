import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // This contains your Navbar and <Outlet />
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
        {
          path: "/create-post",
          // FIXED: Removed the extra curly braces around the component
          element: (
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;