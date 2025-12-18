export type ColorPickerProps = {
  value: string;
  onChange: (color: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  id?: string;
  placeholder?: string;
};
