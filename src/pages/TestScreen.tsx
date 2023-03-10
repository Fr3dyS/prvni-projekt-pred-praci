import { HomeIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Icon from '../components/icon/Icon';
import DataTable from '../components/table/DataTable';
import { useAuth } from '../context/AuthProvider';
import { httpGet } from '../utils/http-client';
/**
 * Komponenta představující stránku info hodnotami o uživatelích
 * [pouze přihlášený uživatel]
 */
export default function OverviewScreen() {
  const [users, setUsers] = useState<Array<any>>([]);

  const { logout } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const res = await httpGet('users');
      if (res.status === 200) {
        setUsers(res.data.payload);
      }
      console.log({ res });
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-col container mx-auto'>
      <h1>Overview</h1>
      <div className='flex flex-col'>
        <div className='flex flex-row'>
          Příklad použití ikony:{' '}
          <Icon
            className='h-6 w-6 text-blue-500 hover:text-red-500 duration-200 cursor-pointer'
            icon={HomeIcon}
          />
        </div>
        <a
          className='text-blue-500 underline cursor-pointer'
          href='https://heroicons.com/'
          rel='noreferrer'
          target='_blank'
        >
          @heroicons - seznam ikon
        </a>
        <a
          className='text-blue-500 underline cursor-pointer'
          href='https://github.com/tailwindlabs/heroicons#react'
          rel='noreferrer'
          target='_blank'
        >
          @heroicons - dokumentace
        </a>
      </div>
      <button
        className='rounded text-red-500 border-2 w-min px-4 border-red-500 bg-transparent hover:bg-red-500 hover:text-white'
        type='button'
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
