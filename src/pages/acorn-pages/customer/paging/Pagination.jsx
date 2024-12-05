import React from "react";
import styles from "../../../../styles/Pagination.module.css";

function Pagination({ currentPage, totalPages, onPageChange, itemsPerPage, setItemsPerPage }) {
  return (
    <div>
      {/* 페이지당 표시 항목 선택 셀렉트 박스
      <div className={styles.itemsPerPageContainer}>
        <label htmlFor="itemsPerPageSelect" style={{ marginRight: "10px" }}>
          페이지당 항목:
        </label>
        <select
          id="itemsPerPageSelect"
          value={itemsPerPage}
          onChange={(e) => {
            const selectedValue = parseInt(e.target.value, 10); // 선택된 값을 숫자로 변환
            setItemsPerPage(selectedValue);
            onPageChange(1); // 페이지를 첫 번째로 리셋
          }}
          className={styles.itemsPerPageSelect}
        >
          {[5, 10].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div> */}

      {/* 페이지네이션 버튼 */}
      <div className={styles.pagination}>
        {currentPage > 1 && (
          <button
            onClick={() => onPageChange(1)}
            className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ""}`}
            disabled={currentPage === 1}
          >
            «
          </button>
        )}

        {currentPage > 1 && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ""}`}
            disabled={currentPage === 1}
          >
            ‹
          </button>
        )}

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`${styles.pageButton} ${
              currentPage === index + 1 ? styles.active : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ""}`}
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        )}

        {currentPage < totalPages && (
          <button
            onClick={() => onPageChange(totalPages)}
            className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ""}`}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        )}
      </div>
    </div>
  );
}

export default Pagination;
