import { ThemeToggle } from "./components/custom/theme-toggle";
import { ThemeProvider } from "./contexts/theme-provider/theme-provider";
import NavigationBar from "./components/custom/navigation-bar";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavigationBar />
    </ThemeProvider>
  );
};

export default App;
