import styles from "./btn.module.css";

type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  text?: string;
  icon?: React.ReactNode;
  additionalStyles?: React.CSSProperties;
  onClick: () => void;
};

export const CustomBtn = (props: ButtonProps) => {
  const { type, text, icon, additionalStyles, onClick } = props;

  return (
    <button
      className={styles.btn}
      type={type}
      onClick={onClick}
      style={additionalStyles}
    >
      {text && text}
      {icon && icon}
    </button>
  );
};
