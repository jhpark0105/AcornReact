import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import Pagination from "acorn-components/components/Pagination";
import ListSearch from "acorn-components/components/ListSearch";

function ProductBList({ productBs, handleDetailB, setShowModal }) {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 상태 관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 10; // 페이지당 항목 수

  // 초기 렌더링 시 filteredData를 productBs로 설정
  useEffect(() => {
    if (productBs && productBs.length > 0) {
      setFilteredData(productBs);
    }
  }, [productBs]);

  // 페이지별 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // currentItems: filteredData를 기준으로 현재 페이지에 해당하는 데이터를 계산
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 검색어에 따른 필터링 처리
  const handleSearchClick = () => {
    const filtered = productBs.filter((item) =>
      item.productBName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  const headCells = [
    { id: "productBCode", label: "대분류 코드", width: "150px" },
    { id: "productBName", label: "상품명", width: "200px" },
  ];

  //테이블 헤더
  function ProductBTableHead() {
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id} sx={{ width: headCell.width }}>
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  const rows = currentItems.map((productB) => ({
    productBCode: productB.productBCode,
    productBName: (
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
    ),
  }));

  return (
    <Box sx={{ width: "100%", margin: "0 auto", padding: "16px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <ListSearch
          searchTerm={searchTerm}
          onChange={setSearchTerm}
          handleSearchClick={handleSearchClick}
        />
        <Button
          variant="contained"
          color="success"
          onClick={() => setShowModal(true)}
          style={{
            whiteSpace: "nowrap",
            padding: "8px 20px",
          }}
        >
          대분류 등록
        </Button>
      </Box>

      <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
        <Table>
          <ProductBTableHead />
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={index}>
                  {headCells.map((col) => (
                    <TableCell key={col.id}>{row[col.id]}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headCells.length} align="center">
                  등록된 대분류가 없습니다.
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
      />
    </Box>
  );
}

ProductBList.propTypes = {
  productBs: PropTypes.array.isRequired,
  handleDetailB: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default ProductBList;