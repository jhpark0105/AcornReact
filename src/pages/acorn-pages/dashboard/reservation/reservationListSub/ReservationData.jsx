import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { isEmptyObject } from '../../../../../libs/jsonTools';
import DisplayNoData from "./DisplayNoData";

const ReservationData = ({jsonData, align = 'center'}) => {

    if (isEmptyObject(jsonData) || jsonData.data.pages.content.length === 0) {
        return <DisplayNoData />
    }
    
    return jsonData.data.pages.content.map(d => (
            <TableRow key={d.reservationNo}>
              <TableCell align={align}>{d.reservationTime}</TableCell>
              <TableCell align={align}>{d.serviceName}</TableCell>
              <TableCell align={align}>{d.customerName}</TableCell>
              <TableCell align={align}>{d.memberName}</TableCell>
            </TableRow>
        ));
};

export default ReservationData;