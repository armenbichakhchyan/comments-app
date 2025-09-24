import * as React from 'react';
import {useState} from "react";

type Errors<T> = Partial<Record<keyof T, string>>;

interface useFormOptions<T> {
    initialValues: T;
    validate?: (values: T) => Errors<T>;
    onSubmit?: (values: T) => void;
}

export function useForm<T extends Record<string, any>>({
    initialValues,
    validate,
    onSubmit,
}: useFormOptions<T>) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Errors<T>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let validationErrors: Errors<T> = {};

        if (validate) {
            validationErrors = validate(values);
            setErrors(validationErrors);
        }

        if(!Object.keys(validationErrors).length) {
            onSubmit(values);
            setValues(initialValues);
            setErrors({});
        }
    };

    return {
        values,
        errors,
        setValues,
        setErrors,
        handleChange,
        handleSubmit,
    }
}