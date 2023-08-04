import { useContext, useEffect, useState } from "react";
import { Status } from "@prisma/client";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { ApplicationFormContext } from "@/context/FormContext";
import { AiOutlineClose, AiOutlineCheckCircle } from "react-icons/ai";
import styles from "./form.module.css";
import CustomInput from "../CustomInput/CustomInput";
import CustomDropdown from "../CustomDropdown/CustomDropdown";

export const ApplicationForm = () => {
  const [showContent, setShowContent] = useState(false);
  const [role, setRole] = useState({ name: "", error: "" });
  const [company, setCompany] = useState({
    name: "",
    error: "",
  });

  const [status, setStatus] = useState<string>("");
  const { closeForm } = useContext(ApplicationFormContext);

  const reset = () => {
    setRole({ name: "", error: "" });
    setCompany({ name: "", error: "" });
    setStatus("");
  };

  const handleRole = (e: React.FormEvent<HTMLInputElement>) => {
    const roleName = e.currentTarget.value;
    setRole((prev) => ({
      ...prev,
      name: roleName,
      error: "",
    }));
  };

  const handleCompany = (e: React.FormEvent<HTMLInputElement>) => {
    const companyName = e.currentTarget.value;
    setCompany((prev) => ({
      ...prev,
      name: companyName,
      error: "",
    }));
  };

  const handleStatus = (el: string) => {
    setStatus(el);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.name || !company.name) {
      if (!role.name) {
        setRole((prev) => ({
          ...prev,
          error: "Position is required!",
        }));
      }
      if (!company.name) {
        setCompany((prev) => ({
          ...prev,
          error: "Company name is required!",
        }));
      }
      return;
    }

    reset();
    console.log(role.name, company.name, status);
  };

  useEffect(() => {
    const unsub = () => setTimeout(() => setShowContent(true), 300);

    return () => {
      unsub();
    };
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {showContent && (
        <>
          <div className={styles.closeFormBtn}>
            <CustomBtn
              type="button"
              icon={<AiOutlineClose />}
              onClick={closeForm}
              additionalStyles={{
                border: "none",
              }}
            />
          </div>
          <CustomInput
            id="role-input"
            type="text"
            name="role-input"
            value={role.name}
            onChange={handleRole}
            placeholder="Position"
            error={role.error}
          />
          <CustomInput
            id="company-input"
            type="text"
            name="company-input"
            value={company.name}
            onChange={handleCompany}
            placeholder="Company name"
            error={company.error}
          />
          <div className={styles.dropdownWrapper}>
            <CustomDropdown
              data={["sent", "opened", "answered", "rejected"]}
              onSelect={handleStatus}
              selectedItem={status}
              placeholder="Choose status..."
            />
          </div>
          <select
            className={styles.select}
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
          >
            <option className={styles.option} value="sent">
              sent
            </option>
            <option className={styles.option} value="opened">
              opened
            </option>
            <option className={styles.option} value="answered">
              answered
            </option>
            <option className={styles.option} value="rejected">
              rejected
            </option>
          </select>

          <button className={styles.addBtn} type="submit">
            Save
          </button>
        </>
      )}
    </form>
  );
};
