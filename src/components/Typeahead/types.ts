export type TypeaheadOption<T extends any> = {
  value: T;
  label?: string;
}

export interface TypeaheadProps<T extends any>
  extends Omit<
    React.HTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'defaultValue'> {
  // you get
  value: string;
  onChange: (value: string) => void;
  selection?: T;
  onSelectionChange?: (value?: T) => void;
  options: TypeaheadOption<T>[];
  label?: string;
  icon?: React.ReactNode;
  helperText?: string;
  validationMessage?: string;
  size?: number;
  isLoading?: boolean;
}