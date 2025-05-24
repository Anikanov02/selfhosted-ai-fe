import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import MainPage from "./pages/main-page/MainPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppRoutes } from "./constants/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutesComponent />
      </BrowserRouter>
    </AuthProvider>
  );
}

// This is now inside the AuthProvider, so useAuth works correctly
function AppRoutesComponent() {
  const { username, password } = useAuth();
  const isLoggedIn = !!username && !!password;

  return (
    <Routes>
      <Route path={AppRoutes.HOME} element={<Navigate to={isLoggedIn ? AppRoutes.HOME : AppRoutes.LOGIN} replace />} />
      <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
      <Route path={AppRoutes.REGISTER} element={<RegistrationPage />} />
      <Route path={AppRoutes.MAIN} element={<MainPage />} />
    </Routes>
  );
}

export default App;
