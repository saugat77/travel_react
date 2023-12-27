import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import User from "./views/Users";
import NotFound from "./views/NotFound";
import DashboardLayouts from "./components/Layouts/DashboardLayouts";
import GuestLayout from "./components/Layouts/GuestLayout";
import Dashboard from "./views/dashboard";
import Destination from "./components/Destination/destination";
import DestinationForm from "./components/Destination/destinationForm";
import LandingLayout from "./components/Layouts/LandingLayout";
const router = createBrowserRouter([
  {
    path: '/admin',
    element: <DashboardLayouts />,
    children: [
      {
        path: '/admin/users',
        element: <User />
      },
      {
        path: '/admin/dashboard',
        element: <Dashboard />
      },
      {
        path: '/admin/destinations',
        element: <Destination />,
      },
      {
        path: '/admin/destinations',
        children: [
          {
            path: '/admin/destinations/create',
            element: <DestinationForm />,
          },
          {
            path: '/admin/destinations/edit/:id',
            element: <DestinationForm />
          }
        ],
      },

    ]
  },
  {
    path: '/auth',
    element: <GuestLayout />,
    children: [
      {
        path: '/auth/login',
        element: <Login />
      },
      {
        path: '/auth/register',
        element: <Register />
      },
    ]

  },

  {
    path: '/',
    element: <LandingLayout />
  },
  {
    path: '*',
    element: <NotFound />
  }
])
export default router;
