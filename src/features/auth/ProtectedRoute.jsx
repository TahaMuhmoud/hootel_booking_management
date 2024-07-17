import PropTypes from "prop-types";
import { useUser } from "./useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullPageSppiner from "../../ui/FullPageSppiner";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isUserLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isUserLoading && !isAuthenticated) navigate("/login");
  }, [isAuthenticated, isUserLoading, navigate]);

  if (isUserLoading) return <FullPageSppiner />;

  if (isAuthenticated) return children;
}

ProtectedRoute.propTypes = { children: PropTypes.any };

export default ProtectedRoute;
