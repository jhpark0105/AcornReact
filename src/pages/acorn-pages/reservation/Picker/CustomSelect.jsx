import { SelectPicker } from 'rsuite';

function CustomSelect({ data, valueKey, labelKey, value, onChange, placeholder }) {
  return (
    <SelectPicker
      data={data}
      valueKey={valueKey}
      labelKey={labelKey}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width: '100%' }} // 전체 너비로 설정
      searchable={true} // 검색 기능 활성화
    />
  );
}

export default CustomSelect;