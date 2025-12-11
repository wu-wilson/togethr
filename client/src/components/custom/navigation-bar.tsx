import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { HeartHandshake } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import DateRangePicker from "./date-range-picker";

const NavigationBar = () => {
  const sections = ["Dashboard", "Transactions", "People"];

  return (
    <div className="flex justify-center border-b sticky top-0 z-50 bg-background px-6 py-2">
      <div className="flex justify-center md:justify-between items-center max-w-7xl w-full">
        <div className="items-center gap-1 hidden md:flex">
          <Button variant="ghost" size="icon">
            <HeartHandshake className="size-5" />
          </Button>
          <>
            {sections.map((s) => (
              <Button key={s} size="sm" variant="ghost">
                {s}
              </Button>
            ))}
          </>
        </div>
        <div className="flex items-center">
          <DateRangePicker />
          <Separator orientation="vertical" className="ml-3.5 mr-1 my-1" />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
