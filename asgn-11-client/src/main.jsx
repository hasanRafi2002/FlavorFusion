import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthProvider from "./context/AuthProvider";
import Home from "./pages/Home/HomePage";
import App from './App';
import LoginPage from './pages/Auth/LoginPage';
import Register from './pages/Auth/RegisterPage';
import Profile from './pages/Profile/ProfilePage';

import PrivateRoute from './components/PrivateRoute';
import AllFoodsPage from "./pages/Foods/AllFoodsPage";
import AddFoodPage from "./pages/Dashboard/AddFoodPage";
import SingleFoodPage from "./pages/Foods/SingleFoodPage";
import MyFoodsPage from "./pages/Dashboard/MyFoodsPage";
import PurchasePage from "./pages/Dashboard/PurchasePage";
import MyOrders from "./pages/Dashboard/MyOrdersPage";
import GalleryPage from "./pages/Gallery/GalleryPage";
import UpdateFood from "./pages/Dashboard/UpdateFood";
import ScrollToTop from "./ScrollTop";
import ContactUs from "./pages/Home/ContactUs";






// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element:  (     <>
    <ScrollToTop /> 
    <App />
  </>), // Main App component that holds the layout
    children: [
      { path: "/", element: <Home /> }, // Define child routes
      { path: "login", element: <LoginPage /> },

      { path: "register", element: <Register /> },
      { path: "allfood", element: <AllFoodsPage /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "contact", element: <ContactUs /> },

      { path: "singlefood/:foodId", element: <SingleFoodPage /> },





      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
           </PrivateRoute>
        ),
      },

      {
        path: "addfood",
        element: (
          <PrivateRoute>
            <AddFoodPage />
           </PrivateRoute>
        ),
      },

      {
        path: "myfood",
        element: (
          <PrivateRoute>
            <MyFoodsPage />
           </PrivateRoute>
        ),
      },
      {
        path: "/purchase/:foodId",
        element: (
          <PrivateRoute>
            <PurchasePage />
           </PrivateRoute>
        ),
      },
    
      {
        path: "/myfood/update/:id",
        element: (
          <PrivateRoute>
            <UpdateFood />
           </PrivateRoute>
        ),
      },




      {
        path: "myorder",
        element: (
          <PrivateRoute>
            <MyOrders />
           </PrivateRoute>
        ),
      },


    ],
  },
]);

// Render the application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>
);