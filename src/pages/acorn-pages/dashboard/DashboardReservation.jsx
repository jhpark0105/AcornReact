// rsuite ui library import
import { FlexboxGrid, CustomProvider } from 'rsuite';

// 달력 내용이 한국어로 나오도록. 
// 이를 위해선 CustomeProvider와 같이 사용해야 함.
import koKR from 'rsuite/locales/ko_KR';

// custom components import
import CalendarBySuite from './reservation/CalendarBySuite'
import ReservationListBySuite from './reservation/ReservationListBySuite';
//import CalendarBySuite from '../../../acorn-components/components/dashboard/reservation/CalendarBySuite';
//import ReservationListBySuite from '';

const DashboardReservation = () => {
  return (
    <CustomProvider locale={koKR}>
      <FlexboxGrid justify="space-between">
        <CalendarBySuite />
        <ReservationListBySuite />
      </FlexboxGrid>
    </CustomProvider>
  );
};

export default DashboardReservation;
