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
import AdminCategories from "./pages/AdminCaterogies/Categories.jsx";

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
        element: <AdminProducts />,
      },
      {
        path: "categories",
        element: <AdminCategories />,
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
