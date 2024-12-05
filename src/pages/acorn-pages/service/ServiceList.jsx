import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "../../../acorn-components/components/Pagination";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../../../styles/ListSearch.module.css";  // 수정: .modul.css -> .module.css
import { NumericFormat } from "react-number-format";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ListSearch from "../../../acorn-components/components/ListSearch" // ListSearch 컴포넌트 임포트

// 정렬 로직
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// 헤더 셀 정의
const headCells = [
  { id: "serviceCode", align: "left", label: "서비스 코드" },
  { id: "serviceName", align: "left", label: "서비스 명" },
  { id: "servicePrice", align: "left", label: "서비스 금액" },
];

// 테이블 헤더 컴포넌트
function TestTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

TestTableHead.propTypes = {
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

function ServiceList({ services, handleDetail, setShowModal }) {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [itemsPerPage, setItemsPerPage] = useState(5); // 한 페이지당 항목 수

  // 초기 렌더링 시 filteredData를 services로 설정
  useEffect(() => {
    setFilteredData(services); // services가 변경될 때마다 filteredData 갱신
  }, [services]);

  // 검색어 상태 업데이트
  const onChange = (term) => {
    setSearchTerm(term);
  };

  // 검색 실행
  const handleSearchClick = () => {
    const filtered = services.filter((item) =>
      item.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered); // 필터링된 데이터 상태 업데이트
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  // 현재 페이지 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <Box>
      {/* 검색 및 등록 버튼 */}
      <div
        style={{
          display: "flex",
          //justify-content: space-between과 align-items: center를 사용하여 
          // 버튼과 검색 필드를 일관되게 배치
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%", // 테이블 컨테이너에 width: 100%를 적용하여 테이블이 부모 컨테이너의 전체 너비를 차지
        }}
      >
        {/* ListSearch 컴포넌트가 왼쪽 끝에 맞게 설정 */}
        <div className={styles["list-component-container"]} style={{ flex: "1" }}>
          <ListSearch
            searchTerm={searchTerm}
            onChange={onChange}
            handleSearchClick={handleSearchClick}
          />
        </div>

        <button onClick={() => setShowModal(true)} className="btn btn-success mb-3">
          서비스 등록
        </button>
      </div>

      {/* 테이블 */}
      <TableContainer className={styles["table-container"]}>
        <Table>
          <TestTableHead order="asc" orderBy="serviceCode" />
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((row) => (
                <TableRow key={row.serviceCode}>
                  <TableCell>
                    {row.serviceCode}
                  </TableCell>
                  <TableCell>
                    <span
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      onClick={() => handleDetail(row)}
                    >
                      {row.serviceName}
                    </span>
                  </TableCell>
                  <TableCell align="left">
                    <NumericFormat value={row.servicePrice} displayType="text" thousandSeparator suffix=" 원" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  등록된 서비스가 없습니다.
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

ServiceList.propTypes = {
  services: PropTypes.array.isRequired,
  handleDetail: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default ServiceList;
