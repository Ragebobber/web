import { ADMIN_ROUTE, AUTH_ROUTE, USER_ROUTE } from "../util/Consts";
import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage";
import AuthPage from "../pages/AuthPage";

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    element: <AdminPage />,
  },
];

export const publicRoutes = [
  {
    path: AUTH_ROUTE,
    element: <AuthPage />,
  },
];

export const authedRoutes = [
  {
    path: USER_ROUTE,
    element: <UserPage />,
  },
];
