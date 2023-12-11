import { FC } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { AppRoutes } from "@/constants/app-routes.ts";
import OverviewPage from "@/pages/dashboard-router/overview-page/overview-page.tsx";
import EventsPage from "@/pages/dashboard-router/events-page/events-page.tsx";
import Sidebar from "@/pages/dashboard-router/components/sidebar.tsx";
import SettingsPage from "@/pages/dashboard-router/settings-page/settings-page.tsx";
import ModeToggle from "@/components/mode-toggle.tsx";
import PreferencesPage from "@/pages/dashboard-router/preferences-page/preferences-page.tsx";

const DashboardRouter: FC = () => {
  return (
    <Router>
      <main className="bg-background min-h-screen grid grid-cols-[240px_1fr] gap-2 relative">
        <Sidebar />
        <section className="py-2">
          <Routes>
            <Route path={AppRoutes.overview} element={<OverviewPage />} />
            <Route path={AppRoutes.events} element={<EventsPage />} />
            <Route path={AppRoutes.preferences} element={<PreferencesPage />} />
            <Route path={AppRoutes.settings} element={<SettingsPage />} />
            <Route path="*" element={<Navigate to={AppRoutes.overview} />} />
          </Routes>
        </section>
        <div className="absolute top-2 right-2">
          <ModeToggle />
        </div>
      </main>
    </Router>
  );
};

export default DashboardRouter;
