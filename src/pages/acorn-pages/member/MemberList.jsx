import React, { useState, useEffect, useCallback } from 'react';
import { RiSearchLine } from "react-icons/ri";
import PropTypes from "prop-types";
import styles from "../../../styles/ListSearch.module.css";
import Pagination from "../../../acorn-components/components/Pagination";
import ListSearch from './ListMemberSearch';
import {Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Box, Button} from "@mui/material";

// 직책 순서 배열
const jobOrder = ["원장", "부원장", "실장", "디자이너", "인턴", "파트 타임"];

// 테이블 헤더 컬럼 정의
const headCells = [
  { id: "memberId", align: "left", label: "사번", width:"150px" },
  { id: "memberName", align: "left", label: "이름", width:"150px" },
  { id: "memberJob", align: "left", label: "직책", width:"150px" },
  { id: "memberTel", align: "left", label: "연락처", width:"200px" },
];

/**
 * 테이블 헤더
 * @param {string} order - 정렬 방향
 * @param {string} orderBy - 정렬 기준 필드
 */
function MemberTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{width:headCell.width}}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

MemberTableHead.propTypes = {
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

/**
 * MemberList 컴포넌트
 * @param {array} members - 직원 데이터 배열
 * @param {function} handleDetail - 상세 보기 함수
 * @param {function} setShowModal - 모달 상태 변경 함수
 */
function MemberList({ members, handleDetail, setShowModal }) {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [itemsPerPage, setItemsPerPage] = useState(10); // 한 페이지당 항목 수

  // 초기 렌더링: 데이터 정렬 후 필터링 상태 설정
  useEffect(() => {
    const sortedMembers = members.sort(
      (a, b) => jobOrder.indexOf(a.memberJob) - jobOrder.indexOf(b.memberJob)
    );
    setFilteredData(sortedMembers);
  }, [members]);

  // 검색어 업데이트 핸들러
  const onChange = (term) => {
    setSearchTerm(term);
  };

  // 검색 실행
  const handleSearchClick = () => {
    const filtered = members.filter((item) => {
      const name = item.memberName ? item.memberName.toLowerCase() : "";
      const job = item.memberJob ? item.memberJob.toLowerCase() : "";
      return name.includes(searchTerm.toLowerCase()) || job.includes(searchTerm.toLowerCase());
    });
    setFilteredData(filtered);
    setCurrentPage(1); // 첫 페이지로 이동
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
      <div className={styles.flexContainer} style={{width:"100%"}}>
        {/* 검색 컴포넌트 */}
        <div className={styles["list-component-container"]} style={{ flex: "1" }}>
          <ListSearch
            searchTerm={searchTerm}
            onChange={onChange}
            handleSearchClick={handleSearchClick}
          />
        </div>
        {/* 직원 등록 버튼 */}
        <div className={styles.buttonBox}>
        <Button
            variant="contained"
            color="success"
            onClick={() => setShowModal(true)}
            style={{
              whiteSpace: "nowrap",
              padding: "8px 20px",
            }}
          >
          직원 등록
        </Button>
        </div>
      </div>

      {/* 직원 테이블 */}
      <TableContainer style={{ marginTop: "20px" }}>
        <Table>
          {/* 테이블 헤더 */}
          <MemberTableHead order="asc" orderBy="memberId" />
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((row) => (
                <TableRow key={row.memberId} onClick={() => handleDetail(row)}>
                  {headCells.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === "memberName" ? (
                        <span
                          style={{
                            color: "blue",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          {row[column.id]}
                        </span>
                      ) : (
                        row[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headCells.length} align="center">
                  등록된 직원이 없습니다.
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

MemberList.propTypes = {
  members: PropTypes.array.isRequired,
  handleDetail: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default MemberList;
