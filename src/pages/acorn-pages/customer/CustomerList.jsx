import axios from "axios";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import styles from "styles/ListSearch.module.css";

import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { RiSearchLine } from "react-icons/ri";

import CustomerInsForm from "./CustomerInsForm";
import CustomerDetail from "./CustomerDetail";
import Pagination from "./paging/Pagination";
import ListSearch from "./ListSearch";
import DateSearch from "./Search/DateSearch";






export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false); // 등록모달
    const [selectedCustomer, setSelectedCustomer] = useState(null); // 고객 상세보기
    const [showDetailModal, setShowDetailModal] = useState(false); // 상세보기 모달
    const [isEditing, setIsEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [itemsPerPage, setItemsPerPage] = useState(20); // 페이지당 항목 수 (기본값 5)
    const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 상태 관리
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
    const [selectedFilter, setSelectedFilter] = useState(""); // 선택된 기준 필터
    const [startDate, setStartDate] = useState(null); // 기간 조회
    const [endDate, setEndDate] = useState(null); // 기간 조회
  
    
    


    const [state, setState] = useState({});

    // 새로고침
    useEffect(() => {
        refresh()
    }, []);

    // 초기 렌더링 시 filteredData를 customers 설정
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
        })
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    // 검색어 상태를 업데이트 해주는 함수
    const onChange = (term) => {
        setSearchTerm(term); // 검색어 상태만 업데이트
    };

    // 버튼 클릭 시 필터링 처리
    // const handleSearchClick = () => {
    //     const filtered = customers.filter((item) =>
    //     item.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    //     setFilteredData(filtered); // 필터링된 데이터 상태 업데이트
    //     setCurrentPage(1); // 검색 후 첫 페이지로 이동
    // };

    // 이름.등급. 번호 검색
    const handleSearchClick = () => {
        const filtered = customers.filter((item) =>
            item[selectedFilter]?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered); // 필터링된 데이터 상태 업데이트
        setCurrentPage(1); // 검색 후 첫 페이지로 이동
    };
    
    // 기간 검색용
    const handleSearch = () => {
        // 날짜가 비어있는 경우 경고 메시지
        if (!startDate || !endDate) {
            alert("시작 날짜와 종료 날짜를 모두 선택해주세요.");
            return;
        }
    
        // Date 객체에서 "YYYY-MM-DD" 형식으로 변환
        const formattedStartDate = new Date(startDate).toLocaleDateString("en-CA");  // "2024-12-01"
        const formattedEndDate = new Date(endDate).toLocaleDateString("en-CA");  // "2024-12-31"
    
        // 고객 데이터를 날짜 범위로 필터링
        const filteredCustomers = customers.filter((customer) => {
            const customerRegDate = new Date(customer.customerReg).toLocaleDateString("en-CA");  // "2024-12-01"
            return customerRegDate >= formattedStartDate && customerRegDate <= formattedEndDate;
        });
    
        // 필터링된 고객 목록을 상태에 저장
        setFilteredData(filteredCustomers);  // filteredData는 필터링된 고객 리스트
        setCurrentPage(1); // 필터링 후 첫 페이지로 이동
    };
    
    // 고객 삭제
    {/* 
    const handleDelete = (customerId) => [
        axios.delete("/customer/" + customerId)
        .then(res => {
            refresh();
        })
        .catch(error => {
            console.log(error)
        })
    ]
    */}   

    // 고객 이름 클릭하면 모달창으로 상세정보
    const handleDetail = (customer) => {
        setSelectedCustomer(customer);
        setShowDetailModal(true);
        setIsEditing(false);
    }
    const handleEdit = () => {
        setIsEditing(true);
    }

    // 페이지별 데이터 계산
    const indexOfLastItem = currentPage * itemsPerPage; // itemsPerPage : 한 페이지에 표시할 서비스의 수를 정의
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    //currentItems : filteredData를 기준으로 현재 페이지에 해당하는 데이터를 계산
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // 총 페이지 수 계산
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <>
        <ToastContainer />

        <h1>고객 목록</h1>

        <div
    style={{
        width: "80%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center", // 세로 가운데 정렬
        marginBottom: "20px", // 두 검색 행 아래 간격 추가
    }}
>
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
            style={{ marginLeft: "10px" }} // 버튼 여백
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


        {/*<Link to="/customer/new">고객 등록</Link>*/}
        <div style={{ width: "80%", margin: "0 auto", display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => setShowModal(true)} className="btn btn-success mb-3">
          고객 등록
        </button>
        
        </div>
        {/* 등록 누르면 CustomerInsForm.js로 모달창 */}
        {showModal && (
        <div className="modal show" 
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">고객 등록</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <div className="modal-body">
                <CustomerInsForm setShowModal={setShowModal} show={showModal} refresh={refresh}/>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* 이름 누르면 CustomerDetail.js로 모달창 */}
        {showDetailModal && selectedCustomer && (
            <CustomerDetail selectedCustomer={selectedCustomer} setShowDetailModal={setShowDetailModal} refresh={refresh} />
        )}


        {/* 고객 목록 */}
        <table className="table table-bordered" style={{ margin: "0 auto", width: "80%" }}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>성별</th>
                    <th>연락처</th>
                    <th>e-mail</th>
                    <th>고객 등록일</th>
                    <th>고객 등급</th>
                    <th>특이사항</th>
                </tr>
            </thead>
            <tbody>
                {/* 반복문으로 tr 돌림 */}
                {currentItems.length > 0 ? (
                    currentItems.map((customer) => (
                    <tr key={customer.customerId}>
                        <td>{customer.customerId}</td>
                        <td>
                        <span
                            style={{
                            color: "blue",
                            cursor: "pointer",
                            textDecoration: "underline",
                            }}
                            onClick={() => handleDetail(customer)}>
                            {customer.customerName}
                        </span>
                        </td>
                        <td>{customer.customerGender}</td>
                        <td>{customer.customerTel}</td>
                        <td>{customer.customerMail}</td>
                        <td>{customer.customerReg}</td>
                        <td>{customer.customerRank}</td>
                        <td>{customer.customerNote}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="8">등록된 서비스가 없습니다.</td>
                    </tr>
                )}
            </tbody>
        </table>

        {/* 페이지네이션 */}
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage} // 현재 상태 값 전달
            setItemsPerPage={setItemsPerPage} // setItemsPerPage 함수 전달
        />
        </>
    );
}