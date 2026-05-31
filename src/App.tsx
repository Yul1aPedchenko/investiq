import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { getCurrentUser } from "./redux/auth/authOperations";

import { Routes, Route, Navigate } from "react-router-dom";

import { Layout } from "./components/Layout/Layout";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";

import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token]);
  // localStorage.clear();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="auth" element={token ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route index element={<Navigate to={token ? "/dashboard" : "/auth"} />} />
      </Route>
    </Routes>
  );
}

export default App;
