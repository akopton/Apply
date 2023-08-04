import { createContext, useState } from "react";

const initialContext = {
  isFormOpened: false,
  closeForm: () => console.log("close form"),
  openForm: () => console.log("open form"),
};

export const ApplicationFormContext = createContext(initialContext);

export const ApplicationFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isFormOpened, setIsFormOpened] = useState(false);

  const openForm = () => setIsFormOpened(true);

  const closeForm = () => setIsFormOpened(false);

  return (
    <ApplicationFormContext.Provider
      value={{ isFormOpened, closeForm, openForm }}
    >
      {children}
    </ApplicationFormContext.Provider>
  );
};
