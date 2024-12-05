import { useState, useEffect } from 'react';
// material-ui
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import axios from 'axios';

// ==============================|| NOTICE TABLE - HEADER ||============================== //

function NoticeTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">제목</TableCell>
        <TableCell align="center">등록일</TableCell>
      </TableRow>
    </TableHead>
  );
}

// ==============================|| NOTICE TABLE ||============================== //

export default function DashboardNotice() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8080/dashboard/notice')
      .then((res) => {
        setList(res.data);
        setIsLoading(true);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(true);
      });
  }, []);

  if (!isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Failed to load notices: {error.message}</Alert>;
  }

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },
        }}
      >
        <Table aria-labelledby="tableTitle">
          <NoticeTableHead />
          <TableBody>
            {list.map((notice, index) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" title={notice.noticeTitle}>
                  <Link color="secondary">{notice.noticeTitle}</Link>
                </TableCell>
                <TableCell align="right">{notice.noticeReg}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

NoticeTableHead.propTypes = {};
