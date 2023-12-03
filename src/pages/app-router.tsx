import { FC } from "react";
import useAccountStore from "@/store/account-store.ts";
import AuthRouter from "@/pages/auth-router/auth-router.tsx";
import DashboardRouter from "@/pages/dashboard-router/dashboard-router.tsx";
import useInitialize from "@/hooks/use-initialize.ts";
import LoadingPage from "@/pages/loading-page.tsx";

const AppRouter: FC = () => {
  const { loading } = useInitialize();
  const {
    computed: { isLoggedIn },
  } = useAccountStore();

  if (loading) {
    return <LoadingPage />;
  }

  if (!isLoggedIn) {
    return <AuthRouter />;
  }

  return <DashboardRouter />;
};

export default AppRouter;
