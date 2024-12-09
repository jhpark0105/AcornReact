import {Link} from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PageviewIcon from '@mui/icons-material/Pageview';


// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

import ServiceChart from '../../acorn-pages/dashboard/chart/ServiceChart';
import DashboardNoticeTable from '../../acorn-pages/dashboard/DashNoticeTable';
import DashboardProductTable from '../../acorn-pages/dashboard/DashProductTable';

import DashboardReservation from 'pages/acorn-pages/dashboard/DashboardReservation';
import CardItem from "../../../acorn-components/components/dashboard/CardItem";
// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| DASHBOARD - ADMIN ||============================== //

export default function AdminDashboard() {
  const chartTitle = <Typography variant="h4" align="center">지점별 월매출 현황</Typography>;
  
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} >
      {/*********** ROW  1 ************/}
      {/* ORDERS */}
        <CardItem
            grid={4}
            title={<>발주 요청 내역<Link to='/admin/order'><PageviewIcon/></Link></>}
            content={<DashboardNoticeTable/>}/>

      {/* CHART */}
        <CardItem
            grid={8}
            title={"지점별 월 매출 현황"}
            content={<ServiceChart />}/>
    </Grid>
  );
}
