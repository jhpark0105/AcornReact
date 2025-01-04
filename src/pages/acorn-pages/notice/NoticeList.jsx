import axios from 'axios'; // HTTP 요청을 위해 axios 라이브러리 임포트
import { useEffect, useState } from 'react'; // React 상태 관리와 효과 훅
import { ToastContainer, toast } from 'react-toastify'; // 알림 메시지 표시를 위한 라이브러리
import { Link, useNavigate, useLocation } from 'react-router-dom'; // 라우팅과 페이지 이동을 위한 라이브러리
import Pagination from 'acorn-components/components/Pagination'; // 페이지네이션 컴포넌트
import PushPinIcon from '@mui/icons-material/PushPin'; // 고정 공지 아이콘
import ListSearch from 'acorn-components/components/ListSearch'; // 검색 UI 컴포넌트
import TableComponent from 'acorn-components/components/TableComponentGpt'; // 표 출력 컴포넌트
import styles from '../../../styles/Pagination.module.css'; // CSS 모듈 스타일링
import Button from '@mui/material/Button'; // 공지 등록 버튼 UI

export default function NoticeList() {
  // 공지 목록과 관련된 상태 정의
  const [notices, setNotices] = useState([]); // 전체 공지 데이터 저장
  const [searchedNotices, setSearchedNotices] = useState([]); // 검색된 공지 데이터 저장
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [inputValue, setInputValue] = useState(''); // 검색 입력값
  const [searchTerm, setSearchTerm] = useState(''); // 실제 검색 쿼리

  const navigate = useNavigate(); // 페이지 이동을 위한 함수
  const location = useLocation(); // 현재 위치 정보 가져오기

  // 전체 공지 목록을 가져오는 함수
  const fetchNotices = (pageNumber) => {
    axios
      .get(`http://localhost:8080/notice?page=${pageNumber - 1}`)
      .then((response) => {
        setNotices(response.data.content || []); // 공지 목록 저장
        setTotalPages(response.data.totalPages || 0); // 전체 페이지 수 저장
      })
      .catch((error) => {
        console.error("Error fetching notices: ", error); // 에러 처리
      });
  };
  
  const noticeSearching = (keyword, pageNumber) => {
    axios
      .get(`http://localhost:8080/notice/search?keyword=${keyword}&page=${pageNumber - 1}`)
      .then((response) => {
        setSearchedNotices(response.data.content || []); // 검색된 데이터 저장
        setTotalPages(response.data.totalPages || 0); // 검색 결과의 전체 페이지 수 저장
      })
      .catch((error) => {
        console.error("Error searching notices: ", error); // 에러 처리
      });
  };

  // 현재 페이지나 검색어가 변경될 때 데이터를 다시 가져옴
  useEffect(() => {
    if (searchTerm) {
      noticeSearching(searchTerm, currentPage); // 검색 실행
    } else {
      fetchNotices(currentPage); // 전체 공지 가져오기
    }
  }, [currentPage, searchTerm]); // currentPage 또는 searchTerm이 변경될 때 실행

  // 다른 페이지에서 전달된 메시지가 있으면 toast로 알림 표시
  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message); // 성공 메시지 표시
    }
  }, [location.state]); // location.state가 변경될 때 실행

  // 검색 버튼 클릭 시 검색 실행
  const handleSearchClick = () => {
    setSearchTerm(inputValue); // 검색어를 설정
    setCurrentPage(1); // 첫 번째 페이지로 이동
  };

  // Table 컴포넌트에 전달할 컬럼 정의
  const columns = [
    { id: 'noticeNo', label: '공지 번호', width: '50px' }, // 공지 번호
    { id: 'noticeTitle', label: '제목', width: '900px', align: 'center' }, // 제목
    { id: 'noticeReg', label: '작성일', width: '50px', align: 'center' } // 작성일
  ];

  let rows;

  if (notices.length === 0) { // 공지 목록이 없을 때 처리
    rows = notices.map((_) => ({
      noticeNo: '',
      noticeTitle: <span>등록된 공지사항이 없습니다.</span>,
      noticeReg: ''
    }));
  } else if (!searchTerm) { // 검색하지 않은 경우 공지 데이터 매핑
    rows = notices.map((notice) => ({
      noticeNo : (
        <span>
          {notice.noticeCheck && <PushPinIcon sx={{ verticalAlign: 'middle', fontSize: 'medium' }} />} {/* 중요 공지 표시 */}
          {notice.noticeNo}
        </span>
      ),
      noticeTitle : (
        <Link
          to={`/main/notice/${notice.noticeNo}`} // 공지 상세 페이지로 이동
          style={{
            color: 'blue',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {notice.noticeTitle}
        </Link>
      ),
      noticeReg : notice.noticeReg // 작성일
    }));
  } else if (searchedNotices.length === 0) { // 검색 결과가 없을 때 처리
    rows = [
      {
        noticeNo: '',
        noticeTitle: <span>등록된 공지사항이 없습니다.</span>,
        noticeReg: ''
      }
    ];
  }
  // 검색 결과가 있을 때 데이터 매핑
  else {
    rows = searchedNotices.map((notice) => ({
      noticeNo : notice.noticeNo,
      noticeTitle: (
        <Link
          to={`/main/notice/${notice.noticeNo}`} // 공지 상세 페이지로 이동
          style={{
            color: 'blue',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {notice.noticeTitle}
        </Link>
      ),
      noticeReg : notice.noticeReg // 작성일
    }));
  }

  return (
    <div>
      <ToastContainer /> {/* 알림 메시지를 위한 컨테이너 */}

      {/* 검색 및 공지 등록 버튼 */}
      <div
        className={styles['list-component-container']}
        style={{
          display: 'flex',
          justifyContent: 'space-between', // 검색과 공지 등록 버튼을 양쪽 끝으로 배치
          alignItems: 'center',
          width: '100%',
        }}
      >

        <div style={{ flex: 1 }}>
          <ListSearch searchTerm={inputValue} onChange={setInputValue} handleSearchClick={handleSearchClick} />
        </div>

        <Button
          variant="contained"
          color="success"
          onClick={() => navigate('/main/notice/write')} // 공지 작성 페이지로 이동
        >
          공지 작성
        </Button>
      </div>

      {/* 공지 목록 출력 */}
      <TableComponent columns={columns} rows={rows} />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}