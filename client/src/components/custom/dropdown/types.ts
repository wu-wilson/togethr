export type DropdownProps = {
  id: string;
  label: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
};
