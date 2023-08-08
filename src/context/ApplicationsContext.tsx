import { api } from "@/utils/api";
import { Application } from "@prisma/client";
import { createContext, useMemo, useState } from "react";

type TContext = {
  filteredData: Application[];
  search: (value: string) => void;
};

const initialContext: TContext = {
  filteredData: [],
  search: () => console.log("search"),
};

export const ApplicationsContext = createContext(initialContext);

export const ApplicationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const { data } = api.application.getAll.useQuery();

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (searchValue) {
      return data?.filter((el) => {
        const position = el.position.toLowerCase();
        const company = el.company.toLowerCase();
        const value = searchValue.toLowerCase();
        return position.includes(value) || company.includes(value);
      });
    }
    return data;
  }, [searchValue, data]);

  const search = (value: string) => {
    setSearchValue(value);
  };

  return (
    <ApplicationsContext.Provider value={{ filteredData, search }}>
      {children}
    </ApplicationsContext.Provider>
  );
};
