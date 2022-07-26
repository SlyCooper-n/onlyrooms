import * as RadixSelect from "@radix-ui/react-select";
import { RoomType } from "pages/rooms/new";
import { CaretDown, Check } from "phosphor-react";
import { useRef } from "react";

interface SelectProps {
  selected: RoomType;
  selectValues: RoomType[];
  changeValue: (value: RoomType) => void;
}

export const Select = ({
  selected,
  selectValues,
  changeValue,
}: SelectProps) => {
  const selectTriggerButtonRef = useRef(null);

  return (
    <RadixSelect.Root
      value={selected}
      onValueChange={(item) => changeValue(item as RoomType)}
    >
      <label className="mb-12 flex items-center gap-2">
        Room type:
        <RadixSelect.Trigger asChild>
          <button
            ref={selectTriggerButtonRef}
            className="input w-48 flex justify-between items-center gap-2 bg-base-300"
          >
            <RadixSelect.Value>{selected}</RadixSelect.Value>
            <RadixSelect.Icon asChild>
              <CaretDown />
            </RadixSelect.Icon>
          </button>
        </RadixSelect.Trigger>
      </label>

      <RadixSelect.Portal container={selectTriggerButtonRef.current}>
        <RadixSelect.Content className="w-48 mt-32 -ml-4 p-2 bg-base-300 rounded-md">
          {selectValues.map((item) => (
            <RadixSelect.Item
              key={item}
              value={item}
              disabled={item === "annonymous"}
              className={`pl-10 text-start outline-none hover:bg-primary hover:text-primary-content hover:cursor-pointer rounded-md transition-colors ${
                item === "annonymous"
                  ? "opacity-50 hover:bg-transparent hover:text-base-content hover:cursor-auto pointer-events-none"
                  : ""
              }`}
            >
              <RadixSelect.ItemIndicator asChild>
                <Check size={20} className="absolute left-0" />
              </RadixSelect.ItemIndicator>

              <RadixSelect.ItemText>{item}</RadixSelect.ItemText>
            </RadixSelect.Item>
          ))}
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};
