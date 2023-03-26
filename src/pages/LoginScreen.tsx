import { useState } from 'react';
import { Form, Formik } from 'formik';
import { Navigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { httpPost } from '../utils/http-client';
import { useAuth } from '../context/AuthProvider';
import FormLayout from '../components/layout/FormLayout';
import UnauthLayout from '../components/layout/UnauthLayout';
import { toast, ToastContainer } from 'react-toastify';

interface values {
  username: string;
  password: string;
}

/**
 * Komponenta představující přihlašovací obrazovku
 */
export default function LoginScreen() {
  const { login, isAuthenticated } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');


  // definice validačního schématu pro přihlašovací formulář
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required.'),
    password: Yup.string().required('Password is required.'),
  });

  // funkce pro odeslání přihlašovacích údajů pro přihlášení uživatele v aplikaci
  const handleSubmit = async (values: values) => {

    try {
      const res = await httpPost('auth/signin', values);
      if (res.status === 200) {
        toast.success('Login successful!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000, // milliseconds
        });
        setTimeout(() => {
          login(res.data.payload.accessToken);
        }, 2000);
      }
    } catch (err: any) {
      console.error(err);
      if (err.response.status === 401) {
        setErrorMessage('Invalid username or password.');
        toast.error('Invalid username or password!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000, // milliseconds
        });
      }
    }
  };

  // přesměrování uživatele pokud je přihlášený
  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return (
    <UnauthLayout>
      <ToastContainer />
      <div className='h-screen max-w-full w-screen mx-auto flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-extrabold text-gray-800 mb-8'>Sign in</h1>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className='flex flex-col'>
              <div className='mb-4'>
                <FormLayout type='text' name='username' placeholder='username' errors={errors} touched={touched} className="rounded-full px-4 py-2 bg-gray-100" />
              </div>
              <div className='mb-4'>
                <FormLayout type='password' name='password' placeholder='Password' errors={errors} touched={touched} className="rounded-full px-4 py-2 bg-gray-100" />
              </div>
              <button
                className='w-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full text-white font-semibold px-8 py-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none mx-auto'
                type='submit'
              >
                Submit
              </button>
              <div className='text-sm mt-4 flex justify-center text-gray-600'>
                <span className='mr-2'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 inline-block align-middle' viewBox='0 0 20 20' fill='currentColor'>
                    <path d='M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zm4.25 12.25l-1.5 1.5L10 11.5l-2.75 2.25-1.5-1.5L8.5 10l-2.25-2.75 1.5-1.5L10 8.5l2.75-2.25 1.5 1.5L11.5 10z' />
                  </svg>
                </span>
                <span className='inline-block align-middle'>
                  Don't have account yet? <Link to='/register' className='text-blue-500 hover:underline'>Sign up.</Link>
                </span>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </UnauthLayout>
  );
}
