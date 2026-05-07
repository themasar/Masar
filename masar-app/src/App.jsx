import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AssessmentPage from "./pages/AssessmentPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage onStartJourney={() => navigate("/assessment")} />}
      />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/assessment" element={<AssessmentPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
