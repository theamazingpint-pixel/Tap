// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Subscribers from "./pages/Subscribers";
import Editions from "./pages/Editions";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/subscribers"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Subscribers />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/editions"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Editions />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
