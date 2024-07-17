import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cabins from "./pages/Cabins/Cabins";
import EditCabin from "./pages/EditCabin/EditCabin";
import Settings from "./pages/Settings/Settings";
import Bookings from "./pages/Bookings/Bookings";
import EditBooking from "./pages/EditBooking/EditBooking";
import AppLayout from "./pages/Main/AppLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import { QueryClient, QueryClientProvider } from "react-query";
import Profile from "./pages/Profile/Profile";
import BookingDetails from "./features/bookings/BookingDetails";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import SignUp from "./pages/Signup/SignUp";
import ImgOverLayContextProvider from "./context/ImgOverLayContext";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/account",
        element: <Profile />,
      },
      {
        path: "/cabins",
        element: <Cabins />,
      },
      {
        path: "/bookings",
        element: <Bookings />,
      },
      {
        path: "/booking-details",
        element: <BookingDetails />,
        children: [
          {
            path: "/booking-details/:id",
            element: <BookingDetails />,
          },
        ],
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/edit-cabin",
        element: <EditCabin />,
        children: [
          {
            path: "/edit-cabin/:id",
            element: <EditCabin />,
          },
        ],
      },
      {
        path: "/edit-booking",
        element: <EditBooking />,
        children: [
          {
            path: "/edit-booking/:id",
            element: <EditBooking />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ImgOverLayContextProvider>
        <RouterProvider router={router} />
      </ImgOverLayContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
