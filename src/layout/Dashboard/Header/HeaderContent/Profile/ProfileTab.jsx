import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import EditOutlined from '@ant-design/icons/EditOutlined';
import ProfileOutlined from '@ant-design/icons/ProfileOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import WalletOutlined from '@ant-design/icons/WalletOutlined';
import { useNavigate } from 'react-router';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

export default function ProfileTab() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index, path) => {
    setSelectedIndex(index);
    navigate(path);
  };

  const handleLogout = () => {
    axios.post('http://localhost:8080/logoutProcess', {}, {
      withCredentials: true // 현재 세션의 쿠키를 서버에 전송하여 무효화
    })
    .then((response) => {
      if (response.status === 200) {
        //alert("로그아웃 성공");
        navigate('/main/login');
      }
    })
    .catch(error => {
        console.error("로그아웃 에러 : ",error);
    })
  }

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton 
        selected={selectedIndex === 0} 
        onClick={() => handleListItemClick(0, '/main/manager/mypage/update')}
        >
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItemButton>
      
      <ListItemButton 
        selected={selectedIndex === 1} 
        onClick={() => handleListItemClick(1, '/main/manager/mypage/view')}
        >

        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>

      {/* <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3, 'apps/profiles/account/personal')}>
        <ListItemIcon>
          <ProfileOutlined />
        </ListItemIcon>
        <ListItemText primary="Social Profile" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4, '/apps/invoice/details/1')}>
        <ListItemIcon>
          <WalletOutlined />
        </ListItemIcon>
        <ListItemText primary="Billing" />
      </ListItemButton> */}

      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon >
        <ListItemText primary="Logout"  />
      </ListItemButton>
    </List>
  );
}

ProfileTab.propTypes = { handleLogout: PropTypes.func };
