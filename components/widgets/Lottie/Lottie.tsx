import { LottieOptions, LottieRefCurrentProps, useLottie } from "lottie-react";
import { useEffect } from "react";

interface LottieProps extends LottieOptions {
  clicked?: boolean;
  toggleClicked?: () => void;
  speed?: number;
  segments?: [number, number];
  backwards?: boolean;
  actionOnClick?: "revert" | "play-pause" | "stop" | "none";
  customOnClick?: (lottieFunctions: LottieRefCurrentProps) => void;
}

// TODO: Add actions on Enter or Space key press
// TODO: Add testing
// TODO: Refactor code
// TODO: Add actions to play-pause and stop
// TODO: Transform into a package
// TODO: Fix the state

export const Lottie = ({
  clicked,
  toggleClicked,
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

        if (toggleClicked) return toggleClicked();
      }
    },
    onKeyDown: () => {},
    className,
  });

  lottie.setSpeed(speed);

  const duration = lottie.getDuration(true) as number;
  const [segmentStart, segmentEnd] = segments || [0, duration];

  useEffect(() => {
    if (clicked) {
      lottie.goToAndStop(backwards ? segmentStart : segmentEnd, true);
    }

    if (!clicked) {
      lottie.goToAndStop(backwards ? segmentEnd : segmentStart, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return lottie.View;
};
