import { useState } from "react";
import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }
  return <AdminDashboard />;
};

export default AdminPage;
