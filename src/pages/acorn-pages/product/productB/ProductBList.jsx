import React, { useState, useEffect } from "react";
import ListSearch from "./ListSearch";
import styles from "../../../../styles/ListSearch.module.css";
import Pagination from "../../../../utils/Pagination";

function ProductBList({ productBs, handleDetailB, setShowModal }) {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 상태 관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [itemsPerPage, setItemsPerPage] = useState(5); // 페이지당 항목 수 (기본값 5)

  // productBs 데이터가 변경되면 필터링 데이터를 갱신
  useEffect(() => {
    setFilteredData(productBs);
  }, [productBs]);

  // 검색어 상태를 업데이트
  const onChange = (term) => {
    setSearchTerm(term);
  };

  // 검색어 필터링
  const handleSearchClick = () => {
    const filtered = productBs.filter((item) =>
      item.productBName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  // 페이지별 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage; // itemsPerPage : 한 페이지에 표시할 서비스의 수를 정의
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //currentItems : filteredData를 기준으로 현재 페이지에 해당하는 데이터를 계산
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <div style={{ width: "80%", margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
        <div className={styles["list-component-container"]}>
          <ListSearch searchTerm={searchTerm} onChange={onChange} handleSearchClick={handleSearchClick} />
        </div>

        <button onClick={() => setShowModal(true)} className="btn btn-success mb-3">
          대분류 등록
        </button>
      </div>

      <table className="table table-bordered" style={{ margin: "0 auto", width: "80%" }}>
        <thead>
          <tr>
            <th>대분류 코드</th>
            <th>상품명</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((productB) => (
              <tr key={productB.productBCode}>
                <td>
                  {productB.productBCode}
                </td>
                <td>
                  <span style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }} onClick={() => handleDetailB(productB)}>
                    {productB.productBName}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">대분류를 선택해주세요.</td>
            </tr>
          )}
        </tbody>
      </table>

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

export default ProductBList;