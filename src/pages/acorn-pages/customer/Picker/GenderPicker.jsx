// SelectPickerComponent.js
import React from 'react';
import { SelectPicker } from 'rsuite';

const GenderPickerComponent = ({value, onChange}) => {
      const genders = [ // SelectPicker창에 뜰 성별
        {label : '남자', value:'남자'},
        {label : '여자', value:'여자'}
      ]

   return(
    <div className='select-picker-container'>
            <SelectPicker
            data={genders}
            placeholder="성별 선택해주세요."
            block
            value={value}
            onChange={onChange}
            placement='bottomStart' // 팝업위치 설정
            container={()=> document.body} // 모달 내부로 제한
            virtualized
            searchable={false}  //검색 비허용
            />
    </div>
   )
};
export default GenderPickerComponent;