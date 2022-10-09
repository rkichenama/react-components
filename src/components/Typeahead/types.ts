export type TypeaheadOption<T> = {
  value: T;
  label?: string;
}

export interface TypeaheadProps<T>
  extends Omit<
    React.HTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'defaultValue'> {
  value: string;
  onChange: (_value: string) => void;
  selection?: T;
  onSelectionChange?: (_value?: T) => void;
  options: TypeaheadOption<T>[];
  label?: string;
  icon?: React.ReactNode;
  helperText?: string;
  validationMessage?: string;
  size?: number;
  isLoading?: boolean;
}
