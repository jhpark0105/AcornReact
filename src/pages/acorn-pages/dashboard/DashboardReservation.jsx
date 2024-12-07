import Calendar from './reservation/Calendar';
import ReservationTable from './reservation/ReservationTable';

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