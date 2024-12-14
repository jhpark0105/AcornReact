import NoticeList from './NoticeList';
import NoticeDetail from './NoticeDetail';
import NoticeCreate from './NoticeCreate';
import { Route, Routes } from 'react-router';

const Notice = () => {
  return (
    <Routes>
      <Route path="/" element={<NoticeList />} />
      <Route path="/:no" element={<NoticeDetail />} />
      <Route path="/write" element={<NoticeCreate />} />
    </Routes>
  );
};

export default Notice;