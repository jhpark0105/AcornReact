// DatePickerComponent.js
import React from 'react';
import { DatePicker } from 'rsuite';

const DatePickerComponent = ({handleDate, value, readOnly}) => (
  <div className="date-picker-container" onClick={(e) => readOnly && e.stopPropagation}>
    {/**readOnly일 때 클릭 이벤트 차단 */}
    <DatePicker 
      style={{ width: 300}}
      placeholder="Select Date"
      format="yyyy / MM / dd"
      oneTap
      // selected값을 Date 객체로 변환
      onChange={handleDate}
      value={value}
      placement='bottomStart' // 팝업위치 설정
      container={()=> document.querySelector('.modal-body')} // 모달 내부로 제한
      disabled={readOnly} // readOnly에 따라 disabled 설정
    />
  </div>
);

export default DatePickerComponent;