import PropTypes from 'prop-types';
// material-ui
import { Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import Dot from 'components/@extended/Dot';

// ==============================|| GENERIC TABLE COMPONENT ||============================== //


export default function TableComponent({ columns, rows, onRowClick }) {
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
        <Table>
          {/* 테이블 헤더 */}
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align || 'left'}
                sx={{ width: column.width }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* 테이블 데이터 */}
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                hover
                key={rowIndex}
                onClick={() => onRowClick && onRowClick(row)} // 클릭 시 동작 전달
                sx={{ cursor: onRowClick ? 'pointer' : 'default', '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align || 'left'}>
                    {column.format ? column.format(row[column.id]) : row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

TableComponent.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.string,
      format: PropTypes.func // 데이터 형식 처리 함수
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowClick: PropTypes.func // 클릭 이벤트 핸들러
};