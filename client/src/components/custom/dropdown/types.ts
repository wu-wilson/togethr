export type DropdownProps = {
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  id?: string;
  label?: string;
  placeholder?: string;
  invalid?: boolean;
};
