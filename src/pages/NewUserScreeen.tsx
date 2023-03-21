import { ErrorMessage, Field, Formik } from 'formik';
import { Form, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '../components/layout/AuthLayout';
import FormLayout from '../components/layout/FormLayout';
import { httpDelete, httpGet, httpPost } from '../utils/http-client';
import * as Yup from 'yup';
import Icon from '../components/icon/Icon';
import { TrashIcon } from '@heroicons/react/24/outline';
import Modal from '../components/layout/ModalLayout';
import { useAuth } from '../context/AuthProvider';


interface values {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

/**
 * Komponenta představující stránku vytvoření nového uživatele
 * [pouze přihlášený uživatel]
 */
export default function NewUserScreen() {

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
            alert('ajaj');
        }
        if (res.status === 401) {
            alert('ajaj');
        }
    };
    return (
        <Layout>
            <div>New user screen</div>
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
                            <div>d</div>
                        </Form>
                    )}
                </Formik>
            </div>

        </Layout>
    )
}