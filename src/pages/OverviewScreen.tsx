import { useEffect, useState } from 'react';
import Layout from '../components/layout/AuthLayout';
import { httpGet } from '../utils/http-client';

interface UsersCount {
  total: number;
}

type UsersRole = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
};

interface RoleColor {
  role: string;
}

function getRoleColor(role: RoleColor | string) {
  if (typeof role === 'string') {
    // Pokud je role typu string, vrátíme defaultní hodnotu.
    switch (role) {
      case 'ghost':
        return 'bg-gray-500';
      case 'asset':
        return 'bg-blue-500';
      case 'technician':
        return 'bg-emerald-500';
      case 'manager':
        return 'bg-lime-500';
      default:
        return 'bg-red-500';
    }
  }

  switch (role.role) {
    case 'ghost':
      return 'bg-gray-500';
    case 'asset':
      return 'bg-blue-500';
    case 'technician':
      return 'bg-emerald-500';
    case 'manager':
      return 'bg-lime-500';
    default:
      return 'bg-red-500';
  }
}


/**
 * Komponenta představující stránku info hodnotami o uživatelích
 * [pouze přihlášený uživatel]
 */
export default function OverviewScreen() {
  const [usersCount, setUsersCount] = useState<{ total: number }>({ total: 0 });
  const [users, setUsers] = useState<UsersRole[]>([]);
  const [roles, setRoles] = useState<{ [key: string]: number }>({});

  const fetchData = async () => {
    const res = await httpGet('users?limit=1000');
    if (res.status === 200) {
      setUsersCount(res.data.meta);
      setUsers(res.data.payload);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const roleCounts: { [key: string]: number } = {};
    users.forEach((user) => {
      if (user.role in roleCounts) {
        roleCounts[user.role]++;
      } else {
        roleCounts[user.role] = 1;
      }
    });
    setRoles(roleCounts);
  }, [users]);

  return (
    <Layout>
      <div className='flex flex-col container mx-auto'>
        <h1 className='text-4xl font-bold mb-4'>Overview</h1>
        <div className='text-lg mb-4'>
          <span className='font-bold'>Number of Users:</span> {usersCount.total}
          <hr className='my-4' />
        </div>

        <h2 className='text-2xl font-bold mb-4'>User Roles:</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {Object.entries(roles).map(([role, count]) => (
            <div key={role} className={`p-4 rounded-md ${getRoleColor(role)}`}>
              <div className='font-bold text-lg'>{role}</div>
              <div className='text-gray-100'>{count} users</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
