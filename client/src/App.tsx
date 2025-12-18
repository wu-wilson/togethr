import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "sonner";
import { MembersProvider } from "./contexts/members-provider/members-provider";
import { useTheme } from "./hooks/useTheme";
import Error from "./components/custom/error/error";
import Loading from "@/components/custom/loading/loading";
import NavigationBar from "./components/custom/navigation-bar";
import Members from "./cards/members/Members";

const App = () => {
  const { theme } = useTheme();

  return (
    <>
      <Toaster position="bottom-center" theme={theme} />
      <NavigationBar />
      <div className="flex justify-center mt-4">
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
    </>
  );
};

export default App;
