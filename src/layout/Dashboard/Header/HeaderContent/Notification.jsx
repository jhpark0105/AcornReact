
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

// material-ui imports (기존 코드 유지)
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// 프로젝트 imports (기존 코드 유지)
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// 아이콘 imports (기존 코드 유지)
import BellOutlined from '@ant-design/icons/BellOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

export default function Notification() {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const anchorRef = useRef(null);
  const [read, setRead] = useState(0); // 초기 알림 개수
  const [notifications, setNotifications] = useState([]); // 알림 목록
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 웹소켓 연결
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      // 알림 채널 구독
      stompClient.subscribe('/topic/reservations', (message) => {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          message.body,
        ]);
        setRead((prevRead) => prevRead + 1); // 읽지 않은 알림 개수 증가
      });
    });

    return () => {
      stompClient.disconnect();
    };
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const markAsRead = () => {
    setRead(0); // 읽지 않은 알림 개수 초기화
  };

  return (
      <Box sx={{ flexShrink: 0, ml: 0.75 }}>
        <IconButton
            color="secondary"
            variant="light"
            sx={{ color: 'text.primary', bgcolor: open ? 'grey.100' : 'transparent' }}
            aria-label="open profile"
            ref={anchorRef}
            aria-controls={open ? 'profile-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
        >
          <Badge badgeContent={read} color="primary">
            <BellOutlined />
          </Badge>
        </IconButton>
        <Popper
            placement={matchesXs ? 'bottom' : 'bottom-end'}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
        >
          {({ TransitionProps }) => (
              <Transitions
                  type="grow"
                  position={matchesXs ? 'top' : 'top-right'}
                  in={open}
                  {...TransitionProps}
              >
                <Paper sx={{ boxShadow: theme.customShadows.z1, minWidth: 285, maxWidth: 420 }}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MainCard
                        title="Notification"
                        elevation={0}
                        border={false}
                        content={false}
                        secondary={
                            read > 0 && (
                                <Tooltip title="Mark as all read">
                                  <IconButton color="success" size="small" onClick={markAsRead}>
                                    <CheckCircleOutlined style={{ fontSize: '1.15rem' }} />
                                  </IconButton>
                                </Tooltip>
                            )
                        }
                    >
                      <List component="nav">
                        {notifications.map((notification, index) => (
                            <div key={index}>
                              <ListItemButton>
                                <ListItemText primary={notification} />
                              </ListItemButton>
                              {index < notifications.length - 1 && <Divider />}
                            </div>
                        ))}
                        {notifications.length === 0 && (
                            <ListItemButton>
                              <ListItemText primary=" 새로운 알림이 없습니다. "/>
                            </ListItemButton>
                        )}
                      </List>
                    </MainCard>
                  </ClickAwayListener>
                </Paper>
              </Transitions>
          )}
        </Popper>
      </Box>
  );
}
