import { FC } from "react";
import ProjectSwitcher from "@/components/project-switcher.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { PieChart, Waypoints } from "lucide-react";
import { AppRoutes } from "@/constants/app-routes.ts";
import { useLocation, useNavigate } from "react-router-dom";

const links = [
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
];

const Sidebar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <aside className="bg-slate-200 dark:bg-slate-700 p-2 space-y-2">
      <h2 className="text-2xl font-bold">Trace Pulse</h2>
      <ProjectSwitcher />
      <Separator className="bg-background" />
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
    </aside>
  );
};

export default Sidebar;
