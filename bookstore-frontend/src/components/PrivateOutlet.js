import { Navigate, Outlet } from "react-router-dom";

function PrivateOutlet({ auth: isAuth}) {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateOutlet;