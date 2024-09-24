import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const ProtectedRoute = () => {
  const location = useLocation();

  const authSession = useSelector((state: RootState) => state.auth.inSession);
  //   if (authLogin === undefined) {
  //     return null;
  //   }

  return authSession ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
