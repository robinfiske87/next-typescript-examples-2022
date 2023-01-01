import React from "react";

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <label className="mb-2 block text-sm font-bold text-gray-700 m-1">
      {label}
      <br />
      <input
        className="focus:shadow-outline m-1 w-5/6 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
};

interface SelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  value,
  onChange,
}) => (
  <div className="mb-4">
    <label
      className="mb-2 block text-sm font-bold text-gray-700 m-1"
      htmlFor={name}
    >
      {label}
    </label>
    <select
      className="focus:shadow-outline m-1 block w-5/6 appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
      name={name}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

interface RadioProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio: React.FC<RadioProps> = ({
  label,
  name,
  options,
  value,
  onChange,
}) => (
  <div className="mb-4">
    <span className="m-1 mb-2 block text-sm font-bold text-gray-700">
      {label}
    </span>
    {options.map((option) => (
      <label key={option.value} className="mr-4 inline-block">
        <input
          className="m-1 leading-tight"
          type="radio"
          name={name}
          value={option.value}
          checked={option.value === value}
          onChange={onChange}
        />
        <span className="ml-2">{option.label}</span>
      </label>
    ))}
  </div>
);

interface PrimaryButtonProps {
  type?: "default" | "button" | "submit" | "navigate" | "action";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  type,
}) => {
  let buttonClasses;
  
  switch (type) {
    case "button":
      buttonClasses = `bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded m-1 shadow-md`;
      break;
    case "submit":
      buttonClasses = `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1 shadow-md`;
      break;
    case "navigate":
      buttonClasses = `bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full m-1 shadow-md`;
      break;
    case "action":
      buttonClasses = `bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded m-1 shadow-md`;
      break;
    default:
      buttonClasses = `bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded m-1 shadow-md`;
  }

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

interface SecondaryButtonProps {
  type?: "default" | "button" | "alarm" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  onClick,
  type,
}) => {
  let buttonClasses;

  switch (type) {
    case "button":
      buttonClasses = `bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded m-1 shadow-md`;
      break;
    case "alarm":
      buttonClasses = `bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-1 shadow-md`;
      break;
    case "reset":
      buttonClasses = `bg-orange-400 hover:bg-orange-500 text-gray-800 font-bold py-2 px-4 rounded m-1 shadow-md`;
      break;
    default:
      buttonClasses = `bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded m-1 shadow-md`;
  }

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export { Input, Select, Radio, PrimaryButton, SecondaryButton };
