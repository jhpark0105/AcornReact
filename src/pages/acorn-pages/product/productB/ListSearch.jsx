import styles from "../../../../styles/ListSearch.module.css";
import { RiSearchLine } from "react-icons/ri";

// 검색어 입력 필드와 검색 버튼을 포함한 컴포넌트
const ListSearch = ({ searchTerm, handleSearchClick, onChange }) => {

  //Enter 입력 시 검색
  const handleKeyPress = (e) => {
    if (e.key === "Enter") { 
      handleSearchClick();
    }
  };

  return (
    <div className={styles.searchContainer}>
      {/* 검색어 입력 필드 */}
      <input type="text" className={styles.searchInput} value={searchTerm} placeholder="검색어를 입력하세요"
             onChange={(e) => onChange(e.target.value)}
             // Enter 키를 누를 때 handleKeyPress 함수 호출
             onKeyPress={handleKeyPress}
      />
      {/* 검색 버튼: 버튼 클릭 시 handleSearchClick 함수 호출 */}
      <button className={styles.searchButton} onClick={handleSearchClick}>
        {/* 검색 아이콘 */}
        <RiSearchLine />
      </button>
    </div>
  );
};

export default ListSearch;