import type { ProtectedRouteProps } from "./ProtectedRoute.types";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const token = localStorage.getItem('token');

    return token ? (children) : (<Navigate to='/auth' replace />)
}