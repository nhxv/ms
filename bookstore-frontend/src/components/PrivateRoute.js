import { Navigate } from "react-router-dom";

function PrivateRoute ({ auth: isAuth, children }) {
  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;