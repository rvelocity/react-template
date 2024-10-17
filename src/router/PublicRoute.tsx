import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import ROUTES from "./routes";

interface PublicRouteProps {
  restricted: boolean;
}

function PublicRoute({ restricted }: PublicRouteProps): JSX.Element {
  const context = useOutletContext();

  if (!context && restricted) {
    return <Navigate to={ROUTES.APP} replace />;
  }

  return <Outlet context={context} />;
}

export default PublicRoute;
