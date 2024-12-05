import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

export const Postcode = ({ setFieldValue }) => {
  const open = useDaumPostcodePopup('//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    // 우편번호와 도로명 주소 업데이트
    setFieldValue('adminPostcode', data.zonecode); // 우편번호
    setFieldValue('adminAddress1', fullAddress); // 도로명 주소
    //console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'

    // 팝업창 닫힌 후 상세 주소 입력 필드로 포커스 이동
    setTimeout(() => {
      const address2Input = document.querySelector('#address2-signup');
      if (address2Input) {
        address2Input.focus(); // 상세 주소 입력 필드로 포커스를 이동
      }
    }, 500); // 500ms 후에 포커스를 이동 (필요에 따라 조정)
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
    >
      우편번호 찾기
    </button>
  );
};
