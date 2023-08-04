import styles from "./btn.module.css";

type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  text?: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

export const CustomBtn = (props: ButtonProps) => {
  const { type, text, icon, onClick } = props;

  return (
    <button className={styles.btn} type={type} onClick={onClick}>
      {text && text}
      {icon && icon}
    </button>
  );
};
