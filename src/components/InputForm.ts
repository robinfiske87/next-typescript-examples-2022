import React, { FC, useState, ChangeEvent } from 'react';

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: FC<Props> = ({ label, name, value, onChange }) => {
  const [formValue, setFormValue] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValue(event.target.value);
    onChange(event);
  };

  return (
    <label>
      {label}
      <input
        type="text"
        name={name}
        value={formValue}
        onChange={handleChange}
      />
    </label>
  );
};

export default InputForm;
