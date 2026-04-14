import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
function ProtectedRoute({ children }:any) {
  const token = Cookies.get("token")

  if (!token) {
    return <Navigate to="/jobs" replace />;
  }

  return children;
}

export default ProtectedRoute;