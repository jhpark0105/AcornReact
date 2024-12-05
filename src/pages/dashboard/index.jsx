// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import ServiceChart from '../acorn-pages/dashboard/chart/ServiceChart';
import DashboardNoticeTable from '../acorn-pages/dashboard/DashNoticeTable';
import DashboardProductTable from '../acorn-pages/dashboard/DashProductTable';

import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import DashboardReservation from 'pages/acorn-pages/dashboard/DashboardReservation';

// assets

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
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/*********** ROW  1 ************/}
      
      {/* NOTICE */}
      <Grid item xs={4} md={4} lg={4}>
        <MainCard sx={{ mt: 2 }} title={"중요 공지사항"} content={false}>
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
        <MainCard sx={{ mt: 2 }} title={"상품 목록(재고10개 이하)"} content={false}>
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
