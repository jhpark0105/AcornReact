import axios from "axios";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import styles from "styles/ListSearch.module.css";

import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { ToastContainer } from 'react-toastify';

import CustomerInsForm from "./CustomerInsForm";
import CustomerDetail from "./CustomerDetail";
import Pagination from "./paging/Pagination";
import ListSearch from "./ListSearch";
import DateSearch from "./Search/DateSearch";
import TableComponent from '../../../acorn-components/components/TableComponentGpt'; // TableComponent 임포트

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false); // 등록모달
    const [selectedCustomer, setSelectedCustomer] = useState(null); // 고객 상세보기
    const [showDetailModal, setShowDetailModal] = useState(false); // 상세보기 모달
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [itemsPerPage, setItemsPerPage] = useState(20); // 페이지당 항목 수
    const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 상태 관리
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
    const [selectedFilter, setSelectedFilter] = useState("customerName"); // 선택된 기준 필터
    const [startDate, setStartDate] = useState(null); // 기간 조회
    const [endDate, setEndDate] = useState(null); // 기간 조회

    useEffect(() => {
        refresh();
    }, []);

    useEffect(() => {
        setFilteredData(customers);
    }, [customers]);

    const refresh = () => {
        axios.get("http://localhost:8080/customer")
            .then(res => {
                setCustomers(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const onChange = (term) => {
        setSearchTerm(term); // 검색어 상태만 업데이트
    };

    const handleSearchClick = () => {
        const filtered = customers.filter((item) =>
            item[selectedFilter]?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered); // 필터링된 데이터 상태 업데이트
        setCurrentPage(1); // 검색 후 첫 페이지로 이동
    };

    const handleSearch = () => {
        if (!startDate || !endDate) {
            alert("시작 날짜와 종료 날짜를 모두 선택해주세요.");
            return;
        }

        const formattedStartDate = new Date(startDate).toLocaleDateString("en-CA");
        const formattedEndDate = new Date(endDate).toLocaleDateString("en-CA");

        const filteredCustomers = customers.filter((customer) => {
            const customerRegDate = new Date(customer.customerReg).toLocaleDateString("en-CA");
            return customerRegDate >= formattedStartDate && customerRegDate <= formattedEndDate;
        });

        setFilteredData(filteredCustomers);
        setCurrentPage(1);
    };

    const handleDetail = (customer) => {
        setSelectedCustomer(customer);
        setShowDetailModal(true);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const columns = [
        { id: 'customerId', label: 'ID', width: '10%' },
        { id: 'customerName', label: '이름', width: '20%' },
        { id: 'customerGender', label: '성별', width: '10%' },
        { id: 'customerTel', label: '연락처', width: '15%' },
        { id: 'customerMail', label: 'e-mail', width: '20%' },
        { id: 'customerReg', label: '고객 등록일', width: '15%' },
        { id: 'customerRank', label: '고객 등급', width: '10%' },
        { id: 'customerNote', label: '특이사항', width: '10%' },
    ];

    const rows = currentItems.map((customer) => ({
        customerId: customer.customerId,
        customerName: (
            <span
                style={{
                    color: "blue",
                    cursor: "pointer",
                    textDecoration: "underline",
                }}
                onClick={() => handleDetail(customer)}
            >
                {customer.customerName}
            </span>
        ),
        customerGender: customer.customerGender,
        customerTel: customer.customerTel,
        customerMail: customer.customerMail,
        customerReg: customer.customerReg,
        customerRank: customer.customerRank,
        customerNote: customer.customerNote,
    }));

    return (
        <>
            <ToastContainer />
            <h1>고객 목록</h1>

            <div style={{
                width: "80%",
                margin: "0 auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
            }}>
                {/* 날짜 검색 */}
                <div style={{ display: "flex", alignItems: "center", flex: "1" }}>
                    <DateSearch
                        selectedDate={startDate}
                        setSelectedDate={setStartDate}
                    />
                    <span style={{ margin: "0 10px" }}>-</span>
                    <DateSearch
                        selectedDate={endDate}
                        setSelectedDate={setEndDate}
                    />
                    <button
                        className={styles.searchButton}
                        style={{ marginLeft: "10px" }}
                        disabled={new Date(startDate) > new Date(endDate)}
                        onClick={handleSearch}
                    >
                        <RiSearchLine />
                    </button>
                </div>

                {/* 이름/등급 검색 */}
                <div style={{ flex: "none" }}>
                    <ListSearch
                        searchTerm={searchTerm}
                        onChange={onChange}
                        handleSearchClick={handleSearchClick}
                        selectedFilter={selectedFilter}
                        setSelectedFilter={setSelectedFilter}
                    />
                </div>
            </div>

            {/* 고객 등록 버튼 */}
            <div style={{ width: "80%", margin: "0 auto", display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => setShowModal(true)} className="btn btn-success mb-3">
                    고객 등록
                </button>
            </div>

            {/* 고객 등록 모달 */}
            {/* 고객 등록 모달 */}
            {showModal && (
            <div 
            className="modal show"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} 
            tabIndex="-1"
          >
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title">고객 등록</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                    <CustomerInsForm 
                        setShowModal={setShowModal} 
                        refresh={refresh} 
                        show={false} // show 상태는 모달 외부에서 처리
                    />
                    </div>
                </div>
                </div>
            </div>
            )}


            {/* 고객 상세보기 모달 */}
            {showDetailModal && selectedCustomer && (
                <CustomerDetail selectedCustomer={selectedCustomer} setShowDetailModal={setShowDetailModal} refresh={refresh} />
            )}

            {/* 고객 목록 테이블 */}
            <TableComponent
                columns={columns}
                rows={rows}
                onRowClick={null}
            />

            {/* 페이지네이션 */}
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