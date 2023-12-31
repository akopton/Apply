import { Ref, forwardRef, useRef, useState } from "react";
import CustomInput from "../CustomInput/CustomInput";
import { CustomTextarea } from "../CustomTextarea/CustomTextarea";
import { AiOutlineCheckCircle } from "react-icons/ai";
import styles from "./form.module.css";
import { api } from "@/utils/api";
import { CustomPicker } from "../CustomPicker/CustomPicker";
import { LoadingStatusModal } from "../LoadingStatusModal/LoadingStatusModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ActionsModal } from "../ActionsModal/ActionsModal";

export const ApplicationForm = () => {
  const statusList = api.status.getAll.useQuery();
  const platformList = api.searchPlatform.getAll.useQuery();
  const { mutateAsync: addApplication, isSuccess } =
    api.application.add.useMutation();
  const { mutateAsync: addStatusUpdate } =
    api.statusUpdate.addNew.useMutation();

  const [position, setPosition] = useState({ value: "", error: "" });
  const [company, setCompany] = useState({
    value: "",
    error: "",
  });

  const [status, setStatus] = useState({ value: "", error: "" });
  const [platform, setPlatform] = useState({ value: "", error: "" });
  const [comment, setComment] = useState("");

  const [showCommentInput, setShowCommentInput] = useState(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const [isCalendarOpened, setIsCalendarOpened] = useState<boolean>(false);

  const CustomDateInput = forwardRef(
    (
      props: {
        value: string;
        onClick: () => void;
        disabled: boolean;
        startOpen: boolean;
      },
      ref: Ref<HTMLButtonElement>
    ) => {
      return (
        <button
          type="button"
          className={styles.dateBtn}
          style={{
            opacity: props.disabled ? "0.4" : "1",
            borderColor: isCalendarOpened
              ? "var(--secondary-color)"
              : "var(--primary-color)",
          }}
          ref={ref}
          onClick={props.onClick}
        >
          {props.value}
        </button>
      );
    }
  );

  CustomDateInput.displayName = "CustomDateInput";

  const reset = () => {
    setPosition({ value: "", error: "" });
    setCompany({ value: "", error: "" });
    setPlatform({ value: "", error: "" });
    setStatus({ value: "", error: "" });
    setComment("");
  };

  const validateForm = () => {
    if (!position.value || !company.value || !status.value || !platform.value) {
      if (!position.value) {
        setPosition((prev) => ({
          ...prev,
          error: "Position is required!",
        }));
      }
      if (!company.value) {
        setCompany((prev) => ({
          ...prev,
          error: "Company name is required!",
        }));
      }
      if (!status.value) {
        setStatus((prev) => ({ ...prev, error: "Status is required!" }));
      }
      if (!platform.value) {
        setPlatform((prev) => ({ ...prev, error: "Platform is required!" }));
      }
      return false;
    }

    return true;
  };

  const handleComment = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };

  const handleRole = (e: React.FormEvent<HTMLInputElement>) => {
    const roleName = e.currentTarget.value;
    setPosition((prev) => ({
      ...prev,
      value: roleName,
      error: "",
    }));
  };

  const handleCompany = (e: React.FormEvent<HTMLInputElement>) => {
    const companyName = e.currentTarget.value;
    setCompany((prev) => ({
      ...prev,
      value: companyName,
      error: "",
    }));
  };

  const handleStatus = (el: string) => {
    setStatus((prev) => ({ value: el, error: "" }));
  };

  const handlePlatform = (el: string) => {
    setPlatform({ value: el, error: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const addedApplication = await addApplication({
        position: position.value,
        company: company.value,
        status: status.value,
        platform: platform.value,
        comment,
      });
      await addStatusUpdate({
        status: status.value,
        updatedAt: date ? date : new Date(),
        applicationId: addedApplication.id,
      });
    } catch (e) {
      console.error(e);
    }

    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <CustomInput
        id="role-input"
        type="text"
        name="role-input"
        value={position.value}
        onChange={handleRole}
        placeholder="*Position"
        error={position.error}
      />
      <CustomInput
        id="company-input"
        type="text"
        name="company-input"
        value={company.value}
        onChange={handleCompany}
        placeholder="*Company name"
        error={company.error}
      />
      <div className="relative flex h-28 flex-col items-center gap-3">
        <CustomPicker
          data={statusList.data ? statusList.data : []}
          placeholder="*Choose status..."
          onSelect={handleStatus}
          selectedItem={status.value}
          searchProperty="name"
          additionalStyles={
            status.error ? { borderColor: "var(--primary-color)" } : {}
          }
        />
        <span className={styles.dropdownError}>{status.error}</span>
        <DatePicker
          onCalendarOpen={() => setIsCalendarOpened(true)}
          onCalendarClose={() => setIsCalendarOpened(false)}
          disabled={status.value === "" ? true : false}
          dateFormat="dd.MM.yyyy"
          selected={date}
          onChange={(date) => setDate(date)}
          customInput={
            <CustomDateInput
              startOpen
              disabled
              value={""}
              onClick={() => {
                throw new Error("Function not implemented.");
              }}
            />
          }
        />
      </div>
      <div className="relative h-20">
        <CustomPicker
          data={platformList.data ? platformList.data : []}
          placeholder="*Choose platform..."
          onSelect={handlePlatform}
          selectedItem={platform.value}
          searchProperty="url"
          searchInput
          additionalStyles={
            status.error ? { borderColor: "var(--primary-color)" } : {}
          }
        />
        <span className={styles.dropdownError}>{platform.error}</span>
      </div>
      <button
        type="button"
        onClick={() => setShowCommentInput(true)}
        className={styles.addBtn}
      >
        Add comment
      </button>

      <ActionsModal
        isModalOpened={showCommentInput}
        close={() => setShowCommentInput(false)}
        title="Add your comment"
      >
        <CustomTextarea
          value={comment}
          placeholder="Type your comment..."
          onChange={handleComment}
        />
      </ActionsModal>
      <button className={styles.addBtn} type="submit">
        Save
      </button>
      {isSuccess && <LoadingStatusModal />}
    </form>
  );
};
