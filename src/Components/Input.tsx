import * as React from 'react';
import { ChangeEvent } from 'react';

interface InputProps {
    name: string;
    value: string | number;
    type: string;
    placeholder: string;
    id?: string | number;
    className?: string;
    required?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ name, value, type, placeholder, id, className, required = false, onChange }) => {
    return (
        <input
            name={name}
            value={value}
            type={type}
            id={id?.toString()}
            onChange={onChange}
            className={className}
            placeholder={placeholder}
            required={required}
        />
    );
};

export default Input;
