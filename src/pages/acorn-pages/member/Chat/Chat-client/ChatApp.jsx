import { useState } from 'react';


function ChatApp() {
	const [user, setUser]= useState(null);
	const [message, setMessage] = useState(""); // 메시지 내용
	const [messageList, setMessageList] = useState([]); //메시지 내용 전체 저장
	const [userList, setUserList] = useState([]);// 유저 목록 저장

	useEffect(() => {
		socket.on("message", (message) => {
			setMessageList((prevState) => prevState.concat(message));
		});
		fetchUserList();
	},[]);

	const fetchUserList = async () => {
		try {
			const response = await axios.get("/api/users"); // 서버의 유저 목록 API 호출
			if (response.data.ok) {
				setUserList(response.data.data); // 유저 목록 상태에 저장
			}
		} catch (error) {
			console.error("Failed to fetch user list", error);
		}
	};

	const handleUserSelection = (selectedUser) => {
		socket.emit("login", selectedUser.name, (response) => {
			if (response?.ok) {
				setUser(response.data); // 유저 상태 저장
			} else {
				console.error("Failed to login:", response.message);
			}
		});
	};

	const sendMessage = (event) => {
		event.preventDefault();
		if (!message.trim()) return; // 빈 메시지 전송 방지
		socket.emit("sendMessage", message, (res) => {
			if (res.ok) {
				setMessage(""); // 메시지 초기화
			} else {
				console.error("Failed to sendMessage:", res);
			}
		});
	};

	return (
		<div>
			<div className="App">
				{!user ? (
					<div className="user-list">
						<h2>유저 선택</h2>
						<ul>
							{userList.map((user) => (
								<li key={user.id} onClick={() => handleUserSelection(user)}>
									{user.name}
								</li>
							))}
						</ul>
					</div>
				) : (
					<>
						<MessageContainer messageList={messageList} user={user} />
						<InputField
							message={message}
							setMessage={setMessage}
							sendMessage={sendMessage}
						/>
					</>
				)}
			</div>
		</div>
	);
}

export default ChatApp;