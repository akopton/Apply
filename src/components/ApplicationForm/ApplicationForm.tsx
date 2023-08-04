import { useContext, useEffect, useState } from "react";
import { Status } from "@prisma/client";
import styles from "./form.module.css";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { ApplicationFormContext } from "@/context/FormContext";
import { AiOutlineClose } from "react-icons/ai";

export const ApplicationForm = () => {
  const [showContent, setShowContent] = useState(false);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("sent");
  const { closeForm } = useContext(ApplicationFormContext);

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
            />
          </div>
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
        </>
      )}
    </form>
  );
};
