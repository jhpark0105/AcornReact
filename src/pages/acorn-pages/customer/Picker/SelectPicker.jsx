// SelectPickerComponent.js
import React from 'react';
import { SelectPicker } from 'rsuite';

const SelectPickerComponent = ({onChange, value}) => {
    const ranks = [ // SelectPicker창에 뜰 등급 목록
        {label : 'GOLD', value:'GOLD'},
        {label : 'SILVER', value:'SILVER'},
        {label : 'BRONZE', value:'BRONZE'},
      ]

   return(
    <div className='select-picker-container'>
         <SelectPicker
          data={ranks}
          placeholder="등급을 선택해주세요."
          block
          value={value}
          onChange={onChange}
          placement="bottomStart"
          container={() => document.body}
          virtualized={true}
          searchable={false}
        />
    </div>
   )
};
export default SelectPickerComponent;