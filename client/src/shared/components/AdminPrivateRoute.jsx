import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AdminPrivateRoute() {
  const { isAdmin } = useAuth();
  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
}
