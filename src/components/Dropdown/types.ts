/* eslint-disable no-unused-vars */
export type DropdownOption<T> = {
  // used only for UI, if available
  label?: any;
  value: T;
};

export interface DropdownProps<T>
  extends Omit<React.HTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'defaultValue'>
{
  value: T;
  onChange?: (value?: T) => void;
  label?: string;
  icon?: React.ReactNode;
  options?: DropdownOption<T>[];
  helperText?: string;
  validationMessage?: string;
  size?: number;
}
