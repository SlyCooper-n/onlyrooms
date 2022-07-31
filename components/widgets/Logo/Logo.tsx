import { useTheme } from "@core/hooks";

interface LogoProps {
  theme?: "dark" | "light";
}

export const Logo = ({ theme }: LogoProps) => {
  const { appTheme } = useTheme();

  if (theme) {
    return (
      <>
        <span className="text-primary font-title first-letter:capitalize normal-case">
          Only
        </span>
        <span
          className={`font-title first-letter:capitalize normal-case ${
            theme === "dark" ? "text-neutral" : "text-white"
          }`}
        >
          Rooms
        </span>
      </>
    );
  }

  return (
    <>
      <span className="text-primary font-title first-letter:capitalize normal-case">
        Only
      </span>
      <span
        className={`font-title first-letter:capitalize normal-case ${
          appTheme === "dark" ? "text-white" : "text-neutral"
        }`}
      >
        Rooms
      </span>
    </>
  );
};
