import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "../../../acorn-components/components/Pagination";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import styles from "../../../styles/ListSearch.module.css";  // 수정: .modul.css -> .module.css
import { NumericFormat } from "react-number-format";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ListSearch from "../../../acorn-components/components/ListSearch" // ListSearch 컴포넌트 임포트

// stableSort 까지 상단 페이지 구분하는 코드를 위한 함수
// 정렬 로직 : 내림차순으로 수행
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// 정렬 방향과 기준에 따라 정렬을 수행하는 비교 함수 생성
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// 데이터 배열을 안정적으로 정렬하는 함수
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

// ----------------------------------------------------------------------------------------------
// 테이블 헤더 : 컬럼 이름과 정렬 정보 포함
const headCells = [
  { id: "serviceCode", align: "left", label: "서비스 코드" },
  { id: "serviceName", align: "left", label: "서비스 명" },
  { id: "servicePrice", align: "left", label: "서비스 금액" },
];


/**
 * 테이블 헤더
 * @param {string} order - 정렬 방향 ("asc" 또는 "desc")
 * @param {string} orderBy - 정렬 기준 필드
 */
function TestTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align} // 정렬 방식 설정
            sortDirection={orderBy === headCell.id ? order : false} // 현재 정렬 기준 표시
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// PropTypes 정의 (컴포넌트가 요구하는 속성들)
TestTableHead.propTypes = {
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

/**
 * 서비스 목록
 * @param {array} services - 서비스 데이터 배열
 * @param {function} handleDetail - 서비스 상세 보기 함수
 * @param {function} setShowModal - 모달 상태 변경 함수
 */

function ServiceList({ services, handleDetail, setShowModal }) {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [itemsPerPage, setItemsPerPage] = useState(10); // 한 페이지당 항목 수

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
      // 대소문자를 구분하지 않고 serviceName에 검색어가 포함되어 있는지 확인
      // .toLowerCase()로 검색어를 소문자로 변환
      item.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) // 서비스 이름으로 필터링
    );
    setFilteredData(filtered); // 필터링된 데이터 상태 업데이트
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  // 현재 페이지 데이터 계산
  // 현재 페이지의 마지막 항목의 인덱스(데이터를 페이지별로 나누기 위해 사용) = 현재 페이지 상태 * 한 페이지당 항목 수
  const indexOfLastItem = currentPage * itemsPerPage; 

  // 현재 페이지의 첫 번째 항목의 인덱스(현재 페이지에 표시할 데이터 범위를 지정) = 현재 페이지의 마지막 항목의 인덱스 - 한 페이지당 항목 수
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem); //  데이터 배열에서 현재 페이지에 해당하는 데이터만 추출 -> 추출된 데이터는 현재 페이지에 표시 

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

        <Button
          variant="contained"
          color="success"
          onClick={() => setShowModal(true)}
        >
        서비스 등록
      </Button>
      </div>

      {/* 서비스 테이블 */}
      <TableContainer className={styles["table-container"]}>
        <Table>
          {/* 테이블 헤더 */}
          <TestTableHead order="asc" orderBy="serviceCode" />
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((row) => ( // 필터링된 데이터를 테이블로 렌더링
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
                      onClick={() => handleDetail(row)} // 행 클릭 시 상세 보기
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
  services: PropTypes.array.isRequired, // 서비스 데이터 배열
  handleDetail: PropTypes.func.isRequired, // 상세 보기 함수
  setShowModal: PropTypes.func.isRequired, // 모달 상태 관리 함수
};

export default ServiceList;
