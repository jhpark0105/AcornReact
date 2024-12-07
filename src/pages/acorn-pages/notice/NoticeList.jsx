import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from 'utils/Pagination';
import PushPinIcon from '@mui/icons-material/PushPin';
import styles from '../../../styles/Pagination.module.css';
import ListSearch from './ListSearch';
import TableComponent from 'acorn-components/components/TableComponentGpt';
import { Button } from '@mui/material';

export default function NoticeList() {
	const [notices, setNotices] = useState([]);
	const [searchedNotices, setSearchedNotices] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [inputValue, setInputValue] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

	const navigate = useNavigate();

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

	// 검색 여부에 따라 의존성배열 변동
	useEffect(() => {
		if (searchTerm) {
			noticeSearching(searchTerm, currentPage);
		} else {
			fetchNotices(currentPage);
		}
	}, [currentPage, searchTerm]);

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

	let rows; // 테이블 내용이 될 행을 조건에 따라 정의

	if (notices.length === 0) {
		// 등록된 공지사항이 없습니다
		rows = notices.map((_) => ({
			noticeNo: '',
			noticeTitle: <span>등록된 공지사항이 없습니다.</span>,
			noticeReg: ''
		}));
	} else if (!searchTerm) {
		// 기본 출력
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
						color: 'blue', // 파란색 텍스트
						cursor: 'pointer', // 클릭 시 손 모양 커서
						textDecoration: 'underline' // 밑줄 추가
					}}
				>
					{notice.noticeTitle}
				</Link>
			),
			noticeReg: notice.noticeReg
		}));
	} else if (searchedNotices.length === 0) {
		// 일치하는 결과가 없습니다
		rows = [
			{
				noticeNo: '',
				noticeTitle: <span>일치하는 결과가 없습니다.</span>,
				noticeReg: ''
			}
		];
	} else {
		// 검색결과 출력
		rows = searchedNotices.map((notice) => ({
			noticeNo: notice.noticeNo,
			noticeTitle: (
				<Link
					to={`/main/notice/${notice.noticeNo}`}
					style={{
						color: 'blue', // 파란색 텍스트
						cursor: 'pointer', // 클릭 시 손 모양 커서
						textDecoration: 'underline' // 밑줄 추가
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
			<div className={styles['list-component-container']} style={{ display: 'flex', justifyContent: 'space-between' }}>
				<ListSearch searchTerm={inputValue} onChange={setInputValue} handleSearchClick={handleSearchClick} />
				<Button variant="contained" color="success" onClick={() => navigate('/main/notice/write')} hidden>
					공지 작성(미구현)
				</Button>
			</div>
			<TableComponent // Table 컴포넌트를 사용하여 데이터를 렌더링 */
				columns={columns}
				rows={rows} //rows TableComponent에 전달
			/>
			<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
		</div>
	);
}
