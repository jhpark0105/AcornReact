import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  useTheme,
  useMediaQuery,
  Badge,
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Tooltip,
  Typography,
  Box,
} from '@mui/material';
import { BellOutlined, CheckCircleOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

export default function Notification() {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const anchorRef = useRef(null);

  const [notifications, setNotifications] = useState([]); // 알림 목록
  const [unreadCount, setUnreadCount] = useState(0); // 읽지 않은 알림 개수
  const [open, setOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 추가로 불러올 알림이 있는지 확인
  const [isFetching, setIsFetching] = useState(false); // 데이터가 이미 로딩 중인지 확인
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

  const fetchNotifications = async (page = 1) => {
    if (isFetching) return; // 이미 로딩 중이면 return
    setIsFetching(true);

    try {
      const response = await fetch(`http://localhost:8080/api/notifications?page=${page}`);
      console.log('Response Status:', response.status);

      if (response.ok) {
        const responseBody = await response.text(); // 텍스트로 먼저 읽기
        console.log('Response Body:', responseBody);
        const data = JSON.parse(responseBody); // JSON으로 변환

        if (data.length === 0) {
          setHasMore(false); // 더 이상 불러올 알림이 없으면 hasMore를 false로 설정
        } else {
          setNotifications((prev) => {
            const newNotifications = data.filter(
              (newNotification) => !prev.some((existingNotification) => existingNotification.id === newNotification.id)
            );
            return [...prev, ...newNotifications]; // 새 알림을 기존 목록 뒤에 추가
          });
          setUnreadCount((prev) => {
            const uniqueUnread = data.filter((n) => !n.isRead && !notifications.some((existing) => existing.id === n.id));
            return prev + uniqueUnread.length;
          });
        }
      } else {
        console.error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      console.log('WebSocket connected!');

      stompClient.subscribe('/topic/reservations', (message) => {
        console.log('Raw Message Body:', message.body);
        try {
          const parsedMessage = JSON.parse(message.body); // JSON 파싱 시도
          console.log('Parsed Message:', parsedMessage);

          const newNotification = {
            ...parsedMessage,
            isRead: false, // 새 알림은 읽지 않은 상태로 추가
          };

          setNotifications((prev) => [newNotification, ...prev]);
          setUnreadCount((prev) => prev + 1);
        } catch (error) {
          console.error('Failed to parse message:', message.body);

          // JSON이 아닌 단순 문자열 메시지인 경우
          setNotifications((prev) => [
            { content: message.body, isRead: false },
            ...prev,
          ]);
          setUnreadCount((prev) => prev + 1);
        }
      });
    });

    fetchNotifications(); // 컴포넌트 마운트 시 DB에서 초기 알림 목록 불러오기

    return () => {
      stompClient.disconnect();
      console.log('WebSocket disconnected.');
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

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
    setUnreadCount(0);
  };

  const loadMoreNotifications = () => {
    if (!isFetching && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchNotifications(nextPage);
    }
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        color="secondary"
        variant="light"
        sx={{ color: 'text.primary', bgcolor: open ? 'grey.100' : 'transparent' }}
        aria-label="open notifications"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={unreadCount} color="success">
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
                  title="Notifications"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    unreadCount > 0 && (
                      <Tooltip title="Mark all as read">
                        <IconButton color="success" size="small" onClick={markAllAsRead}>
                          <CheckCircleOutlined style={{ fontSize: '1.15rem' }} />
                        </IconButton>
                      </Tooltip>
                    )
                  }
                >
                  <List component="nav" sx={{ maxHeight: '400px', overflowY: 'auto' }} id="notification-list">
                    <InfiniteScroll
                      dataLength={notifications.length}
                      next={loadMoreNotifications}
                      hasMore={hasMore} // 더 이상 데이터가 없으면 hasMore를 false로 설정
                      scrollThreshold={0.95}
                      scrollableTarget="notification-list"
                      endMessage={<div>No more notifications.</div>} // 더 이상 알림이 없으면 메세지 표시
                    >
                      {notifications.map((notification, index) => (
                        <div key={index}>
                          <ListItemButton>
                            <ListItemText primary={notification.content || notification} />
                          </ListItemButton>
                          {index < notifications.length - 1 && <Divider />}
                        </div>
                      ))}
                      {notifications.length === 0 && (
                        <ListItemButton>
                          <ListItemText primary="No new notifications" />
                        </ListItemButton>
                      )}
                    </InfiniteScroll>
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
