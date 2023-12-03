import { FC } from "react";
import { BrowserRouter as Router, Navigate, Route } from "react-router-dom";
import { AppRoutes } from "@/constants/app-routes.ts";
import LoginPage from "@/pages/auth-router/login-page.tsx";
import ForgotPasswordPage from "@/pages/auth-router/forgot-password-page.tsx";
import ForgotPasswordCompletePage from "@/pages/auth-router/forgot-password-complete-page.tsx";

const AuthRouter: FC = () => {
  return (
    <Router>
      <Route path={AppRoutes.login} element={<LoginPage />} />
      <Route path={AppRoutes.forgotPassword} element={<ForgotPasswordPage />} />
      <Route
        path={AppRoutes.forgotPasswordComplete}
        element={<ForgotPasswordCompletePage />}
      />
      <Route path="*" element={<Navigate to={AppRoutes.login} />} />
    </Router>
  );
};

export default AuthRouter;
