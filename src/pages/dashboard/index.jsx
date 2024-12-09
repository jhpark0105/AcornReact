import {Link} from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PageviewIcon from '@mui/icons-material/Pageview';
// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

import CardItem from "../../acorn-components/components/dashboard/CardItem";
import DashboardNoticeTable from '../acorn-pages/dashboard/DashNoticeTable';
import DashboardProductTable from '../acorn-pages/dashboard/DashProductTable';
import ServiceChart from '../acorn-pages/dashboard/chart/ServiceChart';
import DashboardReservation from 'pages/acorn-pages/dashboard/DashboardReservation';


// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} >
      {/*********** ROW  1 ************/}
      {/* NOTICE */}
      <CardItem
		  grid={4}
		  title={<>중요 공지사항<Link to='/main/notice' ><PageviewIcon/></Link></>}
		  content={<DashboardNoticeTable/>}/>
      {/* SERVICE CHART */}
	  <CardItem
			grid={8}
			content={<ServiceChart />}
			title={"연간 서비스 매출 현황"}/>


      {/*********** ROW  2 ************/}
      {/* PRODUCT */}
      <CardItem
			grid={4}
			title={<>상품 목록(재고10개 이하)<Link to='/main/productS'><PageviewIcon/></Link></>}
			content={<DashboardProductTable />}/>
      {/* CALENDAR */}
	  <CardItem
			grid={8}
			title={"월별 예약 현황"}
			content={<DashboardReservation />}/>
    </Grid>
  );
}
