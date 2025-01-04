// SelectPickerComponent.js
import React from 'react';
import { SelectPicker } from 'rsuite';

const SelectPickerComponent = ({handleJob, value}) => {
    const jobs = [ // SelectPicker창에 뜰 직책목록
        {label : '원장', value:'원장'},
        {label : '부원장', value:'부원장'},
        {label : '실장', value:'실장'},
        {label : '디자이너', value:'디자이너'},
        {label : '인턴', value:'인턴'}
      ]
   return(
    <div className='select-picker-container'>
            <SelectPicker
            data={jobs}
            placeholder="직책을 선택하세요."
            block
            value={value}
            onChange={handleJob}
            placement='bottomStart' // 팝업위치 설정
            container={()=> document.querySelector('.modal-body')} // 모달 내부로 제한
            />
        </div>
   )
};
export default SelectPickerComponent;