import React, { useState, useEffect, useCallback } from 'react';
import { RiSearchLine } from "react-icons/ri";
import styles from "../../../styles/ListSearch.module.css";
import Pagination from "./Paging/Pagination";
import TableComponent from '../../../acorn-components/components/TableComponentGpt'; // TableComponent import
//import TableComponent from './TableComponent';

function MemberList({ members, handleDetail, setShowModal }) {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 5;
  const [selectedFilter, setSelectedFilter] = useState("memberName"); // 선택된 기준 필터

  // 직책 순서
  const jobOrder = ['원장', '부원장', '실장', '디자이너', '인턴', '파트 타임'];

  // 직책 기준으로 데이터를 정렬하는 함수
  const sortByJobOrder = useCallback((data) => {
    return data.sort((a, b) => {
      return jobOrder.indexOf(a.memberJob) - jobOrder.indexOf(b.memberJob);
    });
  }, []); // jobOrder는 변하지 않으므로 빈 배열 넣어줌 

  // 초기 렌더링 시 filterData를 members로 설정
  useEffect(() => {
    const sortedMembers = sortByJobOrder(members);
    setFilteredData(sortedMembers);
  }, [members, sortByJobOrder]);

  // 검색어 상태 업데이트
  const onChange = (term) => {
    setSearchTerm(term); // 검색어 상태만 업데이트
  };

  // 버튼 클릭 시 필터링 처리
  const handleSearchClick = () => {
    // 검색어가 있는 항목만 필터링
    const filtered = members.filter((item) => {
      const memberName = item.memberName ? item.memberName.toLowerCase() : "";
      const memberJob = item.memberJob ? item.memberJob.toLowerCase() : "";

      const selectedName = memberName.includes(searchTerm.toLowerCase()); 
      const selectedJob = memberJob.includes(searchTerm.toLowerCase());  

      return selectedFilter === "memberName" ? selectedName : selectedJob;
    });
    const sortedFiltered = sortByJobOrder(filtered); // 필터링 후 직책 순서대로 배열
    setFilteredData(sortedFiltered); // 필터링된 데이터 상태 업데이트
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  // 페이지별 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage; // itemsPerPage : 한 페이지에 표시할 직원의 수를 정의
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // currentItems : filteredData를 기준으로 현재 페이지에 해당하는 데이터를 계산
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 엔터 키 입력 시 검색 실행
  const handleKeyPress = (e) => {
    if (e.key === "Enter") { // 엔터 키가 눌리면
      handleSearchClick();
    }
  };

  // Table columns 정의
  const columns = [
    { id: 'memberId', label: '사번', width: '150px' },
    { id: 'memberName', label: '이름', width: '150px'},
    { id: 'memberJob', label: '직책' , width: '150px'},
    { id: 'memberTel', label: '연락처', width: '200px' }
  ];

  // 테이블에서 한 행을 클릭했을 때 동작 처리
  const handleRowClick = (row) => {
    handleDetail(row); // 행 클릭 시 상세 보기 처리
  };
    // rows 정의 - memberName을 클릭 가능하게 만들어 파란색으로 표시
    const rows = currentItems.map((member) => ({
      memberId: member.memberId,
      memberName: (
        <span
          style={{
            color: "blue", // 파란색 텍스트
            cursor: "pointer", // 클릭 시 손 모양 커서
            textDecoration: "underline", // 밑줄 추가
          }}
          onClick={() => handleRowClick(member)} // 클릭 시 handleRowClick 호출
        >
          {member.memberName}
        </span>
      ),
      memberJob: member.memberJob,
      memberTel: member.memberTel,
    }));

  return (
    <div>
      <div style={{ width: "80%", margin: "0 auto", display: "flex", justifyContent: "space-between", 
        alignItems: "center",
        marginBottom :"20px"
      }}>
        {/* ListSearch 컴포넌트를 왼쪽 끝에 배치 */}
        <div className={styles["list-component-container"]} style={{ flex: "1" }}>
          <div className={styles.searchContainer} style={{display:"flex", alignItems:"center"}}>
            <select
              className={styles.searchSelect}
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              style={{marginRight:"10px"}}>
              {/* 필터 기준 상태 업데이트 */}
              <option value="memberName">이름</option>
              <option value="memberJob">직책</option>
            </select>
            <input
              type="text"
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => onChange(e.target.value)} // 상태 업데이트
              onKeyDown={handleKeyPress} // 엔터 키 입력 처리
              placeholder="검색어를 입력해주세요"
              style={{marginRight:"10px", flex:"1", maxWidth:"300px"}}
            />
            <button
              className={styles.searchButton}
              onClick={handleSearchClick} // 버튼 클릭 시 필터링 실행
              style={{padding: "5px 15px"}}
            >
              <RiSearchLine />
            </button>
          </div>
        </div>

        {/* 직원 등록 버튼은 원래 있던 위치로 유지 */}
        <div style={{flex:"none"}}>
        <button onClick={() => setShowModal(true)} className="btn btn-success mb-3">
          직원 등록
        </button>
        </div>
      </div>

      {/* Table 컴포넌트를 사용하여 데이터를 렌더링 */}
      <TableComponent
        columns={columns}
        rows={rows} //rows TableComponent에 전달
        onRowClick={handleRowClick} 
      />

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default MemberList;
