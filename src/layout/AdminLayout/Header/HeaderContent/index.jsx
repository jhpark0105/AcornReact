// material-ui
import Box from '@mui/material/Box';

// project import
import Profile from './Profile';
import Notification from './Notification';


// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {

  return (
    <>
      {/* 우측 정렬 */}
      {<Box sx={{ width: '100%', ml: 1, textAlign: "end" }} />}

      <Profile />

      <Notification />
    </>
  );
}