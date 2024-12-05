// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';

// project import
import { GithubOutlined } from '@ant-design/icons';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {/* {!downLG && <Search />} */}
      
      {/* 상단 네비게이션 바 사이 여백용 */}
      {/*downLG && <Box sx={{ width: '100%', ml: 1, textAlign: "end" }} />*/} {/* 이 코드 사용 시 아이콘들이 자꾸 왼쪽으로 붙을려고 한다. */}
      {<Box sx={{ width: '100%', ml: 1, textAlign: "end" }} />} {/* 이 코드를 사용해야 아이콘들이 오른쪽에 달라붙는다. */}

      {/* 깃허브 아이콘 */}
      {/* <IconButton
        component={Link}
        href="https://github.com/codedthemes/mantis-free-react-admin-template"
        target="_blank"
        disableRipple
        color="secondary"
        title="Download Free Version"
        sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
      >
        <GithubOutlined />
      </IconButton> */}

      <Profile />
      <Notification />
    </>
  );
}