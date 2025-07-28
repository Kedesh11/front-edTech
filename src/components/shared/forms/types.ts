export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'number' | 'tel' | 'date';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  helper?: string;
  error?: string;
  icon?: string;
  maxLength?: number;
  autoComplete?: string;
  disabled?: boolean;
}

export interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  fields: FormField[];
  submitLabel: string;
  title?: string;
  description?: string;
  loading?: boolean;
  errorMessage?: string;
  successMessage?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  size?: 'small' | 'medium' | 'large';
}
