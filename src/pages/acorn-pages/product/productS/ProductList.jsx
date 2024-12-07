import axios from 'axios';
import ListSearch from 'acorn-components/components/ListSearch'; // 검색 컴포넌트
import Pagination from "../../../../utils/Pagination";
import { NumericFormat } from "react-number-format"; // 숫자 포맷팅 컴포넌트
import React, { useState, useEffect } from 'react';
import { Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import OrderModal from './OrderModal'; // 발주 모달 컴포넌트
import 'bootstrap/dist/css/bootstrap.min.css';
import './OrderModal.css';
import styles from "../../../../styles/ListSearch.module.css";
import { Modal } from 'react-bootstrap';

function ProductList({ handleDetail, setShowModal }) {
    const [products, setProducts] = useState([]); // 상품 목록 상태
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
    const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 상태 관리
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [itemsPerPage, setItemsPerPage] = useState(5); // 페이지당 항목 수 (기본값 5)
    const [show, setShow] = useState(false); // 발주 모달 상태
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/product'); // 상품 API 경로
            setProducts(response.data); // 상품 데이터 상태 업데이트
        } catch (error) {
            console.error('대분류 데이터를 가져오는 데 실패했습니다:', error);
        }
    };
    // 대분류 코드 목록을 서버에서 받아오는 함수
    useEffect(() => {
        fetchProducts(); // 컴포넌트가 마운트될 때 데이터 로딩
    }, [products]);

    // products 상태가 업데이트되면 filteredData도 갱신
    useEffect(() => {
        setFilteredData(products || []); // 제품 목록이 변경될 때마다 필터링된 데이터 업데이트
    }, [products]);

    // 검색어 상태를 업데이트 해주는 함수
    const onChange = (term) => {
        setSearchTerm(term); // 입력된 검색어 상태 업데이트
    };

    // 버튼 클릭 시 필터링 처리(상품명과 대분류명으로 상품 찾기)
    const handleSearchClick = () => {
        const filtered = products.filter((item) => {
            const isProductNameMatch = item.productName && item.productName.toLowerCase().includes(searchTerm.toLowerCase());
            const isProductBNameMatch = item.product_b && item.product_b.productBName && item.product_b.productBName.toLowerCase().includes(searchTerm.toLowerCase());
            // 상품명이나 대분류명이 일치하면 필터링
            return isProductNameMatch || isProductBNameMatch;
        });
        setFilteredData(filtered); // 필터링된 데이터 상태 업데이트
        setCurrentPage(1); //검색 후 첫 페이지로 이동
    };

    // 페이지별 데이터 계산
    const indexOfLastItem = currentPage * itemsPerPage; // itemsPerPage : 한 페이지에 표시할 서비스의 수를 정의
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem); // 데이터 배열에서 현재 페이지에 해당하는 데이터만 추출
    const totalPages = Math.ceil(filteredData.length / itemsPerPage); // 총 페이지 수 계산

    return (
        <>
            {/* 검색 및 등록 버튼 */}
            <div style={{ width: "100%", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <ListSearch searchTerm={searchTerm} onChange={onChange} handleSearchClick={handleSearchClick} />
                <Button variant="contained" color="success" onClick={() => setShowModal(true)}>
                    상품 등록
                </Button>
            </div>

            {/* 상품 리스트 테이블 */}
            <Box>
                <TableContainer className={styles["table-container"]}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>대분류</TableCell>
                                <TableCell>상품 코드</TableCell>
                                <TableCell>상품명</TableCell>
                                <TableCell>상품 금액</TableCell>
                                <TableCell>상품 수량</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentItems.length > 0 ? (
                                // 상품 데이터가 있을 경우
                                currentItems.map((product) => (
                                    <TableRow key={product.productCode}>
                                        <TableCell>{product.product_b.productBName}</TableCell>
                                        <TableCell>{product.productCode}</TableCell>
                                        <TableCell>
                                            <span
                                                style={{ color: "blue", 
                                                cursor: "pointer", 
                                                textDecoration: "underline" }}
                                                onClick={() => handleDetail(product)} // 상품명 클릭 시 상세보기
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
                                    <TableCell colSpan={5} align="center">
                                        등록된 상품이 없습니다.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {/* 상품 발주 버튼 - 테이블 우측 하단에 배치 */}
            <div style={{ width: "100%", margin: "20px 0", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>               
                <Button variant="contained" color="primary" onClick={handleShow} sx={{ width: "auto" }}>
                    상품 발주
                </Button>
            </div>
            {/* 발주 모달 */}
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
            {/* 페이지네이션 */}
            <Pagination
                currentPage={currentPage} // 현재 페이지
                totalPages={totalPages} // 총 페이지 수
                onPageChange={setCurrentPage} // 페이지 변경 시 호출
                itemsPerPage={itemsPerPage} // 현재 상태 값 전달
                setItemsPerPage={setItemsPerPage} // setItemsPerPage 함수 전달
            />
        </>
    );
}

export default ProductList;