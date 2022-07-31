import { PageLayoutProps } from "@core/types";
import { Footer, Navbar } from "./components";

export const PageLayout = ({ navbar, footer, children }: PageLayoutProps) => {
  return (
    <>
      {navbar && <Navbar />}

      <>{children}</>

      {footer && <Footer />}
    </>
  );
};
