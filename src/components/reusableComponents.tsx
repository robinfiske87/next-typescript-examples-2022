import React from 'react';

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ label, name, value, onChange, placeholder }) => {
  return (
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
      <br />
      <input
        className="appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-1"
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

const Select: React.FC<SelectProps> = ({ label, name, options, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
    <select
      className="block appearance-none w-5/6 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline m-1"
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

const Radio: React.FC<RadioProps> = ({ label, name, options, value, onChange }) => (
  <div className="mb-4">
    <span className="block text-gray-700 text-sm font-bold mb-2 m-1">{label}</span>
    {options.map((option) => (
  <label key={option.value} className="inline-block mr-4">
    <input
      className="leading-tight m-1"
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
  type?: 'default' | 'submit' | 'navigate' | 'action'
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = 
({ children, onClick, type }) => {
  let buttonClasses = `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1 shadow-md`

  if(type === 'submit') {buttonClasses = `bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded m-1 shadow-md`}

  if(type === 'navigate') {buttonClasses = `bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full m-1 shadow-md`}
  
  if(type === 'action') {buttonClasses = `bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded m-1 shadow-md`}

  return (
    <button
      className={buttonClasses}
      onClick={onClick}>
      {children}
    </button>
  );
};

interface SecondaryButtonProps {
  type?: 'default' | 'alarm' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = 
  ({ children, onClick, type }) => {
  let buttonClasses = `bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded m-1 shadow-md`

  if(type === 'alarm') {buttonClasses = `bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-1 shadow-md`}

  if(type === 'reset') {buttonClasses = `bg-orange-500 hover:bg-orange-600 text-gray-800 font-bold py-2 px-4 rounded m-1 shadow-md`}

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
};


export { Input, Select, Radio, PrimaryButton, SecondaryButton };
