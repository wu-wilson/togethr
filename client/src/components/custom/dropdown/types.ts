export type DropdownProps = {
  label: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
};
