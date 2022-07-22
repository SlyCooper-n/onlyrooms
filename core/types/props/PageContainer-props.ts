import { ReactNode } from "react";

export interface PageContainerProps {
  headTitle?: string;
  description?: string;
  center?: boolean;
  children: ReactNode | ReactNode[];
}
