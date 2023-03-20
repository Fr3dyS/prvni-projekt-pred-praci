import { HomeIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CellProps } from 'react-table';
import Icon from '../components/icon/Icon';
import Layout from '../components/layout/AuthLayout';
import Modal from '../components/layout/ModalLayout';
import DataTable from '../components/table/DataTable';
import { useAuth } from '../context/AuthProvider';
import { httpDelete, httpGet } from '../utils/http-client';

interface Users {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: string;
}

interface RoleTagProps {
  color: string;
  text: string;
}

function RoleTag({ color, text }: RoleTagProps) {
  return (
    <span className={`px-2 py-1 text-white rounded-md ${color}`}>
      {text}
    </span>
  );
}

/**
 * Komponenta představující stránku se seznamem uživatelů
 * [pouze přihlášený uživatel]
 */
export default function UserListScreen() {
  const [users, setUsers] = useState<Array<Users>>([]);
  const [showModal, setShowModal] = useState(false);
  

  const fetchData = async () => {
    const res = await httpGet('users?limit=1000');
    if (res.status === 200) {
      setUsers(res.data.payload);
    }
  };

  const deleteUser = async (id: number) => {
    // const res = await httpDelete(`users/${id}`);
    console.log(id);
    /* if (res.status === 200) {
      setUsers(users.filter((user) => user.id !== id));
    }*/
  }

  useEffect(() => {
    fetchData();
  }, []);

  /*
    NICE-TO-HAVE: TODO: úprava sloupce '#': aktuálně se zobrazují ID uživatelů -> chceme nahradit pořadovým číslem
    - (bude třeba udělat vlastní render)
  */
  const columns = [
    {
      Header: '#',
      accessor: 'id',
    },
    {
      Header: 'Username',
      accessor: 'username',
    },
    {
      Header: 'First name',
      accessor: 'firstName',
    },
    {
      Header: 'Last name',
      accessor: 'lastName',
    },
    {
      Header: 'Role',
      accessor: 'role',
      Cell: ({ cell }: CellProps<Users>) => (
        <RoleTag
          color={
            cell.value === 'ghost'
              ? 'bg-gray-500'
              : cell.value === 'asset'
                ? 'bg-blue-500'
                : cell.value === 'technician'
                  ? 'bg-emerald-500'
                  : cell.value === 'manager'
                    ? 'bg-lime-500'
                    : 'bg-red-500'
          }
          text={cell.value}
        />
      ),
    },
    {
      Header: 'Actions',
      accessor: 'buttons',
      // vlastní render
      Cell: ({ cell }: CellProps<Users>) => (
        <div className='flex flex-row justify-center'>
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
                console.log(`deleting user with id: ${cell.row.values.id}`);
                setShowModal(false);
                deleteUser(cell.row.values.id);
              }}
              onCancel={() => setShowModal(false)}
            />
          )}
          <Link to={`/users/edit/${cell.row.values.id}`}>
            <Icon
              icon={PencilSquareIcon}
              className='h-5 w-5 text-red-500 cursor-pointer'
            />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="py-12 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">User list</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden w-full">
              <DataTable data={users} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
