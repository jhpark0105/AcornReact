import styles from "../../../../styles/ListSearch.module.css";
import { RiSearchLine } from "react-icons/ri";

const ListSearch = ({ searchTerm, handleSearchClick, onChange }) => {
  // Enter 입력 시 검색
  const handleKeyPress = (e) => {
    if (e.key === "Enter") { 
      handleSearchClick();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input type="text" className={styles.searchInput} value={searchTerm} placeholder="검색어를 입력하세요"
             onChange={(e) => onChange(e.target.value)}
             onKeyPress={handleKeyPress}
      />

      {/* 버튼 클릭 시 필터링 실행 */}
      <button className={styles.searchButton} onClick={handleSearchClick}>
        <RiSearchLine />
      </button>
    </div>
  );
};

export default ListSearch;