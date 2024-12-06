import React from "react";
import styles from "../Pagination.module.css";

function Pagination({ currentPage, totalPages, onPageChange, itemsPerPage, setItemsPerPage }) {
  const pageGroupSize = 5; // 한 번에 표시할 페이지 번호 수
  const currentGroup = Math.ceil(currentPage / pageGroupSize); // 현재 그룹 계산
  const startPage = (currentGroup - 1) * pageGroupSize + 1; // 현재 그룹의 첫 페이지
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages); // 현재 그룹의 마지막 페이지

  return (
    <div>
      {/* 페이지네이션 버튼 */}
      <div className={styles.pagination}>
        {/* 처음으로 이동 버튼 */}
        {currentPage > 1 && (
          <button
            onClick={() => onPageChange(1)}
            className={styles.pageButton}
            disabled={currentPage === 1}
          >
            «
          </button>
        )}

        {/* 이전 그룹으로 이동 버튼 */}
        {currentGroup > 1 && (
          <button
            onClick={() => onPageChange(startPage - 1)}
            className={styles.pageButton}
          >
            ‹
          </button>
        )}

        {/* 현재 그룹의 페이지 번호 표시 */}
        {[...Array(endPage - startPage + 1)].map((_, index) => {
          const page = startPage + index;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`${styles.pageButton} ${
                currentPage === page ? styles.active : ""
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* 다음 그룹으로 이동 버튼 */}
        {endPage < totalPages && (
          <button
            onClick={() => onPageChange(endPage + 1)}
            className={styles.pageButton}
          >
            ›
          </button>
        )}

        {/* 마지막으로 이동 버튼 */}
        {currentPage < totalPages && (
          <button
            onClick={() => onPageChange(totalPages)}
            className={styles.pageButton}
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
