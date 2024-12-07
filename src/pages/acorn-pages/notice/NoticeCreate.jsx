import React, { useState } from 'react';
import axios from 'axios';

export default function NoticeCreate() {
	const [formData, setFormData] = useState({
		title: '',
		check: false,
		content: ''
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault(); // 기본 폼 제출 동작 방지
		try {
			const response = await axios.post('YOUR_API_ENDPOINT', formData);
			console.log('서버 응답:', response.data);
			// 성공적인 응답 처리 (예: 알림 메시지 표시)
		} catch (error) {
			console.error('서버 오류:', error);
			// 오류 처리 (예: 오류 메시지 표시)
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				공지 제목:
				<input type="text" name="title" value={formData.title} onChange={handleChange} required />
			</div>
			<div>
				중요도:
				<input type="checkbox" name="important" checked={formData.important} onChange={handleChange} />
			</div>
			<div>
				본문:
				<input type="text" name="content" value={formData.content} onChange={handleChange} required />
			</div>
			<button type="submit">작성</button>
			<button
				type="button"
				onClick={() => {
					history.back();
				}}
			>
				취소
			</button>
		</form>
	);
}
