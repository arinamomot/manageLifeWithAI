"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "../../ui/input";
import { ClearButton } from "../clear-button";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  type?: string;
}

export const FormInput: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  placeholder,
  type,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const [inputType, setInputType] = useState(type);

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input
          id={name}
          type={inputType}
          placeholder={placeholder}
          required={required}
          className="h-12 text-md"
          {...register(name)}
          {...props}
        />

        <div className="flex items-center justify-end gap-2">
          {label?.includes("Password") && value && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Toggle password visibility"
            >
              {inputType === "password" ? (
                <Eye className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
              ) : (
                <EyeOff className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
              )}
            </button>
          )}
          {value && <ClearButton onClick={onClickClear} />}
        </div>
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
