import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Pagination from 'acorn-components/components/Pagination';
import PushPinIcon from '@mui/icons-material/PushPin';
import ListSearch from 'acorn-components/components/ListSearch';
import TableComponent from 'acorn-components/components/TableComponentGpt';
import styles from '../../../styles/Pagination.module.css';
import Button from '@mui/material/Button';  // 공지 등록 버튼을 추가하기 위한 임포트

export default function NoticeList() {
  const [notices, setNotices] = useState([]);
  const [searchedNotices, setSearchedNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // 전체 공지 요청
  const fetchNotices = (pageNumber) => {
    axios
      .get(`http://localhost:8080/notice?page=${pageNumber - 1}`)
      .then((response) => {
        setNotices(response.data.content);
        setTotalPages(response.data.page.totalPages);
      })
      .catch((error) => {
        console.error('Error fetching notices: ', error);
      });
  };

  // 검색한 공지 요청
  const noticeSearching = (keyword, pageNumber) => {
    axios
      .get(`http://localhost:8080/notice/search?keyword=${keyword}&page=${pageNumber - 1}`)
      .then((response) => {
        setSearchedNotices(response.data.content);
        setTotalPages(response.data.page.totalPages);
      })
      .catch((error) => {
        console.error('Error searching notices: ', error);
      });
  };

  // 페이지번호나 입력된 검색어가 바뀌면 리렌더링
  useEffect(() => {
    if (searchTerm) {
      noticeSearching(searchTerm, currentPage);
    } else {
      fetchNotices(currentPage);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message); // 전달받은 메시지로 toast 표시
    }
  }, [location.state]);

  // 검색버튼 클릭 핸들러
  const handleSearchClick = () => {
    setSearchTerm(inputValue);
    setCurrentPage(1);
  };

  // Table columns 정의
  const columns = [
    { id: 'noticeNo', label: '공지 번호', width: '50px' },
    { id: 'noticeTitle', label: '제목', width: '900px', align: 'center' },
    { id: 'noticeReg', label: '작성일', width: '50px', align: 'center' }
  ];

  let rows;

  if (notices.length === 0) {
    rows = notices.map((_) => ({
      noticeNo: '',
      noticeTitle: <span>등록된 공지사항이 없습니다.</span>,
      noticeReg: ''
    }));
  } else if (!searchTerm) {
    rows = notices.map((notice) => ({
      noticeNo: (
        <span>
          {notice.noticeCheck && <PushPinIcon sx={{ verticalAlign: 'middle', fontSize: 'medium' }} />}
          {notice.noticeNo}
        </span>
      ),
      noticeTitle: (
        <Link
          to={`/main/notice/${notice.noticeNo}`}
          style={{
            color: 'blue',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {notice.noticeTitle}
        </Link>
      ),
      noticeReg: notice.noticeReg
    }));
  } else if (searchedNotices.length === 0) {
    rows = [
      {
        noticeNo: '',
        noticeTitle: <span>일치하는 결과가 없습니다.</span>,
        noticeReg: ''
      }
    ];
  } else {
    rows = searchedNotices.map((notice) => ({
      noticeNo: notice.noticeNo,
      noticeTitle: (
        <Link
          to={`/main/notice/${notice.noticeNo}`}
          style={{
            color: 'blue',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {notice.noticeTitle}
        </Link>
      ),
      noticeReg: notice.noticeReg
    }));
  }

  return (
    <div>
      <ToastContainer />

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
        {/* ListSearch 컴포넌트가 왼쪽 끝에 맞게 설정 */}
        <div style={{ flex: 1 }}>
          <ListSearch searchTerm={inputValue} onChange={setInputValue} handleSearchClick={handleSearchClick} />
        </div>

        {/* 공지 작성 버튼 */}
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate('/main/notice/write')} // 공지 등록 페이지로 이동
        >
          공지 작성
        </Button>
      </div>

      {/* 테이블 출력 */}
      <TableComponent columns={columns} rows={rows} />

      {/* 페이지네이션 */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}