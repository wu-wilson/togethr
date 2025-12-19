import { useMemo, useCallback, useSyncExternalStore } from "react";
import type { QueryParam } from "./types";

const subscribe = (callback: () => void) => {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
};

const getSnapshot = () => window.location.search;

export const useQueryParams = () => {
  const search = useSyncExternalStore(subscribe, getSnapshot);
  const params = useMemo(() => new URLSearchParams(search), [search]);

  const getParam = useCallback(
    (key: QueryParam): string | null => {
      return params.get(key);
    },
    [params]
  );

  const setParam = useCallback(
    (updates: Partial<Record<QueryParam, string | null>>) => {
      const newParams = new URLSearchParams(window.location.search);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });

      const newSearch = newParams.toString();
      const url = newSearch ? `?${newSearch}` : window.location.pathname;

      window.history.replaceState(null, "", url);
      window.dispatchEvent(new PopStateEvent("popstate"));
    },
    []
  );

  return { getParam, setParam };
};
