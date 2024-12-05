import NoticeList from './NoticeList';
import NoticeDetail from './NoticeDetail';
import { Route, Routes } from 'react-router';

const Notice = () => {
	return (
		<Routes>
			<Route path="/" element={<NoticeList />} />
			<Route path="/:no" element={<NoticeDetail />} />
		</Routes>
	);
};

export default Notice;
