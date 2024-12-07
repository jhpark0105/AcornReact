import { useState, useEffect } from 'react';
// material-ui
import {Link} from 'react-router-dom';
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
          overflowX: 'auto',  // 가로 방향 스크롤이 가능하도록 설정
          position: 'relative', // 컨테이너의 디스플레이를 block으로 설정
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },// 모든 td와 th 요소에 대해 줄 바꿈 방지
        }}
      >
        <Table aria-labelledby="tableTitle">
          <NoticeTableHead />
          <TableBody>
            {list.length> 0 ?
              (list.map((notice, index) => (
                <TableRow
                  hover
                  role="checkbox"// ARIA 속성을 위한 역할을 checkbox로 설정
                  tabIndex={-1}// 키보드 탐색을 위한 tabindex를 -1로 설정
                  key={index}// 각 행의 고유 키로 index를 사용
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}// 마지막 행의 td와 th의 테두리를 제거
                >
                  <TableCell component="th" scope="row" title={notice.noticeTitle}
                    sx={{maxWidth: '150px', // 최대 너비를 설정하여 텍스트가 넘어가는 시점을 조정
                      whiteSpace: 'nowrap', // 텍스트를 한 줄로 유지
                      overflow: 'hidden',   // 넘치는 텍스트를 숨김 처리
                      textOverflow: 'ellipsis', // 넘친 부분에 ... 표시
                    }}>
                    <Link color="secondary" to={`/main/notice/${notice.noticeNo}`}>{notice.noticeTitle}</Link>
                  </TableCell>
                  <TableCell align="right">{notice.noticeReg}</TableCell>
                </TableRow>
              )))
              :
              (<TableRow>
                <TableCell colSpan={2} align='center'>중요 공지사항이 없습니다.</TableCell>
              </TableRow>)
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

NoticeTableHead.propTypes = {};
