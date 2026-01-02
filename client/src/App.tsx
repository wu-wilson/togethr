import { Toaster } from "sonner";
import { useTheme } from "./hooks/useTheme";
import { useMembers } from "./hooks/useMembers";
import { useCategories } from "./hooks/useCategories";
import { useTransactions } from "./hooks/useTransactions";
import Error from "./components/custom/error/error";
import Loading from "@/components/custom/loading/loading";
import NavigationBar from "./components/custom/navigation-bar";
import Members from "./cards/manage/members/Members";
import Categories from "./cards/manage/categories/Categories";
import Transactions from "./cards/manage/transactions/Transactions";
import SpendingOverTimeByPerson from "./cards/charts/spending-over-time-by-person/spending-over-time-by-person";
import CategoryBreakdownByPerson from "./cards/charts/category-breakdown-by-person/category-breakdown-by-person";
import SpendingDistributionByCategory from "./cards/charts/spending-distribution-by-category/spending-distribution-by-category";
import SpendingOverTimeByCategory from "./cards/charts/spending-over-time-by-category/spending-over-time-by-category";

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
        <div className="flex flex-col items-center px-4 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-7xl mt-4">
            <Members />
            <Categories />
          </div>
          <div className="w-full max-w-7xl space-y-4 mt-4 mb-4">
            <Transactions />
            <SpendingOverTimeByPerson />
            <SpendingOverTimeByCategory />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full max-w-7xl mb-4 items-stretch">
            <div className="lg:col-span-1">
              <SpendingDistributionByCategory />
            </div>
            <div className="lg:col-span-2">
              <CategoryBreakdownByPerson />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
