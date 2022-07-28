import { ReactNode } from "react";

export interface PageLayoutProps {
  navbar?: boolean;
  footer?: boolean;
  children: ReactNode | ReactNode[];
}
