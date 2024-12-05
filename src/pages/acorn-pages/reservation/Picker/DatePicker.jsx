import React from 'react';
import { DatePicker } from 'rsuite';

const DatePickerComponent = ({ selected, onChange }) => (
  <div className="date-picker-container">
    <DatePicker
      style={{ width: 300 }}
      placeholder="날짜를 선택하세요"
      format="yyyy-MM-dd"
      oneTap
      value={selected}
      onChange={onChange}
      placement="bottomStart" // 팝업 위치 조정
      container={() => document.querySelector('.modal-body')} // 모달 내부로 제한
    />
  </div>
);

export default DatePickerComponent;