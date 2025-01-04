
import React from 'react';
import { DatePicker } from 'rsuite';

const DatePickerComponent = ({ value, handleDate, disabled, style }) => (
  <div className="date-picker-container">
    <DatePicker
      style={style}  // style을 props로 전달받음
      placeholder="날짜를 선택하세요"
      format="yyyy-MM-dd"
      oneTap
      value={value}
      onChange={handleDate}
      placement="bottomStart" // 팝업 위치 조정
      container={() => document.body} // 모달 내부로 제한
      virtualized={true}
      disabled={disabled}
    />
  </div>
);

export default DatePickerComponent;


