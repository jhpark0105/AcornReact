// rsuite ui library import
import { FlexboxGrid, CustomProvider } from "rsuite";

// 달력 내용이 한국어로 나오도록. 
// 이를 위해선 CustomeProvider와 같이 사용해야 함.
import koKR from "rsuite/locales/ko_KR";

// custom components import
import CalendarBySuite from "./CalendarBySuite";
import ReservationListBySuite from "./ReservationListBySuite";

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
