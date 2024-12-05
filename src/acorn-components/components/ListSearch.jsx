import styles from "../../styles/ListSearch.module.css"; 
import { RiSearchLine } from "react-icons/ri";

/**
 * ListSearch 컴포넌트
 * @param {string} searchTerm - 검색 입력값
 * @param {function} handleSearchClick - 검색 버튼 클릭 시 실행되는 함수
 * @param {function} onChange - 검색 입력값이 변경될 때 호출되는 함수
 */
const ListSearch = ({ searchTerm, handleSearchClick, onChange }) => {

  const handleKeyPress = (e) => {
    if (e.key === "Enter") { // 입력된 키가 "Enter"인지 확인
      handleSearchClick(); // 검색 실행 함수 호출
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text" // 텍스트 입력 필드
        className={styles.searchInput} // 스타일
        value={searchTerm} // 검색 입력값을 컴포넌트 상태와 연결
        onChange={(e) => onChange(e.target.value)} // 입력값 변경 시 부모로 값 전달
        onKeyPress={handleKeyPress} // 엔터 키 처리
        placeholder="검색어 입력"
      />
      <button
        className={styles.searchButton} // 검색 버튼에 스타일 적용
        onClick={handleSearchClick} // 버튼 선택 시 검색 함수 호출
      >
        <RiSearchLine /> {/* 검색 아이콘 */}
      </button>
    </div>
  );
};

export default ListSearch;
