import styles from "../../../../styles/ListSearch.module.css";
import { RiSearchLine } from "react-icons/ri"; // 검색 아이콘 import

/**
 * 상품 검색 컴포넌트
 * (JSDoc 주석. 자바스크립트 코드에서 함수, 변수, 매개변수, 클래스 등의 설명을 추가하기 위해 사용)
 * @param {string} searchTerm - 검색어 상태 (입력된 값)
 * @param {function} handleSearchClick - 검색 버튼 클릭 시 실행되는 함수
 * @param {function} onChange - 검색어 변경 시 실행되는 함수
 */

const ListSearch = ({ searchTerm, handleSearchClick, onChange }) => {
  // Enter 입력 시 검색
  const handleKeyPress = (e) => {
    if (e.key === "Enter") { 
      handleSearchClick();
    }
  };

  return (
    <div className={styles.searchContainer}>
      {/* 검색어 입력 필드 */}
      <input type="text" className={styles.searchInput} value={searchTerm} placeholder="검색어를 입력하세요"
             onChange={(e) => onChange(e.target.value)} // 입력값이 변경될 때마다 onChange 실행
             onKeyPress={handleKeyPress} // 키보드에서 키를 누를 때 handleKeyPress 실행
      />

      {/* 검색 버튼 클릭 시 검색 실행 */}
      <button className={styles.searchButton} onClick={handleSearchClick}>
        <RiSearchLine /> {/* 검색 아이콘 표시 */}
      </button>
    </div>
  );
};

export default ListSearch;