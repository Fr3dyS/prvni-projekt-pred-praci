import { useEffect, useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { Navigate, Route, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { httpPost } from '../utils/http-client';
import { useAuth } from '../context/AuthProvider';
import RegisterScreen from './RegisterScreen';

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
    <div className='h-screen w-screen mx-auto flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold mb-5'>Sign in</h1>
      {/*
        TODO: vzhledem k refactoru formulářových prvků/fieldů níž je vhodné se zamyslet 
          jestli by bylo možné vytvořit z "Formiku/Formu" vytvořit nějakou obecnou komponentu pro formuláře
          - např. by se jí mohly předávat: počáteční hodnoty, validační schéma, onSubmit funkce, možná i jednotlivé fieldy formuláře?
          - takový form by bylo pak možné využít kdekoliv u různých typů zadávání dat + pokud by se jako initialValues předaly už naplněné
              jednalo by se v podstatě už o editační formulář (tzn. create + edit by mohl být jeden formulář)
      */}
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
            {/* 
              TODO: tyto jednotlivé části kódu se vcelku opakují a pro spoustu formulářů budou podobné,
                zamyslete se nad atributy a vytvořte z komponentu + využijte vytvořené komponenty pro ostatní formulářové prvky (nejen tady, ale i u dalších formulářů)
            */}
            {/* začátek komponenty k zamyšlení */}
            <div className='mb-4'>
              <Field
                className='rounded-full px-4 py-2 bg-gray-100'
                type='text'
                name='username'
                placeholder='Username'
              />
              {errors.username && touched.username ? (
                <div className='text-red-500 text-xs ml-4 mt-2'>{errors.username}</div>
              ) : null}
            </div>
            {/* konec komponenty k zamyšlení  */}
            <div className='mb-4'>
              <Field
                className='rounded-full px-4 py-2 bg-gray-100'
                type='password'
                name='password'
                placeholder='Password'
              />
              {errors.password && touched.password ? (
                <div className='text-red-500 text-xs ml-4 mt-2'>{errors.password}</div>
              ) : null}
              {errorMessage && (
                <div className='text-red-500 text-xs ml-4 mt-2'>{errorMessage}</div>
              )}
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
  );
}
