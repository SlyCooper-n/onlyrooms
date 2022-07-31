import * as RadixTooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

interface TooltipProps {
  tooltipContent: string | JSX.Element;
  children: ReactNode | ReactNode[];
}

export const Tooltip = ({ tooltipContent, children }: TooltipProps) => {
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger>{children}</RadixTooltip.Trigger>

      <RadixTooltip.Portal>
        <RadixTooltip.Content>
          <RadixTooltip.Arrow />

          {tooltipContent}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
};
