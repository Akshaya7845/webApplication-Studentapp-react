import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../auth/UseAuth";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole)
    return <Navigate to="/forbidden" replace />;

  return children;
}
