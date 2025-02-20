import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import i18n from "./i18n/i18n.js";
import { I18nextProvider } from "react-i18next";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

// Regular imports for components that are not lazily loaded
import App from "./pages/Home/Home.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import SignIn from "./pages/Auth/SignIn/SignIn.jsx";
import SignUp from "./pages/Auth/SignUp/SignUp.jsx";
import MainAuth from "./pages/Auth/MainAuth/MainAuth.jsx";
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
import AddCategory from "./pages/AdminAddParametre/AddCategory.jsx";
import AddType from "./pages/AdminAddParametre/AddType.jsx";
import AdminNewsletter from "./pages/AdminNewsletter/AdminNewsletter.jsx";
import CategoriesList from "./pages/CategoriesList/CategoriesList.jsx";
import ProductsList from "./pages/ProductsList/ProductsList.jsx";
import EditProduct from "./pages/AdminProducts/EditProduct.jsx";
import Levels from "./pages/Levels/Levels.jsx";
import ProfileLayout from "./pages/Profile/ProfileLayout.jsx";
import UserCommandes from "./pages/UserCommandes/UserCommandes.jsx";
import AdminStat from "./pages/AdminStat/AdminStat.jsx";
import axios from "axios";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage.jsx";
import AdminDevis from "./pages/AdminDevis/AdminDevis.jsx";
import UserType from "./pages/UserType/UserType.jsx";
import ValidationPage from "./pages/ValidationPage/ValidationPage.jsx";

axios.defaults.withCredentials = true;

// Lazy imports for pages to be lazy loaded
const Contact = lazy(() => import("./pages/Contact/Contact.jsx"));
const PasswordForgot = lazy(() =>
  import("./pages/PasswordForgot/PasswordFortgot.jsx")
);
const PasswordReset = lazy(() =>
  import("./pages/PasswordReset/PasswordReset.jsx")
);
const NotFound = lazy(() => import("./pages/NotFound/NotFound.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <App /> },
      { path: "about", element: <AboutUsPage /> },
    ],
  },
  {
    path: "contact",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Contact />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "home", element: <Admin /> },
      { path: "stat", element: <AdminStat /> },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "products",
        element: <MainProducts />,
        children: [
          {
            path: "",
            element: <AdminProducts />,
          },
          {
            path: "addproduct",
            element: <AddProduct />,
          },
          {
            path: "editproduct/:productid",
            element: <EditProduct />,
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
      {
        path: "devis",
        element: <AdminDevis />,
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
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PasswordForgot />
      </Suspense>
    ),
  },
  {
    path: "/passwordReset",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PasswordReset />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    ),
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/productsList",
    element: <ProductsList />,
  },
  { path: "/products/categorie/:CategoryId", element: <ProductsList /> },
  {
    path: "/products/:famillId",
    element: <CategoriesList />,
  },
  {
    path: "/profile/:userId",
    element: <ProfileLayout />,
    children: [
      { path: "", element: <Profile /> },
      { path: "levels", element: <Levels /> },
      { path: "commandes", element: <UserCommandes /> },
    ],
  },
  {
    path: "/user/type",
    element: <UserType />,
  },
  {
    path: "/pending-approval",
    element: <ValidationPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ToastContainer></ToastContainer>
        <I18nextProvider i18n={i18n}>
          <RouterProvider router={router} />
        </I18nextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
