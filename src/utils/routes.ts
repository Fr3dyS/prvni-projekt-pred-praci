import { HomeIcon } from '@heroicons/react/24/outline';
import DetailUserScreen from '../pages/DetailUserScreen';
import EditUserScreen from '../pages/EditUserScreen';
import LoginScreen from '../pages/LoginScreen';
import NewUserScreen from '../pages/NewUserScreeen';
import OverviewScreen from '../pages/OverviewScreen';
import RegisterScreen from '../pages/RegisterScreen';
import UserListScreen from '../pages/UserListScreen';
import { NavRoute } from '../types/route.types';

export const routes: Array<NavRoute> = [
  {
    path: '/login',
    component: LoginScreen,
  },
  {
    icon: HomeIcon,
    path: '/',
    component: OverviewScreen,
    restricted: true,
  },
  {
    path: '/register',
    component: RegisterScreen,
  },
  {
    path: '/users',
    restricted: true,
    component: UserListScreen,
  },
  {
    path: '/users/:id',
    restricted: true,
    component: DetailUserScreen,
  },
  {
    path: '/users/new',
    restricted: true,
    component: NewUserScreen,
  },
  {
    path: '/users/edit/:id',
    restricted: true,
    component: EditUserScreen,
  }
  /*
    TODO: HOTOVO

    TODO: přidat následující obrazovky a routy
    * unrestricted *
    - registrace uživatele 
      -> cesta: /register
      -> unrestricted
  

    * restricted *
    - seznam uživatelů 
      -> cesta: /users
    - detail uživatele (podle "id")
      -> cesta: /users/:id
    - vytvoření nového uživatele
      -> cesta: /users/new
    - editace stávajícího uživatele (podle "id")
      - jsou zde dvě možnosti jak toto vyřešit:
        - vytvořit novou obrazovku pro editaci - pak bude cesta: /users/edit/:id
      nebo
      - upravit vytvářecí obrazovku a přidat do ní :id a využít tím už existující komponenty a formulář
        -> upravená cesta vytvářecí obrazovky pak bude vypadat: /users/new/:id
      - oba způsoby jsou ok
  */
];
