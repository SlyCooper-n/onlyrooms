import { LottieOptions, LottieRefCurrentProps, useLottie } from "lottie-react";
import { useState } from "react";

interface LottieProps extends LottieOptions {
  speed?: number;
  segments?: [number, number];
  backwards?: boolean;
  actionOnClick?: "revert" | "play-pause" | "stop" | "none";
  customOnClick?: (lottieFunctions: LottieRefCurrentProps) => void;
}

export const Lottie = ({
  animationData,
  loop,
  autoplay,
  className,
  segments,
  speed = 1,
  backwards = false,
  actionOnClick = "revert",
  customOnClick,
}: LottieProps) => {
  const [clicked, setClicked] = useState(false);

  const lottie = useLottie({
    animationData,
    loop: loop || false,
    autoplay: autoplay || false,
    onClick: () => {
      // custom onClick function that calls the function gaven in props
      // and ignores the default
      if (customOnClick) {
        customOnClick({
          ...lottie,
        });
        return;
      }

      // default onClick options => "revert", "stop" etc...
      const { playSegments, getDuration } = lottie;

      const duration = getDuration(true) as number;
      const [segmentStart, segmentEnd] = segments || [0, duration];

      if (actionOnClick === "revert") {
        if (!clicked) {
          playSegments(
            backwards ? [segmentEnd, segmentStart] : [segmentStart, segmentEnd],
            true
          );
        }

        if (clicked) {
          playSegments(
            backwards ? [segmentStart, segmentEnd] : [segmentEnd, segmentStart],
            true
          );
        }

        setClicked((prevClicked) => !prevClicked);
      }
    },
    className,
  });

  lottie.setSpeed(speed);

  return lottie.View;
};
