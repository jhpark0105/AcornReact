import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

// material-ui
import { useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import CardContent from '@mui/material/CardContent';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// assets
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import avatar1 from 'assets/images/users/avatar-1.png';

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`
  };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

export default function Profile() {
  // 데이터 매니저 갖고와서 마이페이지 간단히 보는 모달에 뿌려줄 용도
  //const [managerData, setManagerData] = useState(null);
  // 어드민 데이터 갖고와서 마이페이지 간단히 보는 모달에 뿌려줄 용도
  const [adminData, setAdminData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/manager/mypage/B004`);
  //       setManagerData(response.data);
  //     } catch (error) {
  //       console.error('데이터 로딩 중 오류:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // 컴포넌트 렌더링 후 매니저 데이터 갖고옴
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // URL 파라미터 제거, 쿠키를 자동으로 포함하여 요청
  //       const response = await axios.get(`http://localhost:8080/manager/mypage`, {
  //         withCredentials: true // 크로스 도메인 요청 시 쿠키 포함
  //       });
  //       setManagerData(response.data);
  //     } catch (error) {
  //       console.error('데이터 로딩 중 오류:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  //branch로그인 필요없을시 검토후 아래 useeffect는 삭제 필요
  /*
  useEffect(() => {
    const fetchAdminData = () => {
      fetch('http://localhost:8080/admin/mypage', {
        credentials: 'include', // 쿠키 포함
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Admin 데이터 로드 실패');
          }
          return response.json();
        })
        .then((data) => {
          setAdminData(data); // Admin 데이터 설정
          console.log('Admin Data:', data); // 디버깅용
        })
        .catch((error) => {
          console.error('Admin 데이터 로딩 중 오류:', error);
        });
    };

    const fetchManagerData = () => {
      fetch('http://localhost:8080/manager/mypage', {
        credentials: 'include', // 쿠키 포함
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Manager 데이터 로드 실패');
          }
          return response.json();
        })
        .then((data) => {
          setManagerData(data); // Manager 데이터 설정
          console.log('Manager Data:', data); // 디버깅용
        })
        .catch((error) => {
          console.error('Manager 데이터 로딩 중 오류:', error);
        });
    };

    // 순차적으로 요청 실행
    fetchAdminData();
    fetchManagerData();
  }, []);
  */

  //admin 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // URL 파라미터 제거, 쿠키를 자동으로 포함하여 요청
        const response = await axios.get(`http://localhost:8080/admin/mypage`, {
          withCredentials: true // 크로스 도메인 요청 시 쿠키 포함
        });
        setAdminData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('데이터 로딩 중 오류:', error);
      }
    };
    fetchData();
  }, []);

  const theme = useTheme();
  const navigate = useNavigate();

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    axios.post('http://localhost:8080/logoutProcess')
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

  const iconBackColorOpen = 'grey.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' },
          '&:focus-visible': { outline: `2px solid ${theme.palette.secondary.dark}`, outlineOffset: 2 }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >

        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt="profile user" /* src={avatar1} */ size="sm" />
          {/*branch로그인 필요없을 시 검토후 아래 managerData 조건 삭제*/}
          {/*
          <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
            {managerData?.branchCode
              ? managerData.branchName
              : adminData?.adminId
                ? adminData.adminName
                : '로딩 중...'}
          </Typography>
          */}
          <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
            {adminData ? adminData.adminName : '로딩 중...'}
          </Typography>
        </Stack>

      </ButtonBase>

      {/* 마이페이지 세부 설정 보기 */}
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
            <Paper sx={{ boxShadow: theme.customShadows.z1, width: 290, minWidth: 240, maxWidth: { xs: 250, md: 290 } }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack direction="row" spacing={1.25} alignItems="center">
                          <Avatar alt="profile user" /* src={avatar1} */ sx={{ width: 32, height: 32 }} />
                          <Stack>
                            {/*branch로그인 필요없을 시 검토후 아래 managerData 조건 삭제*/}
                            {/*
                            <Typography variant="h6">
                              {managerData && managerData.branchCode
                                ? managerData.branchName
                                : adminData && adminData.adminId
                                  ? adminData.adminName
                                  : '로딩 중...'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {managerData && managerData.branchCode
                                ? `담당 관리자: ${managerData.branchName}`
                                : adminData && adminData.adminId
                                  ? `관리자 이름: ${adminData.adminName}`
                                  : '로딩 중...'}
                            </Typography>
                            */}
                            <Typography variant="h6">
                              {adminData ? adminData.adminName : '로딩 중...'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              담당 관리자 : {adminData ? adminData.adminName : '로딩 중...'}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Logout">
                          <IconButton size="large" sx={{ color: 'text.primary' }} onClick={handleLogout}>
                            <LogoutOutlined />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </CardContent>

                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="profile tabs">
                      <Tab
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textTransform: 'capitalize'
                        }}
                        icon={<UserOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                        label="Profile"
                        {...a11yProps(0)}
                      />
                      <Tab
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textTransform: 'capitalize'
                        }}
                        icon={<SettingOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                        label="Setting"
                        {...a11yProps(1)}
                      />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    <ProfileTab />
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    <SettingTab />
                  </TabPanel>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}

TabPanel.propTypes = { children: PropTypes.node, value: PropTypes.number, index: PropTypes.number, other: PropTypes.any };