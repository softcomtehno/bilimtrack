import { cn } from "@/shared/lib/utils";
import React, { forwardRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  options: SelectOption[];
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
  hideEmptyOption?: boolean;
}

export const CustomSelect = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, error, options, onChange, hideEmptyOption, ...props },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <div className="w-full">
        <div className="flex items-center gap-2">
          {label && (
            <label
              htmlFor={props.id}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {label}
            </label>
          )}
          {label === "Уровни образования" && (
            <span className="text-red-500 font-bold">*</span>
          )}
        </div>
        <select
          className={cn(
            "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
            error &&
              "border-error-500 focus:border-error-500 focus:ring-error-500",
            className
          )}
          onChange={handleChange}
          ref={ref}
          {...props}
        >
          {!hideEmptyOption && <option value="">Выберите...</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";
