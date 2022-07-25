import { ReactNode } from "react";
import { Footer, Navbar } from "./components";

interface PageLayoutProps {
  navbar?: boolean;
  footer?: boolean;
  children: ReactNode | ReactNode[];
}

export const PageLayout = ({ navbar, footer, children }: PageLayoutProps) => {
  return (
    <>
      {navbar && <Navbar />}

      <>{children}</>

      {footer && <Footer />}
    </>
  );
};
