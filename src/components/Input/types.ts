/* eslint-disable no-unused-vars */
export interface InputProps
  extends Omit<React.HTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'defaultValue'>
{
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  label?: string;
  helperText?: string;
  validationMessage?: string;
  maxCharacters?: number;
  size?: number;
}
export interface LabelProps {
  active: boolean;
  hasIcon: boolean;
}
