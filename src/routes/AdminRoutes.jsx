import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Admin from 'layout/AdminLayout';


// =====
const Dashboard = Loadable(lazy(() => import('pages/admin/dashboard')));
const Order = Loadable(lazy(() => import('pages/admin/order')));
const Finance = Loadable(lazy(() => import('pages/admin/finance')));
const Notice = Loadable(lazy(() => import('pages/admin/notice')));
const AdminMypageView = Loadable(lazy(() => import('pages/admin/mypage/AdminMypageView')));
const AdminMypageUpdate = Loadable(lazy(() => import('pages/admin/mypage/AdminMypageUpdate')));
const AdminMypageInsert = Loadable(lazy(() => import('pages/admin/mypage/AdminMypageInsert')));

const AdminRoutes = {
  path: '/admin/*',
  element: <Admin />,
  children: [
    {
      path: '',
      element: <Dashboard />
    },
    {
      path: 'dashboard',
      element: <Dashboard />
    },
    {
      path: 'order',
      element: <Order />
    },
    {
      path: 'finance/*',
      element: <Finance />
    },
    {
      path: 'notice/*',
      element: <Notice />
    },
    {
      path: 'mypage',
      children: [
        {
          path: 'view',
          element: <AdminMypageView />
        },
        {
          path: 'update',
          element: <AdminMypageUpdate />
        },
        {
          path: 'insert',
          element: <AdminMypageInsert />
        }
      ]
    }
  ]
};

export default AdminRoutes;
