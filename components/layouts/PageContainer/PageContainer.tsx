import { PageContainerProps } from "@core/types";
import Head from "next/head";

export const PageContainer = ({
  headTitle,
  description,
  center,
  children,
}: PageContainerProps) => {
  return (
    <>
      <Head>
        <title>{headTitle ?? "Next page"}</title>
        <meta name="description" content={description} />
      </Head>

      <div
        data-theme="dark"
        className={`w-screen min-h-screen flex flex-col ${
          center && "justify-center items-center"
        }`}
      >
        {children}
      </div>
    </>
  );
};
