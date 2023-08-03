import { signIn } from "next-auth/react";

type BtnProps = {
  provider: string;
};

export const AuthBtn = (props: BtnProps) => {
  const handleClick = () => signIn(props.provider);

  return (
    <button type="button" onClick={handleClick}>
      Sign In
    </button>
  );
};
