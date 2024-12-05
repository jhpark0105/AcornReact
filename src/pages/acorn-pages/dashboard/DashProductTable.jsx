import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Pagination, CircularProgress, PaginationItem } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos'; // 오른쪽 화살표 아이콘
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // 왼쪽 화살표 아이콘
import CircleIcon from '@mui/icons-material/FiberManualRecord'; // 점 아이콘

// 상품 데이터 가져오기
export default function DashboardProduct() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);

  // 상품 목록 데이터를 가져오는 함수
  const fetchData = (currentPage) => {
    setIsLoading(false); // 데이터 로딩 시작
    axios
      .get(`http://localhost:8080/dashboard/product?page=${currentPage}`)
      .then((res) => {
        setList(res.data.list.content);
        setPage(res.data.nowPage);
        setStartPage(res.data.startPage);
        setEndPage(res.data.endPage);
        setIsLoading(true); // 데이터 로딩 완료
      })
      .catch((err) => {
        setIsLoading(true);
        setError(err); // 에러 발생 시
      });
  };

  // 페이지가 변경되면 fetchData 호출
  useEffect(() => {
    fetchData(page);
  }, [page]);

  // 로딩 상태 처리
  if (!isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // 에러 상태 처리
  if (error) {
    return <Alert severity="error">Failed to load notices: {error.message}</Alert>;
  }
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  return (
    <Box sx={{ padding: 2 }}>
      <TableContainer sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>상품명</TableCell>
              <TableCell align="center">재고수량</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((product, index) => (
              <TableRow key={index}>
                <TableCell  sx={{maxWidth: '150px', // 최대 너비를 설정하여 텍스트가 넘어가는 시점을 조정
                                  whiteSpace: 'nowrap', // 텍스트를 한 줄로 유지
                                  overflow: 'hidden',   // 넘치는 텍스트를 숨김 처리
                                  textOverflow: 'ellipsis', // 넘친 부분에 ... 표시
                                }} title={product.productName}>{product.productName}</TableCell>
                <TableCell align="center">{product.productEa}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 페이지네이션 */}
      <Pagination
        sx={{
          marginTop: 2,
          display: 'flex',
          justifyContent: 'center'
        }}
        count={endPage - startPage + 1}
        page={page}
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              borderRadius: '50%',
              margin: '0 2px',
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
              '&.Mui-selected > svg': {
                transform: 'scale(1.2)',
              },
            }}
            children={item.page === page ? (
              <ArrowForwardIcon fontSize="small" />
            ) : (
              <CircleIcon fontSize="small" />
            )}
          />
        )}
      />
    </Box>
  );
}
