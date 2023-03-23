import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { httpPost } from '../utils/http-client';
import UnauthLayout from '../components/layout/UnauthLayout';
import FormLayout from '../components/layout/FormLayout';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from '../components/layout/AuthLayout';

interface FormValues {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required.'),
    lastName: Yup.string().required('Last name is required.'),
    username: Yup.string().required('Username is required.'),
    password: Yup.string().required('Password is required.'),
});

export default function NewUserScreen() {
    const handleSubmit = async (values: FormValues) => {
        try {
            const res = await httpPost('auth/signup', values);
            if (res.status === 200) {
                alert('Successfully registered!');
            } else {
                alert('Registration failed!');
            }
        } catch (err) {
            alert('Registration failed!');
            console.log(err);
        }
    };

    return (
        <Layout>
            <div className="h-screen max-w-full max-h-400 w-screen mx-auto flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-5">Register</h1>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        username: '',
                        password: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <form>
                            <div className="mb-4">
                                <FormLayout
                                    type="text"
                                    name="firstName"
                                    placeholder="first name"
                                    errors={errors}
                                    touched={touched}
                                    className="rounded-full px-4 py-2 bg-gray-100"
                                />
                            </div>
                            <div className="mb-4">
                                <FormLayout
                                    type="text"
                                    name="lastName"
                                    placeholder="last name"
                                    errors={errors}
                                    touched={touched}
                                    className="rounded-full px-4 py-2 bg-gray-100"
                                />
                            </div>
                            <div className="mb-4">
                                <FormLayout
                                    type="text"
                                    name="username"
                                    placeholder="username"
                                    errors={errors}
                                    touched={touched}
                                    className="rounded-full px-4 py-2 bg-gray-100"
                                />
                            </div>
                            <div className="mb-4">
                                <FormLayout
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    errors={errors}
                                    touched={touched}
                                    className="rounded-full px-4 py-2 bg-gray-100"
                                />
                            </div>
                            <button
                                className="rounded-full bg-sky-400 border-2 border-sky-400 text-white font-semibold hover:text-sky-400 hover:bg-transparent duration-100 py-2"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Register
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </Layout>
    );
}
