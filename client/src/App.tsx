import { ThemeProvider } from "./contexts/theme-provider/theme-provider";
import { DateRangeProvider } from "./contexts/date-range-provider/date-range-provider";
import NavigationBar from "./components/custom/navigation-bar";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DateRangeProvider>
        <NavigationBar />
      </DateRangeProvider>
    </ThemeProvider>
  );
};

export default App;
