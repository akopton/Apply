import { useState } from "react";
import CustomInput from "../CustomInput/CustomInput";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { CustomTextarea } from "../CustomTextarea/CustomTextarea";
import { AiOutlineCheckCircle } from "react-icons/ai";
import styles from "./form.module.css";

export const ApplicationForm = () => {
  const [role, setRole] = useState({ name: "", error: "" });
  const [company, setCompany] = useState({
    name: "",
    error: "",
  });

  const [status, setStatus] = useState<string>("");
  const statusList = ["sent", "opened", "answered", "rejected"];

  const [platform, setPlatform] = useState<string>("");
  const platformList = ["justjoin.it", "nofluffjobs.com", "pracuj.pl"];

  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState("");

  const reset = () => {
    setRole({ name: "", error: "" });
    setCompany({ name: "", error: "" });
    setStatus("");
    setComment("");
  };

  const handleClick = () => {
    setShowCommentInput(true);
  };

  const handleComment = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
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

  const handlePlatform = (el: string) => {
    setPlatform(el);
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
    console.log(role.name, company.name, status, comment);
    // ADD NEW APPLICATION
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
      <div className="flex w-full">
        <div className={styles.dropdownWrapper}>
          <CustomDropdown
            data={statusList}
            onSelect={handleStatus}
            selectedItem={status}
            placeholder="Choose status..."
          />
        </div>
        <div className={styles.dropdownWrapper}>
          <CustomDropdown
            data={platformList}
            onSelect={handlePlatform}
            selectedItem={platform}
            placeholder="Choose platform..."
            searchInput
          />
        </div>
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
        onBlur={() => setShowCommentInput(false)}
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
      <button className={styles.addBtn} type="submit">
        Save
      </button>
    </form>
  );
};
