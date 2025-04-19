import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../store/UserContextProvider";


const ProtectedRoute = ({ element }) => {
  const { user } = useContext(UserContext);

  return user?.isLoggedIn ? element : <Navigate to="/signin" />;
};

export default ProtectedRoute;
