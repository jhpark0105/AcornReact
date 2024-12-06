import React, { useState } from 'react';
import Select from 'react-select';

function CustomerSelect({ options, selectedOption, onChange }) {
  return (
    <div className="mb-3">
      <label>예약자</label>
      <Select
        value={selectedOption}
        onChange={onChange}
        options={options}
        getOptionLabel={(e) => e.label} // 선택 항목에 보여줄 값 설정
        getOptionValue={(e) => e.value} // 선택 항목의 value 값 설정
        placeholder="검색하세요..."
      />
    </div>
  );
}

export default CustomerSelect;
