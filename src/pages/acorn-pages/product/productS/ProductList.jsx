import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListSearch from 'acorn-components/components/ListSearch';
import Pagination from "../../../../utils/Pagination";
import { NumericFormat } from "react-number-format";
import { Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import OrderModal from './OrderModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OrderModal.css';
import styles from "../../../../styles/ListSearch.module.css";

function ProductList({ handleDetail, setShowModal }) {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [show, setShow] = useState(false);

    // 대분류 코드 목록을 서버에서 받아오는 함수
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/product');
                setProducts(response.data);
            } catch (error) {
                console.error('대분류 데이터를 가져오는 데 실패했습니다:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        setFilteredData(products || []);
    }, [products]);

    const onChange = (term) => {
        setSearchTerm(term);
    };

    const handleSearchClick = () => {
        const filtered = products.filter((item) => {
            const isProductNameMatch = item.productName && item.productName.toLowerCase().includes(searchTerm.toLowerCase());
            const isProductBNameMatch = item.product_b && item.product_b.productBName && item.product_b.productBName.toLowerCase().includes(searchTerm.toLowerCase());
            return isProductNameMatch || isProductBNameMatch;
        });
        setFilteredData(filtered);
        setCurrentPage(1);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // 모달 닫는 함수 추가
    const handleClose = () => {
        setShow(false); // 모달 닫기
    };

    return (
        <>
            <div style={{ width: "100%", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <ListSearch searchTerm={searchTerm} onChange={onChange} handleSearchClick={handleSearchClick} />
                <Button variant="contained" color="success" onClick={() => setShowModal(true)}>
                    상품 등록
                </Button>
            </div>

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
                                currentItems.map((product) => (
                                    <TableRow key={product.productCode}>
                                        <TableCell>{product.product_b.productBName}</TableCell>
                                        <TableCell>{product.productCode}</TableCell>
                                        <TableCell>
                                            <span
                                                style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
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
                                    <TableCell colSpan={5} align="center">
                                        등록된 상품이 없습니다.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <div style={{ width: "100%", margin: "20px 0", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setShow(true)}
                    sx={{ width: "auto" }}
                >
                    상품 발주
                </Button>
            </div>

            <Modal show={show} onHide={handleClose} dialogClassName="custom-modal" style={{ zIndex: 1500, overflowY: 'auto' }} backdrop={{ style: { zIndex: 1200 } }}>
                <Modal.Header closeButton>
                    <Modal.Title>발주 화면</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OrderModal handleClose={() => setShow(false)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
            />
        </>
    );
}

export default ProductList;