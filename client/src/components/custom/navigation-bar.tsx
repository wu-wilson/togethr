import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { HeartHandshake } from "lucide-react";

const NavigationBar = () => {
  const sections = ["Dashboard", "Transactions", "People"];

  return (
    <div className="flex justify-between items-center px-6 py-2">
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon">
          <HeartHandshake className="size-5" />
        </Button>
        {sections.map((s) => (
          <Button key={s} size="sm" variant="ghost">
            {s}
          </Button>
        ))}
      </div>
      <ThemeToggle />
    </div>
  );
};

export default NavigationBar;
