import React, { useState, useEffect } from "react";
import ListSearch from "acorn-components/components/ListSearch";
import styles from "../../../../styles/ListSearch.module.css";
import Pagination from "acorn-components/components/Pagination";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";

function ProductBList({ productBs, handleDetailB, setShowModal }) {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 상태 관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [itemsPerPage, setItemsPerPage] = useState(10); // 페이지당 항목 수 (기본값 10)

  // productBs 데이터가 변경되면 필터링 데이터를 갱신
  useEffect(() => {
    setFilteredData(productBs);
  }, [productBs]);

  // 검색어 상태를 업데이트
  const onChange = (term) => {
    setSearchTerm(term);
  };

  // 검색어 필터링
  const handleSearchClick = () => {
    const filtered = productBs.filter((item) =>
      // 상품명에 검색어가 포함되는 항목만 필터링
      item.productBName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  // 페이지별 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage; // itemsPerPage : 한 페이지에 표시할 서비스의 수를 정의
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //currentItems : filteredData를 기준으로 현재 페이지에 해당하는 데이터를 계산
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산(전체 데이터 수 / 페이지당 항목 수)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <Box>
      {/* 검색 및 등록 버튼 */}
      <div className={styles.flexContainer} style={{width:"100%"}}>
      <div className={styles["list-component-container"]} style={{ flex: "1" }}>
          {/* 검색 컴포넌트 */}
          <ListSearch
            searchTerm={searchTerm}
            onChange={onChange}
            handleSearchClick={handleSearchClick}
          />
        </div>
        
        <div className={styles.buttonBox}>
          {/* 대분류 등록 버튼 */}
          <Button
            variant="contained"
            color="success"
            onClick={() => setShowModal(true)}
            style={{
              whiteSpace: "nowrap", // 텍스트가 한 줄로 나오도록 설정
              padding: "8px 20px", // 버튼 크기 조정
            }}
          >
          대분류 등록
        </Button>
        </div>
      </div>

      {/* 테이블 */}
      <TableContainer className={styles["table-container"]}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>대분류 코드</TableCell>
              <TableCell>상품명</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* 필터링된 데이터가 있을 경우 테이블 내용 표시 */}
            {currentItems.length > 0 ? (
              currentItems.map((productB) => (
                <TableRow key={productB.productBCode}>
                  <TableCell>{productB.productBCode}</TableCell>
                  <TableCell>
                    {/* 상품명을 클릭하면 상세 페이지로 이동 */}
                    <span
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      onClick={() => handleDetailB(productB)}
                    >
                      {productB.productBName}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                {/* 데이터가 없을 경우 표시할 메시지 */}
                <TableCell colSpan={2} align="center">
                  등록된 대분류가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage} // 현재 페이지
        totalPages={totalPages} // 총 페이지 수
        onPageChange={setCurrentPage} // 페이지 변경 시 호출될 함수
        itemsPerPage={itemsPerPage} // 페이지당 항목 수
        setItemsPerPage={setItemsPerPage} // 페이지당 항목 수를 변경할 함수
      />
    </Box>
  );
}

export default ProductBList;