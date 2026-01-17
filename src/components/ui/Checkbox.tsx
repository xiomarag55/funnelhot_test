import React from "react";
import { Check } from "lucide-react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  className = "",
}) => {
  return (
    <label className={`flex items-center cursor-pointer ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 border rounded flex items-center justify-center ${
            checked
              ? "bg-primary-600 border-primary-600"
              : "border-gray-300 bg-white"
          }`}
        >
          {checked && <Check className="h-3 w-3 text-white" />}
        </div>
      </div>
      <span className="ml-2 text-sm text-gray-700">{label}</span>
    </label>
  );
};
