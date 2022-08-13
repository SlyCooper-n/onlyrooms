import { TabsContentProps, TabsProps } from "@core/types";
import * as RadixTabs from "@radix-ui/react-tabs";

export const Tabs = ({ triggers, children }: TabsProps) => {
  return (
    <RadixTabs.Root defaultValue={triggers[0]} className="card bg-base-200">
      <RadixTabs.List className="tabs">
        {triggers.map((trigger) => (
          <RadixTabs.Trigger
            key={trigger}
            value={trigger}
            className="tab tab-bordered flex-1 focus:outline-none focus:tab-active hover:tab-active transition capitalize"
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
  return (
    <RadixTabs.Content value={value} className="p-4">
      {children}
    </RadixTabs.Content>
  );
};
