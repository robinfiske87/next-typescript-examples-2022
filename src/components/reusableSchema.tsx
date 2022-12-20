import React, { FC, ChangeEvent } from 'react';

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: FC<InputProps> = ({ label, name, value, onChange, placeholder }) => {
  return (
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
      <input
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-1"
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
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ label, name, options, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
    <select
      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline m-1"
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
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Radio: React.FC<RadioProps> = ({ label, name, options, value, onChange }) => (
  <div className="mb-4">
    <span className="block text-gray-700 text-sm font-bold mb-2 m-1">{label}</span>
    {options.map((option) => (
  <label key={option.value} className="inline-block mr-4">
    <input
      className="leading-tight"
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

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1 shadow-md`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const SecondaryButton: React.FC<ButtonProps> = ({ children, onClick, }) => {
  return (
    <button
      className={`bg-orange-300 hover:bg-orange-400 text-gray-800 font-bold py-2 px-4 rounded m-1 shadow-md`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Input, Select, Radio, PrimaryButton, SecondaryButton };
