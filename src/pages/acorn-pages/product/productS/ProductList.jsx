import React, { useState, useEffect } from "react";
import ListSearch from "acorn-components/components/ListSearch";
import styles from "../../../../styles/ListSearch.module.css";
import Pagination from "acorn-components/components/Pagination";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { NumericFormat } from "react-number-format";

function ProductList({ products, handleDetail, setShowModal }) {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 상태 관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [itemsPerPage, setItemsPerPage] = useState(10); // 페이지당 항목 수 (기본값 10)

  // products 데이터가 변경되면 필터링 데이터를 갱신
  useEffect(() => {
    setFilteredData(products);
  }, [products]);

  // 검색어 상태를 업데이트
  const onChange = (term) => {
    setSearchTerm(term);
  };

  // 검색어 필터링
  const handleSearchClick = () => {
    const filtered = products.filter((item) =>
      // 상품명에 검색어가 포함되는 항목만 필터링
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  // 페이지별 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // 현재 페이지에 해당하는 데이터를 계산
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <Box>
      {/* 검색 및 등록 버튼 */}
      <div className={styles.flexContainer} style={{ width: "100%" }}>
        <div className={styles["list-component-container"]} style={{ flex: "1" }}>
          {/* 검색 컴포넌트 */}
          <ListSearch
            searchTerm={searchTerm}
            onChange={onChange}
            handleSearchClick={handleSearchClick}
          />
        </div>
        
        <div className={styles.buttonBox}>
          {/* 상품 등록 버튼 */}
          <Button
            variant="contained"
            color="success"
            onClick={() => setShowModal(true)}
            style={{
              whiteSpace: "nowrap",
              padding: "8px 20px",
            }}
          >
            상품 등록
          </Button>
        </div>
      </div>

      {/* 테이블 */}
      <TableContainer className={styles["table-container"]}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>상품 코드</TableCell>
              <TableCell>상품명</TableCell>
              <TableCell>상품 금액</TableCell>
              <TableCell>상품 수량</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* 필터링된 데이터가 있을 경우 테이블 내용 표시 */}
            {currentItems.length > 0 ? (
              currentItems.map((product) => (
                <TableRow key={product.productCode}>
                  <TableCell>{product.productCode}</TableCell>
                  <TableCell>
                    {/* 상품명을 클릭하면 상세 페이지로 이동 */}
                    <span
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      onClick={() => handleDetail(product)}
                    >
                      {product.productName}
                    </span>
                  </TableCell>
                  <TableCell>
                    <NumericFormat value={product.productPrice} displayType="text" thousandSeparator suffix=" 원" />
                  </TableCell>
                  <TableCell>{product.productEa}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                {/* 데이터가 없을 경우 표시할 메시지 */}
                <TableCell colSpan={4} align="center">
                  검색된 상품이 없습니다.
                </TableCell>
              </TableRow>
            )}
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

export default ProductList;