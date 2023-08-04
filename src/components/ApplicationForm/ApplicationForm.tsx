import { useContext, useEffect, useState } from "react";
import { Status } from "@prisma/client";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { ApplicationFormContext } from "@/context/FormContext";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./form.module.css";
import CustomInput from "../CustomInput/CustomInput";
import { set } from "zod";

export const ApplicationForm = () => {
  const [showContent, setShowContent] = useState(false);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("sent");
  const { closeForm } = useContext(ApplicationFormContext);

  const handleRole = (e: React.FormEvent<HTMLInputElement>) => {
    setRole(e.currentTarget.value);
  };

  const handleCompany = (e: React.FormEvent<HTMLInputElement>) => {
    setCompany(e.currentTarget.value);
  };

  useEffect(() => {
    const unsub = () => setTimeout(() => setShowContent(true), 300);

    return () => {
      unsub();
    };
  }, []);

  return (
    <form className={styles.form} action="">
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
            value={role}
            onChange={handleRole}
            placeholder="Position"
          />
          <CustomInput
            id="company-input"
            type="text"
            name="company-input"
            value={company}
            onChange={handleCompany}
            placeholder="Company name"
          />
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
