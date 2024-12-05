import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Pagination, CircularProgress, Alert } from '@mui/material';


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

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        상품 목록
      </Typography>
      <TableContainer sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>상품명</TableCell>
              <TableCell align="center">재고수량</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.productName}</TableCell>
                <TableCell align="center">{product.productEa}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 페이지네이션 */}
      <Pagination
        sx={{ marginTop: 2 }}
        count={endPage - startPage + 1}
        page={page}
        onChange={(e, value) => setPage(value)}
        variant="outlined"
        shape="rounded"
        color="primary"
      />
    </Box>
  );
}
