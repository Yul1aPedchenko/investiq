import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { getCurrentUser } from "./redux/auth/authOperations";
import { selectToken } from "./redux/auth/authSelectors";

import { Routes, Route, Navigate } from "react-router-dom";

import { Layout } from "./components/Layout/Layout";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import { StatisticsPage } from "./pages/StatisticsPage/StatisticsPage";

import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const token = useAppSelector(selectToken);
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
        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <StatisticsPage />
            </ProtectedRoute>
          }
        />
        <Route index element={<Navigate to={token ? "/dashboard" : "/auth"} />} />
      </Route>
    </Routes>
  );
}

export default App;
