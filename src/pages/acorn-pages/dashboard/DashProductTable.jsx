import { useState, useEffect } from 'react';
import Pagination from "../../../acorn-components/components/Pagination";
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box,CircularProgress} from '@mui/material';

// 상품 데이터 가져오기
export default function DashboardProduct() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [itemsPerPage, setItemsPerPage] = useState(5); // 한 페이지당 항목 수

  // 현재 페이지 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(list.length / itemsPerPage);

  // 상품 목록 데이터를 가져오는 함수
  const fetchData = () => {
    setIsLoading(false); // 데이터 로딩 시작
    axios
      .get('http://localhost:8080/product/dashboard')
      .then((res) => {
        setList(res.data);
        setIsLoading(true); // 데이터 로딩 완료
      })
      .catch((err) => {
        setIsLoading(true);
        setError(err); // 에러 발생 시
      });
  };

  // 페이지가 변경되면 fetchData 호출
  useEffect(() => {
    fetchData();
  }, []);

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
    return <Alert severity="error">네트워크 오류: {error.message}</Alert>;
  }
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
            {currentItems.length> 0 ?
              (currentItems.map((product, index) => (
                <TableRow key={index}>
                  <TableCell  sx={{maxWidth: '150px', // 최대 너비를 설정하여 텍스트가 넘어가는 시점을 조정
                                    whiteSpace: 'nowrap', // 텍스트를 한 줄로 유지
                                    overflow: 'hidden',   // 넘치는 텍스트를 숨김 처리
                                    textOverflow: 'ellipsis', // 넘친 부분에 ... 표시
                                  }} title={product.productName}>{product.productName}</TableCell>
                  <TableCell align="center">{product.productEa}</TableCell>
                </TableRow>
              )))
              :
              (<TableRow>
                <TableCell colSpan={2} align='center'>10개 미만인 상품이 없습니다.</TableCell>
              </TableRow>)
            }
          </TableBody>
        </Table>
      </TableContainer>
      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
    </Box>
  );
}
