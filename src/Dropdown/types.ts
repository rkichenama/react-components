export type DropdownOption<T extends any = string> = {
  // used only for UI, if available
  label?: any;
  value: T;
};

export interface DropdownProps<T extends any = string>
  extends Omit<React.HTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'defaultValue'>
{
  value: T | T[];
  onChange: (value: T) => void;
  label?: string;
  options?: DropdownOption<T>[];
  helperText?: string;
  validationMessage?: string;
  maxCharacters?: number;
  size?: number;
}