import { SelectProps } from "@core/types";
import * as RadixSelect from "@radix-ui/react-select";
import { Check } from "phosphor-react";
import { useRef } from "react";

export const Select = ({
  selectedValue,
  changeValue,
  options,
}: SelectProps) => {
  const selectRef = useRef<HTMLButtonElement>(null);

  return (
    <RadixSelect.Root value={selectedValue} onValueChange={changeValue}>
      <RadixSelect.Trigger
        ref={selectRef}
        className="input min-w-[12rem] flex justify-between items-center gap-2 bg-base-300"
      >
        <RadixSelect.Value>{selectedValue}</RadixSelect.Value>

        <RadixSelect.Icon />
      </RadixSelect.Trigger>

      <div className="flex justify-end items-start">
        <RadixSelect.Content className="mt-8 min-w-[12rem] p-2 bg-base-300 rounded-lg">
          {options.map((option) => (
            <RadixSelect.Item
              key={option.value}
              value={option.value}
              disabled={option.value === "annonymous"}
              className={`relative pl-10 text-start hover:bg-primary hover:text-primary-content transition-colors ${
                option.value === "annonymous"
                  ? "opacity-50 pointer-events-none"
                  : ""
              }`}
            >
              <RadixSelect.ItemIndicator className="absolute left-2">
                <Check size={20} />
              </RadixSelect.ItemIndicator>

              <RadixSelect.ItemText className="first-letter:capitalize">
                {option.text}
              </RadixSelect.ItemText>
            </RadixSelect.Item>
          ))}
        </RadixSelect.Content>
      </div>
    </RadixSelect.Root>
  );
};
