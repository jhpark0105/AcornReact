import React from "react";
import styles from "../../styles/Pagination.module.css";

/**
 * Pagination 컴포넌트
 * @param {number} currentPage - 현재 페이지 번호
 * @param {number} totalPages - 총 페이지 수
 * @param {function} onPageChange - 페이지 변경 시 호출되는 함수
 * @param {number} itemsPerPage - 페이지당 아이템 수
 * @param {function} setItemsPerPage - 페이지당 아이템 수를 변경하는 함수
 */
function Pagination({ currentPage, totalPages, onPageChange, itemsPerPage, setItemsPerPage }) {
  const pageGroupSize = 5; // 한 번에 표시할 페이지 번호의 그룹 크기
  const currentGroup = Math.ceil(currentPage / pageGroupSize); // 현재 페이지가 속한 그룹 계산
  const startPage = (currentGroup - 1) * pageGroupSize + 1; // 현재 그룹의 첫 번째 페이지 번호
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages); // 현재 그룹의 마지막 페이지 번호 (총 페이지 수를 초과하지 않도록 제한)

  return (
    <div>
      {/* pagination 컨테이너 */}
      <div className={styles.pagination}>
        {/* "처음으로" 버튼: 첫 번째 페이지로 이동 */}
        {currentPage > 1 && ( // 현재 페이지가 1보다 크면 표시
          <button
            onClick={() => onPageChange(1)} // 첫 번째 페이지로 이동
            className={styles.pageButton} // 스타일
            disabled={currentPage === 1} // 현재 페이지가 1이면 비활성화
          >
            « {/* 첫 페이지로 이동하는 화살표 */}
          </button>
        )}

        {/* "이전 그룹" 버튼: 이전 페이지 그룹으로 이동 */}
        {currentGroup > 1 && ( // 현재 그룹이 첫 번째 그룹이 아니라면 표시
          <button
            onClick={() => onPageChange(startPage - 1)} // 이전 그룹의 마지막 페이지로 이동
            className={styles.pageButton} // 스타일
          >
            ‹ {/* 이전 그룹으로 이동하는 화살표 */}
          </button>
        )}

        {/* 현재 그룹에 속한 페이지 번호 버튼 */}
        {[...Array(endPage - startPage + 1)].map((_, index) => { 
          const page = startPage + index; // 각 버튼에 표시될 페이지 번호
          return (
            <button
              key={page} // 각 버튼에 고유 값 전달 (리스트를 렌더링할 때 필요)
              onClick={() => onPageChange(page)} // 선택 시 해당 페이지로 이동
              className={`${styles.pageButton} ${ 
                currentPage === page ? styles.active : "" // 현재 페이지와 동일하면 활성화 스타일 적용
              }`}
            >
              {page} {/* 버튼에 페이지 번호 표시 */}
            </button>
          );
        })}

        {/* "다음 그룹" 버튼: 다음 페이지 그룹으로 이동 */}
        {endPage < totalPages && ( // 현재 그룹의 마지막 페이지가 총 페이지 수보다 작으면 표시
          <button
            onClick={() => onPageChange(endPage + 1)} // 다음 그룹의 첫 페이지로 이동
            className={styles.pageButton} // 스타일
          >
            › {/* 다음 그룹으로 이동하는 화살표 */}
          </button>
        )}

        {/* "마지막으로" 버튼: 마지막 페이지로 이동 */}
        {currentPage < totalPages && ( // 현재 페이지가 총 페이지 수보다 작으면 표시
          <button
            onClick={() => onPageChange(totalPages)} // 마지막 페이지로 이동
            className={styles.pageButton} // 스타일
            disabled={currentPage === totalPages} // 현재 페이지가 마지막 페이지면 비활성화
          >
            » {/* 마지막 페이지로 이동하는 화살표 */}
          </button>
        )}
      </div>
    </div>
  );
}

export default Pagination;
