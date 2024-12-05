// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PageviewIcon from '@mui/icons-material/Pageview';
// project import
import MainCard from 'components/MainCard';
import ServiceChart from '../acorn-pages/dashboard/chart/ServiceChart';
import DashboardNoticeTable from '../acorn-pages/dashboard/DashNoticeTable';
import DashboardProductTable from '../acorn-pages/dashboard/DashProductTable';
import {Link} from 'react-router-dom';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import DashboardReservation from 'pages/acorn-pages/dashboard/DashboardReservation';
// css
import './dashboard.css'
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

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const chartTitle = <Typography variant="h5" align="center">연간 서비스 매출 현황</Typography>;
  
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} >
      {/*********** ROW  1 ************/}
      
      {/* NOTICE */}
      <Grid item xs={4} md={4} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5" display="flex" alignItems="center" gap={1}>중요 공지사항<Link to='/main/notice' ><PageviewIcon/></Link></Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <DashboardNoticeTable />
        </MainCard>
      </Grid>
      {/* SERVICE CHART */}
      <Grid item xs={8} md={8} lg={8}>
        <MainCard 
            border={true}
            content={false} 
            title={chartTitle} 
            children={<ServiceChart />}>
        </MainCard>
      </Grid>


      {/*********** ROW  2 ************/}
      {/* PRODUCT */}
      <Grid item xs={4} md={4} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">상품 목록(재고10개 이하)<Link to='/main/product'><PageviewIcon/></Link></Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <DashboardProductTable></DashboardProductTable>
        </MainCard>
      </Grid>

      {/* CALENDAR */}
      <Grid item xs={8} md={8} lg={8}>
        <MainCard 
            border={true}
            content={false} 
            children={<DashboardReservation />}>
        </MainCard>
      </Grid>

    </Grid>
  );
}
