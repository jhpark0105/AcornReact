import Calendar from './reservation/Calendar';
import ReservationTable from './reservation/ReservationTable';

/**
 * 예약현황을 위한 캘린더와 예약현황 목록 컴포넌트를 구성. 
 * 
 * 필요 시 Calendar와 ReservationTable 두 컴포넌트를 따로 분리하여 사용해도 됨. 
 * 
 * 단, 이 둘은 Redux를 이용하여 공동의 자원을 공유하고 있음. 
 * /redux 폴더의 selectedDate 라는 상태임. 
 * 
 * @returns 
 */
const DashboardReservation = () => {

    return (
        <div style= {{
            display: 'flex',
            justifyContent: 'space-around'
        }}>
            <Calendar />
            <ReservationTable />
        </div>
    );
};

export default DashboardReservation;