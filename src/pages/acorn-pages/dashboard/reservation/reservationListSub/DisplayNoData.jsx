import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const DisplayNoData = ({ align = "center" }) => {

  return (
    <TableRow>
      <TableCell colSpan={4} align={align}>조회된 데이터가 없습니다.</TableCell>
    </TableRow>
  );
};

export default DisplayNoData;
