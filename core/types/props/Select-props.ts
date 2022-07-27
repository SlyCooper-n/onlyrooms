import { SelectOptions } from "../@types";

export interface SelectProps {
  selectedValue: string;
  changeValue: (value: any) => void;
  options: SelectOptions[];
}
