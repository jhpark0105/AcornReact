import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import Pagination from "acorn-components/components/Pagination";
import ListSearch from "acorn-components/components/ListSearch";
import { NumericFormat } from "react-number-format"; // 숫자 포맷팅 컴포넌트

// import OrderModal from './OrderModal'; // 발주 모달 컴포넌트
// import { Modal } from 'react-bootstrap';
// import './OrderModal.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function ProductList({ products, handleDetail, setShowModal }) {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 상태 관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 10; // 페이지당 항목 수

  // const [show, setShow] = useState(false); // 발주 모달 상태
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // 초기 렌더링 시 filteredData를 products로 설정
  useEffect(() => {
    if (products && products.length > 0) {
      setFilteredData(products);
    }
  }, [products]);

  // 페이지별 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // currentItems: filteredData를 기준으로 현재 페이지에 해당하는 데이터를 계산
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 검색어에 따른 필터링 처리
  const handleSearchClick = () => {
    const filtered = products.filter((item) => {
      const isProductNameMatch = item.productName?.toLowerCase().includes(searchTerm.toLowerCase());
      const isProductBNameMatch = item.product_b?.productBName?.toLowerCase().includes(searchTerm.toLowerCase());
      return isProductNameMatch || isProductBNameMatch;
    });
    setFilteredData(filtered);
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  const headCells = [
    { id: "productCode", label: "상품 코드", width: "150px" },
    { id: "productName", label: "상품명", width: "200px" },
    { id: "productPrice", label: "상품 금액", width: "150px" },
    { id: "productEa", label: "상품 수량", width: "100px" },
  ];

  /**
   * 테이블 헤더
   */
  function ProductTableHead() {
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

  const rows = currentItems.map((product) => ({
    productCode: product.productCode,
    productName: (
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
    ),
    productPrice: (
      <NumericFormat value={product.productPrice} displayType="text" thousandSeparator suffix=" 원" />
    ),
    productEa: product.productEa,
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
          상품 등록
        </Button>
      </Box>

      <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
        <Table>
          <ProductTableHead />
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
                  검색된 상품이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 상품 발주 버튼 - 주석 처리
      <div style={{ width: "100%", margin: "20px 0", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>               
          <Button variant="contained" color="primary" onClick={handleShow} sx={{ width: "auto" }}>
              상품 발주
          </Button>
      </div>
      */}

      {/* 발주 모달 - 주석 처리
      <Modal show={show} onHide={handleClose} className='custom-modal'backdrop={{style: {zIndex: 1200 }}}>
          <Modal.Header closeButton>
          <Modal.Title>발주 화면</Modal.Title>
          </Modal.Header>
          <Modal.Body >
              <OrderModal handleClose={handleClose}></OrderModal>
          </Modal.Body>
          <Modal.Footer>
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                      닫기
              </button>
          </Modal.Footer>
      </Modal>
      */}

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Box>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  handleDetail: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default ProductList;