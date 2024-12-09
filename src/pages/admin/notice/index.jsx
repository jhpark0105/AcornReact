import NoticeList from './NoticeList';
import NoticeDetail from './NoticeDetail';
import { Route, Routes } from 'react-router';
import NoticeCreate from './NoticeCreate';

export default function Notice() {
  return (
    <Routes>
      <Route path="/" element={<NoticeList />} />
      <Route path="/:no" element={<NoticeDetail />} />
      <Route path="/write" element={<NoticeCreate />} />
    </Routes>
  );
}