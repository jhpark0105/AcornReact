import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

function ChatPage() {
  const [branchCode, setBranchCode] = useState(localStorage.getItem("branchCode")); // 로컬 스토리지에서 브랜치 코드 가져오기
  const [customers, setCustomers] = useState([]); // 고객 목록
  const [selectedCustomer, setSelectedCustomer] = useState(null); // 선택한 고객
  const [messages, setMessages] = useState([]); // 메시지 목록
  const [newMessage, setNewMessage] = useState(""); // 새 메시지
  const [socket, setSocket] = useState(null); // WebSocket 연결
  const messagesEndRef = useRef(null); // 자동 스크롤용 Ref

  useEffect(() => {
    if (!branchCode) return;

    // WebSocket 연결
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket connected");
      ws.send(JSON.stringify({ type: "branchLogin", branchCode })); // 서버에 지점 코드 전달
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "customerList") {
        setCustomers(data.customers); // 고객 목록 업데이트
      } else if (data.type === "message" && data.customerTel === selectedCustomer?.tel) {
        setMessages((prev) => [...prev, data]); // 메시지 추가
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close(); // 컴포넌트 언마운트 시 WebSocket 닫기
    };
  }, [branchCode, selectedCustomer]);

  const selectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setMessages([]); // 이전 메시지 초기화
    if (socket) {
      socket.send(JSON.stringify({ type: "joinRoom", customerTel: customer.tel })); // 고객 채팅방 입장
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() && socket && selectedCustomer) {
      const messageData = {
        type: "message",
        branchCode,
        customerTel: selectedCustomer.tel,
        text: newMessage,
      };
      socket.send(JSON.stringify(messageData));
      setMessages((prev) => [...prev, { sender: "You", text: newMessage }]);
      setNewMessage("");
    }
  };

  // 채팅 메시지 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!branchCode) {
    return <Typography>지점 코드가 없습니다. 로그인하세요.</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: "900px",
        margin: "0 auto",
        padding: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      {/* 고객 리스트 */}
      <Paper
        sx={{
          width: "30%",
          height: "500px",
          overflowY: "auto",
          border: "1px solid #ddd",
          marginRight: 2,
          padding: 2,
        }}
      >
        <Typography variant="h6">고객 리스트</Typography>
        <List>
          {customers.map((customer, index) => (
            <ListItem
              button
              key={index}
              onClick={() => selectCustomer(customer)}
              selected={selectedCustomer?.tel === customer.tel}
            >
              <ListItemText primary={customer.name} secondary={customer.tel} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* 채팅창 */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          {selectedCustomer ? `채팅: ${selectedCustomer.name}` : "고객을 선택하세요"}
        </Typography>
        <Paper
          sx={{
            flex: 1,
            overflowY: "auto",
            border: "1px solid #ddd",
            padding: 2,
            mb: 2,
          }}
        >
          {messages.map((msg, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Typography variant="body2">
                <strong>{msg.sender}:</strong> {msg.text}
              </Typography>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Paper>
        {selectedCustomer && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="메시지를 입력하세요..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={sendMessage}>
              전송
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ChatPage;
