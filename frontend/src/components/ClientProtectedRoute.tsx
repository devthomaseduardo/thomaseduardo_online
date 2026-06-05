import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export function ClientProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("clientToken");
  const location = useLocation();

  if (!token) {
    // Redirect them to the /portal page, but save the current location they were trying to go to
    return <Navigate to="/portal" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
