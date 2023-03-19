import React from 'react';
import { Form, Formik, Field } from 'formik';
import { Navigate, Route, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { httpPost } from '../utils/http-client';
import { useAuth } from '../context/AuthProvider';
import FormLayout from '../components/layout/FormLayout';
import UnauthLayout from '../components/layout/UnauthLayout';

interface values {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

/**
 * Komponenta představující stránku registrace nového uživatele
 * [není povinný být přihlašený uživatel]
 */
export default function RegisterScreen() {
    const { login, isAuthenticated } = useAuth();

    // definice validačního schématu pro přihlašovací formulář
    const LoginSchema = Yup.object().shape({
        firstName: Yup.string().required('first name is required.'),
        lastName: Yup.string().required('last name is required.'),
        username: Yup.string().required('Username is required.'),
        password: Yup.string().required('Password is required.'),
    });

    // funkce pro odeslání přihlašovacích údajů pro přihlášení uživatele v aplikaci
    const handleSubmit = async (values: values) => {
        const res = await httpPost('auth/signup', values);
        if (res.status === 200) {
            login(res.data.payload.accessToken);
        }
        if (res.status === 401) {
            alert('ajaj');
        }
    };

    // přesměrování uživatele pokud je přihlášený
    if (isAuthenticated) {
        return <Navigate to={'/'} />;
    }

    return (
        <UnauthLayout>
            <div className='h-screen max-w-full max-h-400 w-screen mx-auto flex flex-col items-center justify-center'>
                <h1 className='text-2xl font-bold mb-5'>Register</h1>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        username: '',
                        password: '',
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className='flex flex-col'>
                            <div className='mb-4'>
                                <FormLayout type='text' name='firstName' placeholder='first name' errors={errors} touched={touched} />
                            </div>
                            <div className='mb-4'>
                                <FormLayout type='text' name='lastName' placeholder='last name' errors={errors} touched={touched} />
                            </div>
                            <div className='mb-4'>
                                <FormLayout type='text' name='username' placeholder='username' errors={errors} touched={touched} />
                            </div>
                            <div className='mb-4'>
                                <FormLayout type='password' name='password' placeholder='Password' errors={errors} touched={touched} />
                            </div>
                            <button
                                className='rounded-full bg-sky-400 border-2 border-sky-400 text-white font-semibold hover:text-sky-400 hover:bg-transparent duration-100 py-2'
                                type='submit'
                            >
                                Submit
                            </button>
                            <div className='text-xs mt-4 flex justify-center'>Have account? <Link to='/login'>{' '} Login.</Link></div>
                        </Form>
                    )}
                </Formik>
            </div>
        </UnauthLayout>
    );
}
