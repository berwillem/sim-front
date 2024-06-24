import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import i18n from "./i18n/i18n.js";
import { I18nextProvider } from "react-i18next";
import App from "./pages/Home/Home.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import "./index.css";
import SignIn from "./pages/Auth/SignIn/SignIn.jsx";
import SignUp from "./pages/Auth/SignUp/SignUp.jsx";
import MainAuth from "./pages/Auth/MainAuth/MainAuth.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import PasswordFortgot from "./pages/PasswordForgot/PasswordFortgot.jsx";//lazy
import PasswordReset from "./pages/PasswordReset/PasswordReset.jsx";//lazy
import NotFound from "./pages/NotFound/NotFound.jsx";//lazy
import Products from "./pages/Products/Products.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import CategoriesList from "./pages/CategoriesList/CategoriesList.jsx";
import ProductsList from "./pages/ProductsList/ProductsList.jsx";
import Levels from "./pages/Levels/Levels.jsx";
import ProfileLayout from "./pages/Profile/ProfileLayout.jsx";
import UserCommandes from "./pages/UserCommandes/UserCommandes.jsx";
import EditProduct from "./pages/AdminProducts/EditProduct.jsx";

// Lazy load components
const AdminLayout = lazy(() => import("./layouts/AdminLayout.jsx"));
const Admin = lazy(() => import("./pages/Admin/Admin.jsx"));
const AdminUsers = lazy(() => import("./pages/AdminUsers/Users.jsx"));
const AdminProducts = lazy(() => import("./pages/AdminProducts/Products.jsx"));
const AdminParametres = lazy(() => import("./pages/AdminParametres/Parametres.jsx"));
const AdminOrders = lazy(() => import("./pages/AdminOrders/Orders.jsx"));
const MainProducts = lazy(() => import("./pages/AdminProducts/MainProducts.jsx"));
const AddProduct = lazy(() => import("./pages/AdminProducts/AddProduct.jsx"));
const AdminFamille = lazy(() => import("./pages/AdminParametre/AdminFamille.jsx"));
const AdminCategory = lazy(() => import("./pages/AdminParametre/AdminCategory.jsx"));
const AdminType = lazy(() => import("./pages/AdminParametre/AdminType.jsx"));
const AddCategory = lazy(() => import("./pages/AdminAddParametre/AddCategory.jsx"));
const AddType = lazy(() => import("./pages/AdminAddParametre/AddType.jsx"));
const AdminNewsletter = lazy(() => import("./pages/AdminNewsletter/AdminNewsletter.jsx"));

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
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminLayout />
      </Suspense>
    ),
    children: [
      {
        path: "home",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Admin />
          </Suspense>
        ),
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUsers />
          </Suspense>
        ),
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MainProducts />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AdminProducts />
              </Suspense>
            ),
          },
          {
            path: "addproduct",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AddProduct />
              </Suspense>
            ),
          },
          {
            path: "editproduct/:productid",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <EditProduct />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "parametres",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminParametres />
          </Suspense>
        ),
      },
      {
        path: "parametres/famille",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminFamille />
          </Suspense>
        ),
      },
      {
        path: "parametres/category",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminCategory />
          </Suspense>
        ),
      },
      {
        path: "parametres/type",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminType />
          </Suspense>
        ),
      },
      {
        path: "parametres/addcategory",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddCategory />
          </Suspense>
        ),
      },
      {
        path: "parametres/addtype",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddType />
          </Suspense>
        ),
      },
      {
        path: "orders",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminOrders />
          </Suspense>
        ),
      },
      {
        path: "newsletter",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminNewsletter />
          </Suspense>
        ),
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
