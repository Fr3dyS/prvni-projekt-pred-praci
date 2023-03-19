import { useState } from 'react';
import { Form, Formik } from 'formik';
import { Navigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { httpPost } from '../utils/http-client';
import { useAuth } from '../context/AuthProvider';
import FormLayout from '../components/layout/FormLayout';
import UnauthLayout from '../components/layout/UnauthLayout';

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
        login(res.data.payload.accessToken);
      }
    } catch (err: any) {
      console.error(err);
      if (err.response.status === 400) {
        console.log('ajaja');
        setErrorMessage('Invalid username or password.');
      }
    }
  };

  // přesměrování uživatele pokud je přihlášený
  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return (
    <UnauthLayout>
      <div className='h-screen max-w-full w-screen mx-auto flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold mb-5'>Sign in</h1>
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
              <div className='text-xs mt-4 flex justify-center'>Don't have account yet? <Link to='/register'>Sign up.</Link></div>
            </Form>
          )}
        </Formik>
      </div>
    </UnauthLayout>
  );
}
