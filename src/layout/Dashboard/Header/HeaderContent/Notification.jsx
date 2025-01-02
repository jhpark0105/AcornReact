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

/**
 * Notification 컴포넌트
 * - WebSocket과 REST API를 사용하여 실시간 알림과 알림 목록을 표시
 */
export default function Notification() {
  const anchorRef = useRef(null); // Popper의 anchor를 참조하는 ref
  const [notifications, setNotifications] = useState([]); // 알림 목록 상태
  const [unreadCount, setUnreadCount] = useState(0); // 읽지 않은 알림 개수 상태
  const [open, setOpen] = useState(false); // Popper 열림 상태
  const [hasMore, setHasMore] = useState(true); // 추가 알림 로드 여부
  const [isFetching, setIsFetching] = useState(false); // 데이터 로드 중 여부
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 상태

  /**
   * 중복 알림 필터링
   * - 새로운 알림과 기존 알림을 비교하여 중복 제거
   * @param {Array} newNotifications - 새로 가져온 알림 목록
   * @param {Array} existingNotifications - 기존 알림 목록
   * @returns {Array} 중복 제거된 알림 목록
   */
  const filterDuplicates = (newNotifications, existingNotifications) => {
    return newNotifications.filter(
      (newNotification) =>
        !existingNotifications.some(
          (existingNotification) => existingNotification.id === newNotification.id
        )
    );
  };

  /**
   * 서버에서 알림 목록 가져오기
   * @param {number} page - 요청할 페이지 번호
   */
  const fetchNotifications = async (page = 1) => {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const response = await fetch(`http://localhost:8080/api/notifications?page=${page}`);
      if (response.ok) {
        const data = await response.json();

        if (data.length === 0) {
          setHasMore(false); // 더 이상 데이터가 없으면 추가 로드 중지
        } else {
          setNotifications((prev) => {
            const combinedNotifications = [...prev, ...data];
            const uniqueNotifications = combinedNotifications.filter(
              (notification, index, self) =>
                index === self.findIndex((n) => n.id === notification.id)
            );
            // 읽지 않은 알림 개수 업데이트
            const newUnreadCount = uniqueNotifications.filter((n) => !n.isRead).length;
            setUnreadCount(newUnreadCount);
            return uniqueNotifications.sort((a, b) => b.id - a.id); // 최신 순 정렬
          });
        }
      } else {
        console.error('알림 데이터를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('알림 데이터를 가져오는 중 오류 발생:', error);
    } finally {
      setIsFetching(false);
    }
  };

  /**
   * WebSocket으로 수신한 새 알림 처리
   * - 중복 여부를 확인 후 상태 업데이트
   * @param {Object} newNotification - WebSocket으로 수신한 알림
   */
  const processNewNotification = (newNotification) => {
    setNotifications((prev) => {
      if (prev.some((n) => n.id === newNotification.id)) {
        console.warn('중복된 알림 무시:', newNotification.id);
        return prev;
      }

      const updatedNotifications = [newNotification, ...prev].sort((a, b) => b.id - a.id);

      // 읽지 않은 알림 개수 업데이트
      const newUnreadCount = updatedNotifications.filter((n) => !n.isRead).length;
      setUnreadCount(newUnreadCount);

      return updatedNotifications;
    });
  };

  /**
   * 알림 읽음 처리
   * - 특정 알림을 읽은 상태로 업데이트.
   * @param {number} notificationId - 읽음 처리할 알림 ID
   */
  const handleNotificationClick = async (notificationId) => {
    try {
      const notification = notifications.find((n) => n.id === notificationId);
      if (!notification || notification.isRead) {
        console.warn(`알림이 없거나 이미 읽은 상태입니다. 알림 ID: ${notificationId}`);
        return;
      }

      const response = await fetch(`http://localhost:8080/api/notifications/${notificationId}/read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        console.error(`알림 읽음 처리 실패 (상태 코드: ${response.status})`);
        return;
      }

      setNotifications((prev) => {
        const updatedNotifications = prev.map((n) =>
          n.id === notificationId ? { ...n, isRead: true } : n
        );

        // 읽지 않은 알림 개수 업데이트
        const newUnreadCount = updatedNotifications.filter((n) => !n.isRead).length;
        setUnreadCount(newUnreadCount);

        return updatedNotifications;
      });
    } catch (error) {
      console.error('알림 읽음 처리 중 오류 발생:', error);
    }
  };

  /**
   * 모든 알림 읽음 처리
   */
  const markAllAsRead = async () => {
    try {
      await fetch(`http://localhost:8080/api/notifications/read`, { method: 'POST' });
      setNotifications((prev) => {
        const updatedNotifications = prev.map((notification) => ({ ...notification, isRead: true }));
        setUnreadCount(0);
        return updatedNotifications;
      });
    } catch (error) {
      console.error('모든 알림 읽음 처리 중 오류 발생:', error);
    }
  };

  /**
   * WebSocket 초기화 및 구독 설정
   * - 컴포넌트가 마운트될 때 실행되고 언마운트 시 WebSocket 연결 해제
   */
  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      () => {
        console.log('WebSocket 연결 성공!');
        stompClient.subscribe('/topic/reservations', (message) => {
          try {
            const parsedMessage = JSON.parse(message.body);
            processNewNotification({ ...parsedMessage, isRead: false });
          } catch (error) {
            console.error('WebSocket 메시지 처리 중 오류 발생:', error);

            const textNotification = {
              id: Date.now(), // 임시 ID 생성
              content: message.body,
              isRead: false,
              createdAt: new Date().toISOString(), // 현재 시간 설정
            };
            processNewNotification(textNotification);
          }
        });
      },
      (error) => {
        console.error('WebSocket 연결 실패:', error);
      }
    );

    fetchNotifications();

    return () => stompClient.disconnect();
  }, []);

  /**
   * 무한 스크롤을 통해 알림 더 불러오기
   */
  const loadMoreNotifications = () => {
    if (!isFetching && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchNotifications(nextPage);
    }
  };

  /**
   * Popper 열기/닫기 토글
   */
  const handleToggle = () => setOpen((prev) => !prev);

  /**
   * Popper 닫기
   * - Popper 외부를 클릭하면 닫히도록 설정
   * @param {Object} event - 클릭 이벤트 객체
   */
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
                                  {/* 알림 내용에 클래스 적용 */}
                                  <span className="notification-content">{notification.content}</span>
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