import styles from "./btn.module.css";

type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  text?: string;
  icon?: React.ReactNode;
  iconPlacement?: "beforeText" | "afterText";
  additionalStyles?: React.CSSProperties;
  onClick: () => void;
};

export const CustomBtn = (props: ButtonProps) => {
  const { type, text, icon, iconPlacement, additionalStyles, onClick } = props;

  if (!icon) {
    return (
      <button
        className={styles.btn}
        type={type}
        onClick={onClick}
        style={additionalStyles}
      >
        {text && text}
      </button>
    );
  }

  return (
    <button
      className={styles.btn}
      type={type}
      onClick={onClick}
      style={additionalStyles}
    >
      {iconPlacement === "beforeText" ? (
        <div className={styles.btnContent}>
          {icon}
          {text}
        </div>
      ) : (
        <div className={styles.btnContent}>
          {text}
          {icon}
        </div>
      )}
    </button>
  );
};
