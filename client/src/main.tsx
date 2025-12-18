import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./contexts/theme-provider/theme-provider.tsx";
import { DateRangeProvider } from "./contexts/date-range-provider/date-range-provider.tsx";
import App from "./App.tsx";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DateRangeProvider>
        <App />
      </DateRangeProvider>
    </ThemeProvider>
  </StrictMode>
);
