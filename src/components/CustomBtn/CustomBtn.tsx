import styles from "./btn.module.css";

type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  onClick: () => void;
};

export const CustomBtn = (props: ButtonProps) => {
  const { type, text, onClick } = props;

  return (
    <button type={type} onClick={onClick}>
      {text}
    </button>
  );
};
