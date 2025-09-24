import * as React from 'react';
import Input from './Input';

interface Field {
    id: string;
    name: string;
    label?: string;
    type?: string;
    placeholder?: string;
}

interface Props {
    field: Field;
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}


const FormField: React.FC<Props> = ({field, value, error, onChange}) => {
    if(field.id === "body") {
        return (
            <div className="form-group">
                <label htmlFor={field.label}>{field.label}</label>

                <textarea
                    id={field.id}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={value}
                    onChange={onChange}
                    className={`comments__textarea ${error ? 'error__input' : ''}`}
                />

                {error && <div className="error-text">{error}</div>}
            </div>
        )
    }
    return (
        <div className="form-group">
            <label htmlFor={field.label}>{field.label}</label>

            <Input
                id={field.id}
                name={field.name}
                placeholder={field.placeholder}
                value={value}
                type={field.type || 'text'}
                onChange={onChange}
                className={`comments__input ${error ? 'error__input' : ''}`}
            />

            {error && <div className="error-text">{error}</div>}
        </div>
    );
};

export default FormField;