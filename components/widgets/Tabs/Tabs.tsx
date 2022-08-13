import { TabsContentProps, TabsProps } from "@core/types";
import * as RadixTabs from "@radix-ui/react-tabs";

export const Tabs = ({ triggers, children }: TabsProps) => {
  return (
    <RadixTabs.Root defaultValue={triggers[0]}>
      <RadixTabs.List className="tabs">
        {triggers.map((trigger) => (
          <RadixTabs.Trigger
            key={trigger}
            value={trigger}
            className="tab tab-bordered first-letter:capitalize"
          >
            {trigger}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {children}
    </RadixTabs.Root>
  );
};

export const TabsContent = ({ value, children }: TabsContentProps) => {
  return <RadixTabs.Content value={value}>{children}</RadixTabs.Content>;
};
