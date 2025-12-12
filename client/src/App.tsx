import { ThemeProvider } from "./contexts/theme-provider/theme-provider";
import { DateRangeProvider } from "./contexts/date-range-provider/date-range-provider";
import { MembersProvider } from "./contexts/members-provider/members-provider";
import NavigationBar from "./components/custom/navigation-bar";
import Members from "./cards/Members";
import { Suspense } from "react";
import Loading from "@/components/custom/loading";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./components/custom/error";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DateRangeProvider>
        <NavigationBar />
        <div className="flex justify-center">
          <div className="flex max-w-7xl w-full flex-wrap">
            <ErrorBoundary
              fallback={<Error className="h-[calc(100vh-4rem)] w-full" />}
            >
              <Suspense
                fallback={<Loading className="h-[calc(100vh-4rem)] w-full" />}
              >
                <MembersProvider>
                  <Members />
                </MembersProvider>
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </DateRangeProvider>
    </ThemeProvider>
  );
};

export default App;
