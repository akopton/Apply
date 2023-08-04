import { useContext, useState } from "react";
import { Status } from "@prisma/client";
import styles from "./form.module.css";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { ApplicationFormContext } from "@/context/FormContext";

export const ApplicationForm = () => {
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("sent");
  const { closeForm } = useContext(ApplicationFormContext);

  return (
    <form className={styles.form} action="">
      <CustomBtn type="button" text="Close form" onClick={closeForm} />
      <input
        className={styles.input}
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
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
    </form>
  );
};
