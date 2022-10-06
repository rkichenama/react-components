export type DropdownOption<T extends any = string> = {
  // used only for UI, if available
  label?: any;
  value: T;
};

export interface DropdownProps<T extends any = string>
  extends Omit<React.HTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'defaultValue'>
{
  value: T;
  onChange: (value: T) => void;
  label?: string;
  icon?: React.ReactNode;
  options?: DropdownOption<T>[];
  helperText?: string;
  validationMessage?: string;
  size?: number;
}