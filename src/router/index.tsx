import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import { ROUTE } from "../constants/Common";
import Users from "../pages/Users";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTE.LOGIN} element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route path={ROUTE.USERS} element={<Users />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
