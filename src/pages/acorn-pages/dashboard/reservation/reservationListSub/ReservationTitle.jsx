import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const ReservationTitle = ({ align = "center" }) => {
  return (
    <TableRow>
      <TableCell align={align}>예약 시간</TableCell>
      <TableCell align={align}>서비스명</TableCell>
      <TableCell align={align}>고객명</TableCell>
      <TableCell align={align}>직원명</TableCell>
    </TableRow>
  );
};

export default ReservationTitle;
