import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Main from 'layout/Dashboard';
import { element } from 'prop-types';
import Login from 'pages/authentication/login';
import MainCard from 'components/MainCard';
// 마이페이지
import MypageView from '../pages/acorn-pages/mypage/MypageView';
import MypageUpdate from '../pages/acorn-pages/mypage/MypageUpdate';

// =====


// 테스트용 
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const DashboardReservation = Loadable(lazy(() => import('pages/acorn-pages/dashboard/DashboardReservation')));

const Customer = Loadable(lazy(() => import('pages/acorn-pages/customer/Customer')));
const Member = Loadable(lazy(() => import('pages/acorn-pages/member/Member')));
const Service = Loadable(lazy(() => import('pages/acorn-pages/service/Service')));
const Reservation = Loadable(lazy(() => import('pages/acorn-pages/reservation/Reservation')));
const ProductB = Loadable(lazy(() => import('pages/acorn-pages/product/PRODUCT_B')));
const ProductS = Loadable(lazy(() => import('pages/acorn-pages/product/PRODUCT_S')));
const Notice = Loadable(lazy(() => import('pages/acorn-pages/notice/Notice')));
// ====================


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  children: [
    {
      path: "",
      element: <Login />,
    },
    {
      path: "/main/*",
      element: <Main />,
      children: [
        {
          path: "",
          element: <DashboardDefault />
        },
        {
          path: "dashboard",
          element: <DashboardDefault />
        },
        {
          path: 'customer/*',
          element: <Customer />
        },
        {
          path: 'member',
          element: <Member />
        },
        {
          path: 'service',
          element: <Service />
        },
        {
          children: [
            {
              path: "reservation",
              element: <Reservation/>
            },
            {
              path: "reservation/reservation",
              element: <Reservation/>
            },
          ]
        },
        {
          children: [
            {
              path: "productB",
              element: <ProductB/>
            },
            {
              path: "productS",
              element: <ProductS/>
            },
          ]
        },
        {
          path: 'notice/*',
          element: <Notice />
        },
        {
          path: 'manager/mypage/view',
          element: <MypageView />
        },
        {
          path: 'manager/mypage/update',
          element: <MypageUpdate />
        },
      ]
    }
  ]
};

export default MainRoutes;
