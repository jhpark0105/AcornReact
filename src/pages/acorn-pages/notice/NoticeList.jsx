import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'utils/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PushPinIcon from '@mui/icons-material/PushPin';
import styles from '../../../styles/Pagination.module.css';
import ListSearch from './ListSearch';

export default function NoticeList() {
	const [notices, setNotices] = useState([]);
	const [searchedNotices, setSearchedNotices] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [inputValue, setInputValue] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

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

	// 요소 변수를 이용한 조건부 렌더링
	let listNotices;

	if (notices.length === 0) {
		listNotices = (
			<TableRow>
				<TableCell colSpan="3" align="center">
					등록된 공지사항이 없습니다.
				</TableCell>
			</TableRow>
		);
	} else if (!searchTerm) {
		listNotices = notices.map((notice) => (
			<TableRow hover key={notice.noticeNo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
				{notice.noticeCheck ? (
					<TableCell component="th" scope="row">
						<PushPinIcon sx={{ verticalAlign: 'middle', fontSize: 'medium' }} />
						{notice.noticeNo}
					</TableCell>
				) : (
					<TableCell component="th" scope="row">
						{notice.noticeNo}
					</TableCell>
				)}
				<TableCell align="center">
					<Link to={`/main/notice/${notice.noticeNo}`}>{notice.noticeTitle}</Link>
				</TableCell>
				<TableCell align="right">{notice.noticeReg}</TableCell>
			</TableRow>
		));
	} else if (searchedNotices.length === 0) {
		listNotices = (
			<TableRow>
				<TableCell colSpan="3" align="center">
					일치하는 결과가 없습니다.
				</TableCell>
			</TableRow>
		);
	} else {
		listNotices = searchedNotices.map((notice) => (
			<TableRow hover key={notice.noticeNo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
				<TableCell component="th" scope="row">
					{notice.noticeNo}
				</TableCell>
				<TableCell align="center">
					<Link to={`/main/notice/${notice.noticeNo}`}>{notice.noticeTitle}</Link>
				</TableCell>
				<TableCell align="right">{notice.noticeReg}</TableCell>
			</TableRow>
		));
	}

	return (
		<div>
			<div className={styles['list-component-container']}>
				<ListSearch searchTerm={inputValue} onChange={setInputValue} handleSearchClick={handleSearchClick} />
			</div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>공지 번호</TableCell>
							<TableCell align="center">제목</TableCell>
							<TableCell align="right">등록일</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>{listNotices}</TableBody>
				</Table>
			</TableContainer>
			<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
		</div>
	);
}
