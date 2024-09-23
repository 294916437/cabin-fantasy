import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  id: string;
  label: string;
  type?: string;
  value?: string;
  min?: number;
  disabled?: boolean;
  required?: boolean;
  register?: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  prependIcon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
};

function Input({
  id,
  label,
  type = "text",
  value,
  min,
  disabled,
  register,
  required,
  errors,
  prependIcon,
  onChange,
  readonly,
}: Props) {
  return (
    <div className='w-full relative'>
      {prependIcon &&
        React.cloneElement(prependIcon as React.ReactElement, {
          className: `
          absolute
          top-1/2
          transform -translate-y-1/2
          left-3
        `,
        })}
      <input
        id={id}
        disabled={disabled}
        {...(register ? register(id, { required }) : {})}
        placeholder=' '
        type={type}
        min={min}
        value={value}
        onChange={onChange}
        readOnly={readonly}
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
          prependIcon ? "pl-12" : "pl-4"
        } ${errors[id] ? "border-rose-500" : "border-neutral-300"} ${
          errors[id] ? "focus:border-rose-500" : "focus:border-black"
        }`}
      />
      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
          prependIcon ? "left-12" : "left-4"
        } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          errors[id] ? "text-rose-500" : "text-zinc-400"
        }`}>
        {label}
      </label>
    </div>
  );
}

export default Input;
