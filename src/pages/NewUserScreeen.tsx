import { ErrorMessage, Field, Formik } from 'formik';
import { Form, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '../components/layout/AuthLayout';
import FormLayout from '../components/layout/FormLayout';
import { httpDelete, httpGet } from '../utils/http-client';
import * as Yup from 'yup';
import Icon from '../components/icon/Icon';
import { TrashIcon } from '@heroicons/react/24/outline';
import Modal from '../components/layout/ModalLayout';


interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
}

/**
 * Komponenta představující stránku vytvoření nového uživatele
 * [pouze přihlášený uživatel]
 */
export default function NewUserScreen() {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User>();
    const [users, setUsers] = useState<Array<User>>([]);
    const [showModal, setShowModal] = useState(false);

    const validationSchema = Yup.object().shape({
        id: Yup.string().required('ID is required'),
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        username: Yup.string().required('username is required'),
        role: Yup.string().required('role is required'),
    });


    const handleSubmit = async (values: User) => {
        console.log('d');
    }

    const deleteUser = async (id: number) => {
        const res = await httpDelete(`users/${id}`);
        if (res.status === 200) {
            setUsers(users.filter((user) => user.id !== id));
        }
    }

    const fetchData = async () => {
        const res = await httpGet(`users/${id}`);
        if (res.status === 200) {
            setUser(res.data.payload);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Layout>
            <div>New user screen</div>
            <div className="min-h-screen bg-gray-100">
                {user ? (
                    <div className="py-12 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Edit User</h2>
                        <div className="max-w-7xl mx-auto ">
                            <div className="bg-white shadow-md rounded-lg overflow-hidden w-full pl-4 pr-4 pb-4 pt-4">
                                <Formik initialValues={{
                                    id: user.id,
                                    username: user.username,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    role: user.role,
                                }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                    {({ isSubmitting, errors, touched }) => (
                                        <Form>
                                            <div className="mb-4" >
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="id">
                                                    ID
                                                </label>
                                                <FormLayout type='text' name='id' placeholder='id' errors={errors} touched={touched} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                                                <ErrorMessage name="id" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
                                                    First Name
                                                </label>
                                                <FormLayout type='text' name='firstName' placeholder='Enter first name' errors={errors} touched={touched} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                                                <ErrorMessage name="firstName" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="lastName">
                                                    Last Name
                                                </label>
                                                <FormLayout type='text' name='lastName' placeholder='Enter last name' errors={errors} touched={touched} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                                                <ErrorMessage name="lastName" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                                                    Username
                                                </label>
                                                <FormLayout type='text' name='username' placeholder='Enter username' errors={errors} touched={touched} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                                                <ErrorMessage name="username" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
                                                    role
                                                </label>
                                                <FormLayout type='text' name='role' placeholder='Enter role' errors={errors} touched={touched} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                                                <ErrorMessage name="role" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <Link to={`/users/edit/${id}`}>Editace uživatele</Link>
                                            <Icon
                                                icon={TrashIcon}
                                                className='h-5 w-5 text-red-500 cursor-pointer'
                                                onClick={() => setShowModal(true)}
                                            />
                                            {showModal && (
                                                // vyvolání modal boxu pro smazani uzivatele
                                                <Modal
                                                    message='Opravdu chcete smazat tohoto uživatele?'
                                                    confirmText='Smazat'
                                                    onConfirm={() => {
                                                        console.log(`deleting user with id: ${id}`);
                                                        setShowModal(false);
                                                        // deleteUser(id);
                                                    }}
                                                    onCancel={() => setShowModal(false)}
                                                />
                                            )}
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </Layout>
    )
}