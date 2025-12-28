import { Navigate } from "react-router";
import type { JSX } from "react";
import { useAuth } from "../context/AuthContext";

interface Props {
    children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props) => {
    const { token } = useAuth();
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};