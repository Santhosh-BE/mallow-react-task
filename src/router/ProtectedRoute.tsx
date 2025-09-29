import { Navigate, Outlet } from "react-router-dom";
import { ROUTE } from "../constants/Common";

function ProtectedRoute() {
    const isAuth = localStorage.getItem("ACCESS_TOKEN") ? true : false;
    return isAuth ? <Outlet /> : <Navigate to={ROUTE.LOGIN} />;
}

export default ProtectedRoute;
