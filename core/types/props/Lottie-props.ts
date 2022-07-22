import { LottieOptions, LottieRefCurrentProps } from "lottie-react";

export interface LottieProps extends LottieOptions {
  speed?: number;
  segments?: [number, number];
  backwards?: boolean;
  actionOnClick?: "revert" | "play-pause" | "stop" | "none";
  customOnClick?: (lottieFunctions: LottieRefCurrentProps) => void;
}
