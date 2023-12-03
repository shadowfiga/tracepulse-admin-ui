import { FC } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { AppRoutes } from "@/constants/app-routes.ts";
import LoginPage from "@/pages/auth-router/login-page.tsx";
import ForgotPasswordPage from "@/pages/auth-router/forgot-password-page.tsx";
import PasswordResetPage from "@/pages/auth-router/password-reset-page.tsx";

const AuthRouter: FC = () => {
  return (
    <main className="bg-background w-full h-screen flex flex-col items-center justify-center bg-[url(/circuit-board.svg)] dark:bg-[url(/circuit-board-dark.svg)]">
      <Router>
        <Routes>
          <Route path={AppRoutes.login} element={<LoginPage />} />
          <Route
            path={AppRoutes.forgotPassword}
            element={<ForgotPasswordPage />}
          />
          <Route
            path={AppRoutes.passwordReset}
            element={<PasswordResetPage />}
          />
          <Route path="*" element={<Navigate to={AppRoutes.login} />} />
        </Routes>
      </Router>
    </main>
  );
};

export default AuthRouter;
