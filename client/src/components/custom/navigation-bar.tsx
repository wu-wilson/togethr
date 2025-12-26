import { ThemeToggle } from "./theme-toggle";
import { Separator } from "@/components/ui/separator";
import DateRangePicker from "./date-range-picker";

const NavigationBar = () => {
  return (
    <div className="flex justify-center border-b sticky top-0 z-50 bg-background px-6 h-16">
      <div className="flex justify-end items-center max-w-7xl w-full">
        <DateRangePicker />
        <Separator orientation="vertical" className="ml-3.5 mr-1 my-4" />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default NavigationBar;
