import { Field } from 'formik';
import React, { ReactElement } from 'react';

interface InputFieldProps {
    type: string;
    name: string;
    placeholder: string;
    errors: any;
    touched: any;
}
export default function FormLayout({ type, name, placeholder, errors, touched }: InputFieldProps): ReactElement {
    return (
        <div className="mb-4">
            <Field
                className="rounded-full px-4 py-2 bg-gray-100"
                type={type}
                name={name}
                placeholder={placeholder}
            />
            {errors[name] && touched[name] ? (
                <div className="text-red-500 text-xs ml-4 mt-2">{errors[name]}</div>
            ) : null}
        </div>
    );
}