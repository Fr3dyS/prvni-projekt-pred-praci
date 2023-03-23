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

/**

Rozhraní reprezentující uživatele se základními údaji
*/
interface Users {
  id: number; // ID uživatele
  firstName: string; // Křestní jméno uživatele
  lastName: string; // Příjmení uživatele
  username: string; // Uživatelské jméno
  password: string; // Heslo uživatele
  role: string; // Role uživatele
}
/**
 
Props pro zobrazení RoleTagu
*/
interface RoleTagProps {
  color: string; // Barva pozadí RoleTagu
  text: string; // Text RoleTagu
}
/**
 
Komponenta RoleTag reprezentuje zobrazení role uživatele v seznamu uživatelů
*/
function RoleTag({ color, text }: RoleTagProps) {
  return (
    <span className={`px-2 py-1 text-white rounded-md ${color}`}>
      {text}
    </span >
  );
}
/**
 
Komponenta UserListScreen představuje stránku se seznamem uživatelů
[pouze přihlášený uživatel]
*/
export default function UserListScreen() {
  const [users, setUsers] = useState<Array<Users>>([]); // State pro uchování seznamu uživatelů
  const [showModal, setShowModal] = useState(false); // State pro zobrazení modálního okna pro smazání uživatele
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null); // State pro uchování ID uživatele, který bude smazán
  // Funkce pro získání dat ze serveru
  const fetchData = async () => {
    const res = await httpGet('users?limit=1000');
    if (res.status === 200) {
      setUsers(res.data.payload);
    }
  };

  // Funkce pro smazání uživatele
  const deleteUser = async (id: number) => {
    const res = await httpDelete(`users/${id}`);
    if (res.status === 200) {
      setUsers(users.filter((user) => user.id !== id));
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Pole s definicemi sloupců pro zobrazení v DataTable
  const columns = [
    {
      Header: '#', // Hlavička sloupce s pořadovým číslem
      accessor: 'id', // Přístup k ID uživatele
      // Vlastní render pro zobrazení pořadového čísla
      Cell: ({ cell }: CellProps<Users>) => (
        <span>{cell.row.index + 1}</span>
      ),
    },
    {
      Header: 'Username', // Hlavička sloupce s uživatelským jménem
      accessor: 'username', // Přístup k uživatelskému jménu
    },
    {
      Header: 'First name', // Hlavička sloupce s křestním jménem
      accessor: 'firstName', // Přístup ke křestnímu jménu
    }, {
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
            onClick={() => {
              setDeleteUserId(cell.row.values.id); // Set the user ID to be deleted
              setShowModal(true);
            }}
          />
          {showModal && deleteUserId === cell.row.values.id && ( // Only show the modal for the current user ID
            <Modal
              message='Opravdu chcete smazat tohoto uživatele?'
              confirmText='Smazat'
              onConfirm={() => {
                deleteUser(cell.row.values.id); // Call the deleteUser function with the user ID
                setShowModal(false);
              }}
              onCancel={() => {
                setDeleteUserId(null); // Reset the deleteUserId state variable
                setShowModal(false);
              }}
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
      {columns ? (
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
      ) : (
        <div>Loading....</div>
      )}
    </Layout>
  );
}
