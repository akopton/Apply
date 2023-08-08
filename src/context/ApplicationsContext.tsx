import { api } from "@/utils/api";
import { Application } from "@prisma/client";
import { createContext, useMemo, useState } from "react";

type TContext = {
  filteredData: Application[];
  searchByValue: (value: string) => void;
  applyFilters: (filters: {
    days?: string;
    statusId?: string;
    platformId?: string;
  }) => void;
  filters:
    | {
        days?: string;
        statusId?: string;
        platformId?: string;
      }
    | undefined;
};

const initialContext: TContext = {
  filteredData: [],
  searchByValue: (value: string) => console.log("search"),
  applyFilters: (filters: {
    days?: string;
    statusId?: string;
    platformId?: string;
  }) => console.log("filter"),
  filters: {
    days: "",
    statusId: "",
    platformId: "",
  },
};

export const ApplicationsContext = createContext(initialContext);

export const ApplicationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<{
    days?: string;
    statusId?: string;
    platformId?: string;
  }>();
  const { data } = api.application.getAll.useQuery();

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (searchValue || filters) {
      return data
        ?.filter((el) => {
          const position = el.position.toLowerCase();
          const company = el.company.toLowerCase();
          const value = searchValue.toLowerCase();
          return position.includes(value) || company.includes(value);
        })
        .filter((el) => {
          const currentDate = new Date();
          const addedAt = new Date(el.addedAt);
          const days = parseInt(filters?.days!);
          const daysAgo = new Date(
            currentDate.getTime() - days * 24 * 60 * 60 * 1000
          );
          return filters?.days && filters.days !== "" ? addedAt < daysAgo : el;
        })
        .filter((el) => {
          return filters?.statusId && filters?.statusId !== ""
            ? el.statusId === filters?.statusId
            : el;
        })
        .filter((el) => {
          return filters?.platformId && filters?.platformId !== ""
            ? el.searchPlatformId === filters?.platformId
            : el;
        });
    }
    return data;
  }, [searchValue, data, filters]);

  const searchByValue = (value: string) => {
    setSearchValue(value);
  };

  const applyFilters = (filters: {
    days?: string;
    statusId?: string;
    platformId?: string;
  }) => {
    setFilters(filters);
  };

  return (
    <ApplicationsContext.Provider
      value={{ filteredData, searchByValue, applyFilters, filters }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};
