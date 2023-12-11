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
import ResetPasswordPage from "@/pages/auth-router/reset-password-page.tsx";
import ModeToggle from "@/components/mode-toggle.tsx";

const AuthRouter: FC = () => {
  return (
    <main className="relative bg-background w-full h-screen flex flex-col items-center justify-center bg-[url(/circuit-board.svg)] dark:bg-[url(/circuit-board-dark.svg)]">
      <Router>
        <Routes>
          <Route path={AppRoutes.login} element={<LoginPage />} />
          <Route
            path={AppRoutes.forgotPassword}
            element={<ForgotPasswordPage />}
          />
          <Route
            path={AppRoutes.resetPassword}
            element={<ResetPasswordPage />}
          />
          <Route path="*" element={<Navigate to={AppRoutes.login} />} />
        </Routes>
      </Router>
      <div className="absolute top-2 right-2">
        <ModeToggle />
      </div>
    </main>
  );
};

export default AuthRouter;
