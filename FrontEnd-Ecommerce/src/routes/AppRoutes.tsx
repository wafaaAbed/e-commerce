import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import Error from '@pages/Error';
import PageSuspenseFallback from '@Components/feedback/PageSuspenseFallback/PageSuspenseFallback';
import ProtectedRoutes from '@Components/Auth/ProtectedRoutes';
import ProfileLayout from '@layout/ProfileLayout/ProfileLayout';
import Order from '@pages/Order/Order';
import Account from '@pages/Account/Account';

// MainLayout
const MainLayout = lazy(() => import("@layout/MainLayout/MainLayout"));

//pages
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Cart = lazy(() => import("@pages/Cart/Cart"));
const Categories = lazy(() => import("@pages/Categories/Categories"));
const Home = lazy(() => import("@pages/Home/Home"));
const Login = lazy(() => import("@pages/Login/Login"));
const Register = lazy(() => import("@pages/Register/Register"));
const Wishlist = lazy(() => import("@pages/Wishlist/Wishlist"));
const Products = lazy(() => import("@pages/Products/Products"));




export default function AppRoutes() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageSuspenseFallback><MainLayout /></PageSuspenseFallback>,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element:
            <PageSuspenseFallback><Home /></PageSuspenseFallback>

        },
        {
          path: "/categories",
          element: <PageSuspenseFallback><Categories /></PageSuspenseFallback>,
        },
        {
          path: "categories/products/:prefix",
          element: <PageSuspenseFallback><Products /></PageSuspenseFallback>,
          loader: ({ params }) => {
            if (
              typeof params.prefix !== "string" ||
              !/^[a-z]+$/i.test(params.prefix)
            ) {
              throw new Response("Bad Request", {
                statusText: "Category not found",
                status: 400,
              });
            }
            return true;
          },
        },
        {
          path: "/aboutUs",
          element: <PageSuspenseFallback><AboutUs /></PageSuspenseFallback>
        }, {
          path: "/profile",
          element:(
            <ProtectedRoutes>
              <PageSuspenseFallback><ProfileLayout /></PageSuspenseFallback>
            </ProtectedRoutes>),
          children: [
            { index: true, element: <PageSuspenseFallback><Account /></PageSuspenseFallback> },
            { path: "order", element: <PageSuspenseFallback><Order /></PageSuspenseFallback> },
          
          ]
        },

        {
          path: "/register",
          element: <PageSuspenseFallback><Register /></PageSuspenseFallback>
        },
        {
          path: "/login",
          element: <PageSuspenseFallback><Login /></PageSuspenseFallback>
        },
        {
          path: "/cart",
          element:
            <ProtectedRoutes>
              <PageSuspenseFallback><Cart /></PageSuspenseFallback>
            </ProtectedRoutes>
        },
        {
          path: "/wishlist",
          element:
            <ProtectedRoutes>
              <PageSuspenseFallback><Wishlist /></PageSuspenseFallback>
            </ProtectedRoutes>

        }

      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}
