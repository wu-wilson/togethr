import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "sonner";
import { MembersProvider } from "./contexts/members-provider/members-provider";
import { CategoriesProvider } from "./contexts/categories-provider/categories-provider";
import { useTheme } from "./hooks/useTheme";
import Error from "./components/custom/error/error";
import Loading from "@/components/custom/loading/loading";
import NavigationBar from "./components/custom/navigation-bar";
import Members from "./cards/members/Members";
import Categories from "./cards/categories/Categories";

const App = () => {
  const { theme } = useTheme();

  return (
    <>
      <Toaster position="bottom-center" theme={theme} />
      <NavigationBar />
      <div className="flex flex-col items-center mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-7xl">
          <ErrorBoundary
            fallback={<Error className="h-[calc(100vh-4rem)] w-full" />}
          >
            <Suspense
              fallback={<Loading className="h-[calc(100vh-4rem)] w-full" />}
            >
              <MembersProvider>
                <Members />
                <CategoriesProvider>
                  <Categories />
                </CategoriesProvider>
              </MembersProvider>
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="flex flex-col gap-4 mt-4 w-full max-w-7xl"></div>
      </div>
    </>
  );
};

export default App;
