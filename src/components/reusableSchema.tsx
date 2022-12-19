import React, { FC, ChangeEvent } from 'react';

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  placeholder: string;
}

const Input: FC<InputProps> = ({ label, name, value, onChange }) => {
  return (
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
      <input
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name={name}
        value={value}
        onChange={onChange}
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
      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
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
    <span className="block text-gray-700 text-sm font-bold mb-2">{label}</span>
    {options.map((option) => (
      <div key={option.value} className="inline-block mr-4">
        <input
          className="leading-tight"
          type="radio"
          name={name}
          value={option.value}
          checked={option.value === value}
          onChange={onChange}
        />
        <label className="ml-2">{option.label}</label>
      </div>
    ))}
  </div>
);

interface ButtonProps {
  children: React.ReactNode;
  type: string;
  className: string;
  onClick?: () => void;
  disabled?: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const SecondaryButton: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Input, Select, Radio, PrimaryButton, SecondaryButton };
