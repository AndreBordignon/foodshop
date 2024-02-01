import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { Login } from "./pages/auth/login";
import { SignUp } from "./pages/auth/sign-up";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { OrderList } from "./pages/app/orders/orders";
import { EmailConfirmed } from "./pages/auth/emailConfirmed";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/orders", element: <OrderList /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <Login />,
      },
      {
        path: "/login/confirm",
        element: <EmailConfirmed />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);
