import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./contexts/theme-provider/theme-provider.tsx";
import { DateRangeProvider } from "./contexts/date-range-provider/date-range-provider.tsx";
import { MembersProvider } from "./contexts/members-provider/members-provider.tsx";
import { CategoriesProvider } from "./contexts/categories-provider/categories-provider.tsx";
import { TransactionsProvider } from "./contexts/transactions-provider/transactions-provider.tsx";
import App from "./App.tsx";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DateRangeProvider>
        <MembersProvider>
          <CategoriesProvider>
            <TransactionsProvider>
              <App />
            </TransactionsProvider>
          </CategoriesProvider>
        </MembersProvider>
      </DateRangeProvider>
    </ThemeProvider>
  </StrictMode>
);
