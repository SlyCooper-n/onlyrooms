import * as RadixTooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

interface TooltipProps {
  tooltipContent: string | JSX.Element;
  children: ReactNode | ReactNode[];
}

export const Tooltip = ({ tooltipContent, children }: TooltipProps) => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>

        <RadixTooltip.Portal>
          <RadixTooltip.Content className="p-2 bg-neutral rounded-md">
            <RadixTooltip.Arrow />

            {tooltipContent}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
