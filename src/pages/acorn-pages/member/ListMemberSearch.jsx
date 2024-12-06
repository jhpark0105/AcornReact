import styles from "../../../styles/ListSearch.module.css";
import { RiSearchLine } from "react-icons/ri";

 /**
   * 엔터 키 입력 시 검색 실행
   * @param {Object} e - 키 이벤트 객체
   */

 /**
 * ListSearch 컴포넌트
 * @param {string} searchTerm - 입력된 검색어
 * @param {function} handleSearchClick - 검색 버튼 클릭 시 실행될 함수
 * @param {function} onChange - 검색어 입력 시 상태 업데이트 함수
 * @param {string} selectedFilter - 선택된 필터 기준 (예: '이름' 또는 '직책')
 * @param {function} setSelectedFilter - 선택된 필터 기준을 업데이트할 함수
 * @returns {JSX.Element} ListSearch 컴포넌트
 */

const ListSearch = ({ searchTerm, handleSearchClick, onChange, selectedFilter, setSelectedFilter }) => {

  
  // 엔터 키 입력 시 검색 실행
  const handleKeyPress = (e) => {
    if (e.key === "Enter") { // 엔터 키가 눌리면
      handleSearchClick();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <select 
      className={styles.searchSelect}
      value={selectedFilter}
      onChange={(e) => setSelectedFilter(e.target.value)}> 
      {/*필터 기준 상태 업데이트 */}
        <option name="memberName">이름</option>
        <option name="memberJob">직책</option>
      </select>
      <input
        type="text"
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)} // 상태 업데이트
        onKeyDown={handleKeyPress} // 엔터 키 입력 처리
        placeholder="검색어 입력"
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
