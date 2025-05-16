import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  children: React.ReactNode;
  error?: string;
  hint?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  children,
  error,
  hint,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      {children}
      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500">{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormField;