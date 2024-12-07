import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Admin from 'layout/AdminLayout';

// =====
const Dashboard = Loadable(lazy(() => import('pages/admin/dashboard')));
const Orders = Loadable(lazy(() => import('pages/admin/orders')));
const Financial = Loadable(lazy(() => import('pages/admin/financial')));
const Notice = Loadable(lazy(() => import('pages/admin/notice')));
const MypageView = Loadable(lazy(() => import('pages/admin/mypage/MypageView')));
const MypageUpdate = Loadable(lazy(() => import('pages/admin/mypage/MypageUpdate')));

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
      path: 'orders/*',
      element: <Orders />
    },
    {
      path: 'financial',
      element: <Financial />
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
          element: <MypageView />
        },
        {
          path: 'update',
          element: <MypageUpdate />
        }
      ]
    }
  ]
};

export default AdminRoutes;
