import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import ListSearch from "./ListSearch";
import Pagination from "../../../acorn-components/components/Pagination";
// import styles from "../ListSearch.module.css";

import 'bootstrap/dist/css/bootstrap.min.css';

// material-ui
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";

// third-party
import { NumericFormat } from "react-number-format";

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
  { id: "servicePrice", align: "right", label: "서비스 금액" },
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

// 메인 컴포넌트
function ServiceList({ services, handleDetail, setShowModal }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("serviceCode");

  // 초기 렌더링 시 filteredData 설정
  useEffect(() => {
    setFilteredData([]);
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
    setFilteredData(filtered);
    setCurrentPage(1);
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
          width: "80%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: "none" }}>
          {/* <ListSearch
            searchTerm={searchTerm}
            onChange={onChange}
            handleSearchClick={handleSearchClick}
          /> */}
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-success mb-3">
          서비스 등록
        </button>
      </div>

      {/* 테이블 */}
      <TableContainer
        sx={{
          width: "80%",
          margin: "0 auto",
          overflowX: "auto",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table>
          <TestTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((row) => (
                <TableRow key={row.serviceCode}>
                  <TableCell>
                    <Link color="secondary">{row.serviceCode}</Link>
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
                  <TableCell align="right">
                    <NumericFormat
                      value={row.servicePrice}
                      displayType="text"
                      thousandSeparator
                      suffix=" 원"
                    />
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