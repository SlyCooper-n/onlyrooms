import { AuthContext } from "@core/contexts";
import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { SelectOptions, UserType } from "./types";

// * Contexts providers props
export interface AuthProviderProps {
  children: ReactNode | ReactNode[];
}

export interface ThemeProviderProps {
  children: ReactNode | ReactNode[];
}

// * layout components props
export interface PageContainerProps {
  headTitle?: string;
  description?: string;
  center?: boolean;
  children: ReactNode | ReactNode[];
}

export interface PageLayoutProps {
  navbar?: boolean;
  footer?: boolean;
  children: ReactNode | ReactNode[];
}

// * module components props
export interface RoomHeaderProps {
  roomID: string;
  isAdmin?: boolean;
  closeRoom?: () => void;
}

export interface RoomInfoProps {
  title: string;
  questionsLength: number;
}

// * widget components props
export interface AvatarPopoverProps {
  user: UserType;
  className?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ring?: boolean;
  children: ReactNode | ReactNode[];
}

export interface RoomCodeProps {
  roomCode: string;
}

export interface SelectProps {
  selectedValue: string;
  changeValue: (value: any) => void;
  options: SelectOptions[];
}

// * in-page components props
export interface IllustrationProps extends HTMLAttributes<HTMLDivElement> {}

export interface SignInListProps {
  providers: { signInWithGoogle: AuthContext["signInWithGoogle"] };
}
