import PropTypes from 'prop-types';
// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TBody from '@mui/material/TableBody';
import Td from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Thead from '@mui/material/TableHead';
import Tr from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { NumericFormat } from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

function createData(tracking_no, name, fat, carbs, protein) {
  return { tracking_no, name, fat, carbs, protein };
}

const rows = [
  createData(84564564, 'Camera Lens', 40, 2, 40570),
  createData(98764564, 'Laptop', 300, 0, 180139),
  createData(98756325, 'Mobile', 355, 1, 90989),
  createData(98652366, 'Handset', 50, 1, 10239),
  createData(13286564, 'Computer Accessories', 100, 1, 83348),
  createData(86739658, 'TV', 99, 0, 410780),
  createData(13256498, 'Keyboard', 125, 2, 70999),
  createData(98753263, 'Mouse', 89, 2, 10570),
  createData(98753275, 'Desktop', 185, 1, 98063),
  createData(98753291, 'Chair', 100, 0, 14001)
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

/* 테이블 헤드 배열 - 상위 컴포넌트에서 전달 */
const headCells = [
  {
    id: 'tracking_no',
    align: 'left',
    label: 'tracking_no'
  },
  {
    id: 'name',
    align: 'left',
    label: 'name'
  },
  {
    id: 'fat',
    align: 'right',
    label: 'Total Order'
  },
  {
    id: 'carbs',
    align: 'left',

    label: 'Status'
  },
  {
    id: 'protein',
    align: 'right',
    label: 'Total Amount'
  }
];

// ==============================|| TestTable ||============================== //

/* 정렬 데이터  */
function TestTableHead({ order, orderBy, cells }) {

  return (
    <Thead>
      <Tr>
        {/* cells props로 테이블 헤드 정보 전달 */}
        {cells? cells : headCells.map((headCell) => (
          <Td
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </Td>
        ))}
      </Tr>
    </Thead>
  );
}

function OrderStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// ==============================|| TABLE COMPONENT ||============================== //

export default function TableComponent() {
  const order = 'asc';
  const orderBy = 'tracking_no';

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          {/* 테이블 타이틀 정렬 조건 필요 시 props 활용*/}
          <TestTableHead order={order} orderBy={orderBy} />

          <TBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <Tr
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.tracking_no}
                >
                  <Td component="th" id={labelId} scope="row">
                    <Link color="secondary"> {row.tracking_no}</Link>
                  </Td>
                  <Td>{row.name}</Td>
                  <Td align="right">{row.fat}</Td>
                  <Td>
                    <OrderStatus status={row.carbs} />
                  </Td>
                  <Td align="right">
                    <NumericFormat value={row.protein} displayType="text" thousandSeparator prefix="$" />
                  </Td>
                </Tr>
              );
            })}
          </TBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

TestTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

TableComponent.propTypes = { status: PropTypes.number };
