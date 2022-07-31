import { useTheme } from "@core/hooks";
import { PageContainerProps } from "@core/types";
import Head from "next/head";

export const PageContainer = ({
  headTitle,
  description,
  center,
  children,
}: PageContainerProps) => {
  const { appTheme } = useTheme();

  return (
    <>
      <Head>
        <title>{headTitle ?? "Next page"}</title>
        <meta name="description" content={description} />
      </Head>

      <div
        data-theme={appTheme}
        className={`w-screen min-h-screen flex flex-col font-text ${
          center && "justify-center items-center"
        }`}
      >
        {children}
      </div>
    </>
  );
};
