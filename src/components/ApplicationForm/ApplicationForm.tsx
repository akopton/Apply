import { useState } from "react";
import CustomInput from "../CustomInput/CustomInput";
import { CustomTextarea } from "../CustomTextarea/CustomTextarea";
import { AiOutlineCheckCircle } from "react-icons/ai";
import styles from "./form.module.css";
import { api } from "@/utils/api";
import { CustomPicker } from "../CustomPicker/CustomPicker";
import { LoadingStatusModal } from "../LoadingStatusModal/LoadingStatusModal";

export const ApplicationForm = () => {
  const statusList = api.status.getAll.useQuery();
  const platformList = api.searchPlatform.getAll.useQuery();
  const {
    mutateAsync: addApplication,
    isLoading,
    isError,
    isSuccess,
  } = api.application.add.useMutation();

  const [position, setPosition] = useState({ value: "", error: "" });
  const [company, setCompany] = useState({
    value: "",
    error: "",
  });

  const [status, setStatus] = useState({ value: "", error: "" });
  const [platform, setPlatform] = useState({ value: "", error: "" });
  const [comment, setComment] = useState("");

  const [showCommentInput, setShowCommentInput] = useState(false);

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
      await addApplication({
        position: position.value,
        company: company.value,
        status: status.value,
        platform: platform.value,
        comment,
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
      <div className="relative h-20">
        <CustomPicker
          data={statusList.data ? statusList.data : []}
          placeholder="*Choose status..."
          onSelect={handleStatus}
          selectedItem={status.value}
          additionalStyles={
            status.error ? { borderColor: "var(--primary-color)" } : {}
          }
        />
        <span className={styles.dropdownError}>{status.error}</span>
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
      <div
        className={styles.commentInputWrapper}
        style={{ bottom: showCommentInput ? "0" : "-100%" }}
      >
        <div className={styles.commentInputHeader}>
          <span>Add your comment</span>
          <button
            type="button"
            className={styles.commentInputHeaderIcon}
            onClick={() => setShowCommentInput(false)}
          >
            <AiOutlineCheckCircle />
          </button>
        </div>
        <CustomTextarea
          value={comment}
          placeholder="Type your comment..."
          onChange={handleComment}
        />
      </div>
      {showCommentInput && (
        <div
          className={styles.commentBlur}
          onClick={() => setShowCommentInput(false)}
        />
      )}
      <button className={styles.addBtn} type="submit">
        Save
      </button>
      <LoadingStatusModal
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
      />
    </form>
  );
};
