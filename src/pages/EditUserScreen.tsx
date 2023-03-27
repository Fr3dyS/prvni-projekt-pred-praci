import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Navigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthProvider';
import { httpGet, httpPost, httpPut } from '../utils/http-client';
import Layout from '../components/layout/AuthLayout';
import FormLayout from '../components/layout/FormLayout';
import { toast, ToastContainer } from 'react-toastify';
import { User } from '../types/user.types';


export default function EditUserScreen() {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User>();
    const [userEdit, setUserEdit] = useState(false);

    const validationSchema = Yup.object().shape({
        id: Yup.string().required('ID is required'),
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        username: Yup.string().required('username is required'),
        role: Yup.string().required('role is required'),
    });

    const handleSubmit = async (values: User) => {
        const { firstName, lastName, username, role } = values;

        try {
            const res = await httpPut(`users/${id}`, { firstName, lastName, username, role });
            if (res.status === 200) {
                toast.success('User successfully edited.', { // zobrazení hlášky o úspěšné editu uživatele
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000, // milliseconds
                });
                setTimeout(() => {
                    setUserEdit(true);
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
        console.log(values);
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

    if (userEdit) {
        return <Navigate to={'/users'} />;
    }

    return (
        <Layout>
            <ToastContainer />
            <div className="min-h-screen bg-gray-100">

                {user ? (
                    <div className="py-12 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">User list</h1>
                        <div className="max-w-7xl mx-auto ">
                            <div className="bg-white shadow-md rounded-lg overflow-hidden w-full pl-4 pr-4 pb-4 pt-4">
                                <Formik initialValues={{
                                    username: user.username,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    role: user.role,
                                    id: user.id,
                                }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                    {({ errors, touched }) => (
                                        <Form>
                                            <div className="mb-4" >
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="id">
                                                    ID
                                                </label>
                                                <FormLayout type='number' name='id' placeholder='id' errors={errors} touched={touched} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
                                                    First Name
                                                </label>
                                                <FormLayout type='text' name='firstName' placeholder='Enter first name' errors={errors} touched={touched} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="lastName">
                                                    Last Name
                                                </label>
                                                <FormLayout type='text' name='lastName' placeholder='Enter last name' errors={errors} touched={touched} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                                <ErrorMessage name="lastName" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                                                    Username
                                                </label>
                                                <FormLayout type='text' name='username' placeholder='Enter username' errors={errors} touched={touched} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                                <ErrorMessage name="username" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
                                                    role
                                                </label>
                                                <Field
                                                    as="select"
                                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    name="role"
                                                >
                                                    <option value="Admin">Admin</option>
                                                    <option value="ghost">ghost</option>
                                                    <option value="technician">technician</option>
                                                    <option value="asset">asset</option>
                                                    <option value="manager">manager</option>
                                                </Field>
                                                <ErrorMessage name="role" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <div className="flex justify-between">
                                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 ease-in-out" type="submit">
                                                    Save Changes
                                                </button>
                                                <Link to={'/users/'} className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md text-sm font-medium ml-auto mb-2 transition-colors duration-300 ease-in-out">
                                                    Zpět
                                                </Link>
                                            </div>

                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <h1>Loading....</h1>
                    </div>
                )
                }
            </div>
        </Layout>
    );
}
