import { FC, ReactNode } from "react";
import ProjectSwitcher from "@/components/project-switcher.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { PieChart, Settings, Sliders, Waypoints, Webhook } from "lucide-react";
import { AppRoutes } from "@/constants/app-routes.ts";
import { useLocation, useNavigate } from "react-router-dom";

interface AppLink {
  label: string;
  icon: ReactNode;
  to: AppRoutes;
}

const links: AppLink[] = [
  {
    label: "Overview",
    icon: <PieChart size={18} className="mr-2" />,
    to: AppRoutes.overview,
  },
  {
    label: "Events",
    icon: <Waypoints size={18} className="mr-2" />,
    to: AppRoutes.events,
  },
  {
    label: "Webhooks",
    icon: <Webhook size={18} className="mr-2" />,
    to: AppRoutes.webhooks,
  },
  {
    label: "Settings",
    icon: <Settings size={18} className="mr-2" />,
    to: AppRoutes.settings,
  },
];

const profileLinks: AppLink[] = [
  {
    label: "Preferences",
    icon: <Sliders size={18} className="mr-2" />,
    to: AppRoutes.preferences,
  },
];

const Sidebar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <aside className="bg-slate-200 dark:bg-slate-900/40 p-2 space-y-2 flex flex-col">
      <h2 className="text-2xl font-bold text-center">Trace Pulse</h2>
      <Separator className="bg-slate-300 dark:bg-slate-800" />
      <p className="font-bold text-sm">Project</p>
      <ProjectSwitcher />
      {links.map((l) => (
        <Button
          key={l.to}
          onClick={() => navigate(l.to)}
          variant="ghost"
          className={cn(
            "w-full bg-background justify-start font-light text-muted",
            location.pathname === l.to && "font-medium text-foreground",
          )}
        >
          {l.icon}
          <span>{l.label}</span>
        </Button>
      ))}
      <Separator className="bg-slate-300 dark:bg-slate-800" />
      <p className="font-bold text-sm">Account</p>
      {profileLinks.map((l) => (
        <Button
          key={l.to}
          onClick={() => navigate(l.to)}
          variant="ghost"
          className={cn(
            "w-full bg-background justify-start font-light text-muted",
            location.pathname === l.to && "font-medium text-foreground",
          )}
        >
          {l.icon}
          <span>{l.label}</span>
        </Button>
      ))}
      <div className="flex-1" />
      <Button variant="destructive" className="w-full">
        Logout
      </Button>
    </aside>
  );
};

export default Sidebar;
