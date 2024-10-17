import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import ROUTES from "./routes";

function ProtectedRoute(): JSX.Element {
  const context = useOutletContext();

  if (!context) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet context={context} />;
}

export default ProtectedRoute;
