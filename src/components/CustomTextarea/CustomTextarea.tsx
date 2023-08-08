import styles from "./textarea.module.css";

type TextareaProps = {
  value: string;
  placeholder?: string;
  onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
};

export const CustomTextarea = (props: TextareaProps) => {
  const { value, placeholder, onChange } = props;

  return (
    <textarea
      className={styles.textField}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
