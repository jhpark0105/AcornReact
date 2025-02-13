import styles from "../ListSearch.module.css";
import { RiSearchLine } from "react-icons/ri";

const ListSearch = ({ searchTerm, handleSearchClick, onChange, selectedFilter, setSelectedFilter }) => {

  // 엔터 키 입력 시 검색 실행
  const handleKeyPress = (e) => {
    if (e.key === "Enter") { // 엔터 키가 눌리면
      handleSearchClick();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)} // 상태 업데이트
        onKeyDown={handleKeyPress} // 엔터 키 입력 처리
        placeholder="직원 이름을 입력하세요."
      />
      <button
        className={styles.searchButton}
        onClick={handleSearchClick} // 버튼 클릭 시 필터링 실행
      >
        <RiSearchLine />
      </button>
    </div>
  );
};

export default ListSearch;
