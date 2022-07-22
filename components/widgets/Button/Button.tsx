import { ButtonProps } from "@core/types";

export const Button = ({
  type = "button",
  ring,
  className = "",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      className={`btn gap-2 font-primary ${className} ${
        ring && `focus:ring-2 focus:ring-offset-4 focus:ring-offset-base-100`
      }`}
    >
      {children}
    </button>
  );
};
