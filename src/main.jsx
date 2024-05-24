import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/Home/Home.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import "./index.css";
import SignIn from "./pages/Auth/SignIn/SignIn.jsx";
import SignUp from "./pages/Auth/SignUp/SignUp.jsx";
import MainAuth from "./pages/Auth/MainAuth/MainAuth.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import PasswordFortgot from "./pages/PasswordForgot/PasswordFortgot.jsx";
import PasswordReset from "./pages/PasswordReset/PasswordReset.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import AdminUsers from "./pages/AdminUsers/Users.jsx";
import AdminProducts from "./pages/AdminProducts/Products.jsx";
import AdminParametres from "./pages/AdminParametres/Parametres.jsx";
import Products from "./pages/Products/Products.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import AdminOrders from "./pages/AdminOrders/Orders.jsx";
import MainProducts from "./pages/AdminProducts/MainProducts.jsx";
import AddProduct from "./pages/AdminProducts/AddProduct.jsx";
import AdminFamille from "./pages/AdminParametre/AdminFamille.jsx";
import AdminCategory from "./pages/AdminParametre/AdminCategory.jsx";
import AdminType from "./pages/AdminParametre/AdminType.jsx";
import AddFamille from "./pages/AdminAddParametre/AddFamille.jsx";
import AddCategory from "./pages/AdminAddParametre/AddCategory.jsx";
import AddType from "./pages/AdminAddParametre/AddType.jsx";
import AdminNewsletter from "./pages/AdminNewsletter/AdminNewsletter.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "/", element: <App /> }],
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "home", element: <Admin /> },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "products",
        element: <MainProducts />,
        children: [
          {
            path: "all",
            element: <AdminProducts />,
          },
          {
            path: "addproduct",
            element: <AddProduct />,
          },
        ],
      },
      {
        path: "parametres",
        element: <AdminParametres />,
      },
      {
        path: "parametres/famille",
        element: <AdminFamille />,
      },
      {
        path: "parametres/category",
        element: <AdminCategory />,
      },
      {
        path: "parametres/type",
        element: <AdminType />,
      },
      {
        path: "parametres/addfamille",
        element: <AddFamille />,
      },
      {
        path: "parametres/addcategory",
        element: <AddCategory />,
      },
      {
        path: "parametres/addtype",
        element: <AddType />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
      {
        path: "newsletter",
        element: <AdminNewsletter />,
      },
    ],
  },

  {
    path: "/auth",
    element: <MainAuth />,
    children: [
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
  {
    path: "/passwordForgot",
    element: <PasswordFortgot />,
  },
  {
    path: "/passwordReset",
    element: <PasswordReset />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/profile/:userId",
    element: <Profile />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ToastContainer></ToastContainer>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
