import { FC } from "react";
import { Loader2 } from "lucide-react";

const LoadingPage: FC = () => {
  return (
    <main className="bg-background w-full h-screen flex flex-col items-center justify-center">
      <Loader2 className="text-muted-foreground w-8 h-8 animate-spin" />
    </main>
  );
};

export default LoadingPage;
