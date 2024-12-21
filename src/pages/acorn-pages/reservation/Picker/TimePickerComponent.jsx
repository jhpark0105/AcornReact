import React, { useEffect, useState } from 'react';

function TimePickerComponent({ value, onChange, isEditing = false }) {
	const [selectedTime, setSelectedTime] = useState('');

	useEffect(() => {
		// value가 변경될 때마다 selectedTime을 동기화
		if (value) {
			// "13:30:00" 형식을 "13:30"으로 변환
			const formattedValue = value.includes(':') ? value.slice(0, 5) : value;
			setSelectedTime(formattedValue);
		}
	}, [value]);

	// 10:00 ~ 19:00 30분 간격으로 시간 생성
	const generateTimeOptions = () => {
		const options = [];
		const startHour = 10; // 시작 시간
		const endHour = 19; // 종료 시간

		for (let hour = startHour; hour <= endHour; hour++) {
			for (let minute = 0; minute < 60; minute += 30) {
				const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
				options.push(timeString);
			}
		}
		return options;
	};

	const timeOptions = generateTimeOptions();

	const handleChange = (e) => {
		const newValue = e.target.value;
		setSelectedTime(newValue); // 내부 상태 업데이트
		onChange(newValue); // 부모 컴포넌트로 값 전달
	};

	return (
		<select
			className="form-select"
			value={selectedTime || ''} // selectedTime이 없으면 빈 문자열로 초기화
			onChange={handleChange}
			disabled={!isEditing} // 편집 모드가 아닐 때 비활성화
		>
			<option value="" disabled>
				시간을 선택하세요
			</option>
			{timeOptions.map((time) => (
				<option key={time} value={time}>
					{time}
				</option>
			))}
		</select>
	);
}

export default TimePickerComponent;
