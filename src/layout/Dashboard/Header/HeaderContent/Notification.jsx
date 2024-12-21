import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
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
  Box,
} from '@mui/material';
import { BellOutlined, CheckCircleOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

export default function Notification() {
  const anchorRef = useRef(null);
  const [notifications, setNotifications] = useState([]); // 알림 목록
  const [unreadCount, setUnreadCount] = useState(0); // 읽지 않은 알림 개수
  const [open, setOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 추가로 불러올 알림이 있는지 확인
  const [isFetching, setIsFetching] = useState(false); // 데이터가 이미 로딩 중인지 확인
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

  // 중복 제거 함수
  const filterDuplicates = (newNotifications, existingNotifications) => {
    return newNotifications.filter(
      (newNotification) =>
        !existingNotifications.some(
          (existingNotification) => existingNotification.id === newNotification.id
        )
    );
  };

  // 서버에서 알림 목록을 가져오기
  const fetchNotifications = async (page = 1) => {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const response = await fetch(`http://localhost:8080/api/notifications?page=${page}`);
      if (response.ok) {
        const data = await response.json();

        if (data.length === 0) {
          setHasMore(false); // 더 이상 데이터가 없으면 스크롤 종료
        } else {
          setNotifications((prev) => {
            const uniqueNotifications = filterDuplicates(data, prev);

            // 읽지 않은 알림 개수 계산
            const unreadNotifications = uniqueNotifications.filter((n) => !n.isRead).length;
            setUnreadCount((prevUnreadCount) => prevUnreadCount + unreadNotifications);

            return [...prev, ...uniqueNotifications].sort((a, b) => b.id - a.id); // 최신 순 정렬
          });
        }
      } else {
        console.error("알림 데이터를 가져오지 못했습니다.");
      }
    } catch (error) {
      console.error("알림 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsFetching(false);
    }
  };

  // 새 알림 추가 (중복 방지)
  const addNotification = (newNotification) => {
    setNotifications((prev) => {
      if (prev.some((existing) => existing.id === newNotification.id)) {
        console.warn("중복된 알림이 감지됨:", newNotification.id);
        return prev;
      }

      // 읽지 않은 알림 개수 업데이트
      if (!newNotification.isRead) {
        setUnreadCount((prevUnreadCount) => prevUnreadCount + 1);
      }

      return [newNotification, ...prev].sort((a, b) => b.id - a.id); // 최신 순 정렬
    });
  };

  // 읽음 처리
  const handleNotificationClick = async (notificationId) => {
    try {
      const notification = notifications.find((n) => n.id === notificationId);
      if (!notification || notification.isRead) return;

      await fetch(`http://localhost:8080/api/notifications/${notificationId}/read`, {
        method: 'POST',
      });

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, isRead: true } : n
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("알림 읽음 처리하는 중 오류 발생:", error);
    }
  };

  // 모든 알림 읽음 처리
  const markAllAsRead = async () => {
    try {
      await fetch(`http://localhost:8080/api/notifications/read`, { method: 'POST' });
      setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("모든 알림 읽음 처리하는 중 오류 발생:", error);
    }
  };

  // WebSocket 초기화 및 알림 구독
  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      () => {
        console.log("웹소켓 연결 성공!");
        stompClient.subscribe('/topic/reservations', (message) => {
          try {
            const parsedMessage = JSON.parse(message.body);
            const newNotification = { ...parsedMessage, isRead: false };
            addNotification(newNotification);
          } catch (error) {
            console.error("웹소켓 메시지 처리하는 중 오류 발생:", error);

            const textNotification = {
              id: Date.now(),
              content: message.body,
              isRead: false,
            };
            addNotification(textNotification);
          }
        });
      },
      (error) => {
        console.error("웹소켓 연결 실패:", error);
      }
    );

    fetchNotifications();

    return () => stompClient.disconnect();
  }, []);

  const loadMoreNotifications = () => {
    if (!isFetching && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchNotifications(nextPage);
    }
  };

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton ref={anchorRef} onClick={handleToggle}>
        <Badge badgeContent={unreadCount} color="success">
          <BellOutlined />
        </Badge>
      </IconButton>
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps }) => (
          <Transitions type="grow" in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="Notifications"
                  secondary={
                    unreadCount > 0 && (
                      <Tooltip title="Mark all as read">
                        <IconButton color="success" onClick={markAllAsRead}>
                          <CheckCircleOutlined />
                        </IconButton>
                      </Tooltip>
                    )
                  }
                >
                  <List
                    component="nav"
                    sx={{ maxHeight: '400px', overflowY: 'auto' }}
                    id="notification-list"
                  >
                    <InfiniteScroll
                      dataLength={notifications.length}
                      next={loadMoreNotifications}
                      hasMore={hasMore}
                      scrollableTarget="notification-list"
                      endMessage={<div>더 이상 알림이 없습니다.</div>}
                    >
                      {notifications.map((notification) => (
                        <div key={notification.id}>
                          <ListItemButton onClick={() => handleNotificationClick(notification.id)}>
                            <ListItemText
                              primary={
                                <span>
                                  {!notification.isRead && (
                                    <span style={{ color: 'red', marginRight: 8 }}>🔴</span>
                                  )}
                                  {notification.content}
                                </span>
                              }
                              secondary={
                                notification.createdAt
                                  ? new Date(notification.createdAt).toLocaleString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })
                                  : null
                              }
                            />
                          </ListItemButton>
                          <Divider />
                        </div>
                      ))}
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
