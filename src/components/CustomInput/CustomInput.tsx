import React from "react";
import styles from "./input.module.css";

type InputProps = {
  id: string;
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  error?: string;
  success?: boolean;
  successIcon?: React.ReactElement;
  errorIcon?: React.ReactElement;
  additionalStyles?: React.CSSProperties;
};

export const Input = (props: InputProps) => {
  const {
    id,
    type,
    name,
    placeholder,
    value,
    onChange,
    error,
    success,
    successIcon,
    errorIcon,
    additionalStyles,
  } = props;

  return (
    <div className={styles.inputField}>
      <div className={styles.inputFieldWrapper}>
        <input
          id={id}
          className={
            error
              ? `${styles.input as string} ${styles.error as string}`
              : success
              ? `${styles.input as string} ${styles.success as string}`
              : `${styles.input as string}`
          }
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={styles}
        />
        <label htmlFor={name} className={styles.floatingPlaceholder}>
          {placeholder}
        </label>
        {success && (
          <div
            className={`${styles.successIcon as string} ${
              styles.inputStatusIcon as string
            }`}
          >
            {successIcon}
          </div>
        )}
        {error && (
          <div
            className={`${styles.errorIcon as string} ${
              styles.inputStatusIcon as string
            }`}
          >
            {errorIcon}
          </div>
        )}
      </div>
      {error ? (
        <span
          className={`${styles.inputFieldError as string} ${
            styles.errorLine as string
          }`}
        >
          {error}
        </span>
      ) : (
        <span className={styles.errorLine}></span>
      )}
    </div>
  );
};
export default Input;
