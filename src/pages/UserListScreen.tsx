import { HomeIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Icon from '../components/icon/Icon';
import DataTable from '../components/table/DataTable';
import { useAuth } from '../context/AuthProvider';
import { httpGet } from '../utils/http-client';
/**
 * Komponenta představující stránku se seznamem uživatelů
 * [pouze přihlášený uživatel]
 */
export default function   UserListScreen() {
  const [users, setUsers] = useState<Array<any>>([]);

  const fetchData = async () => {
    const res = await httpGet('users');
    if (res.status === 200) {
      setUsers(res.data.payload);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // TODO: přidat sloupce pro jméno, příjmení a roli v systému
  /* 
    TODO: role v systému bude mít vlastní render -> zobrazí vlastní komponentu "RoleTag"
      - inspirace (viz ty barevné): https://www.syncfusion.com/products/react-js2/control/images/chips/overview.png
      - každá role bude mít vlastní barvu (definujte si libovolně)
      - na serveru existují role: "ghost", "asset", "technician", "manager", "admin"
  */
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
      Header: 'Actions',
      accessor: 'buttons',
      // vlastní render
      Cell: ({ cell }: any) => (
        <div className='flex flex-row justify-center'>
          <Icon
            icon={TrashIcon}
            className='h-5 w-5 text-red-500 cursor-pointer'
            // TODO: vyvolání modalového okna pro smazání uživatele (dvojí potvrzení - "Smazat" -> "Opravdu ho chceš smazat?")
            // cell.row.values.id -> přístup ke konkrétní proměnné (tady ID uživatele)
            onClick={() => console.log(`deleting user with id: ${cell.row.values.id}`)}
          />
          {/* 
            TODO: přidat editační tlačítko s akcí pro editaci (přesměrování na editaci uživatele)
            - přesměrování na obrazovku s editací uživatele
          */}
        </div>
      ),
    },
  ];

  return (
    <div className='flex flex-col container mx-auto'>
      <h1>User list</h1>
      <DataTable data={users} columns={columns} />
    </div>
  );
}
