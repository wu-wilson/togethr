import { Toaster } from "sonner";
import { useTheme } from "./hooks/useTheme";
import { useMembers } from "./hooks/useMembers";
import { useCategories } from "./hooks/useCategories";
import { useTransactions } from "./hooks/useTransactions";
import Error from "./components/custom/error/error";
import Loading from "@/components/custom/loading/loading";
import NavigationBar from "./components/custom/navigation-bar";
import Members from "./cards/members/Members";
import Categories from "./cards/categories/Categories";
import Transactions from "./cards/transactions/Transactions";

const App = () => {
  const { theme } = useTheme();

  const members = useMembers();
  const categories = useCategories();
  const transactions = useTransactions();

  const loading = members.loading || categories.loading || transactions.loading;
  const error = members.error || categories.error || transactions.error;

  return (
    <>
      <Toaster position="bottom-center" theme={theme} />
      <NavigationBar />
      {loading && <Loading className="h-[calc(100vh-4rem)] w-full" />}
      {error && <Error className="h-[calc(100vh-4rem)] w-full" msg={error} />}
      {!loading && !error && (
        <div className="flex flex-col items-center mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-7xl">
            <Members />
            <Categories />
          </div>
          <div className="w-full max-w-7xl space-y-4 mt-4">
            <Transactions />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
