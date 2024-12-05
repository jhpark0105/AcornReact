/**
 * 특정 날짜 정보가 담긴 Date로부터
 * 해당 달의 시작일과 마지막 일을
 * Date 객체로 반환.
 *
 * @param {Date} dateObj
 * @param {boolean} isConvertToString - 결과를 문자열로 반환할 것인지 옵션.
 * true 시 문자열로, false 시 Date 객체로 변환.
 * @returns {Date[]}
 */
const getStartEndDateOfMonth = (dateObj, isConvertToString) => {
  // Date 객체의 valueOf()를 통해 Date 객체를 깊은 복사(deep copy)한다.
  // 깊은 복사를 통해, 복사된 객체의 변형으로 인한
  // 기존 dateObj 객체의 프로퍼티 값 변형을 방지.
  const startDate = new Date(dateObj.valueOf());

  startDate.setDate(1);

  //console.log('startDate');
  //console.log(startDate);
  //console.log(dateObj);

  const endDate = new Date(dateObj.valueOf());

  //console.log('before changing endDate');
  //console.log(endDate);

  // date를 0으로 설정하면 바로 이전 달의 마지막 날로 지정됨.
  endDate.setMonth(endDate.getMonth() + 1, 0);

  //console.log('endDate');
  //console.log(endDate);

  if (isConvertToString) {
    return [
      getDateStringByYYYYMMDD(startDate),
      getDateStringByYYYYMMDD(endDate),
    ];
  }

  return [startDate, endDate];
};

/**
 * date.toISOString().split('T')[0] 사용 시 하루 전 날짜로 표시되는
 * 버그로 인해 이를 대체할 함수를 정의.
 * 예) 2024-10-21을 클릭했는데 실제로는 2024-10-20으로 선택됨.
 *
 * Date 객체를 직접 console.log로 출력할 때와, toISOString() 메서드 호출로
 * 출력할 때의 날짜가 하루 차이로 다름. Date 객체 직접 출력 결과가 맞음.
 *
 * @param {Date} dateObj
 * @returns {String} yyyy-mm-dd 형태
 */
const getDateStringByYYYYMMDD = (dateObj) => {
  // 버그 확인 코드
  //console.log(dateObj);
  //console.log(dateObj.toISOString());

  /**
   * 한 자리 숫자를 두 자리 숫자로 맞춘다.
   * 예) 2 -> 02
   *
   * @param {number} num
   * @returns {string}
   */
  const leftPadding = (num) => {
    if (num >= 10) {
      return num.toString();
    }

    return `0${num}`;
  };

  return [
    dateObj.getFullYear(),
    leftPadding(dateObj.getMonth() + 1),
    leftPadding(dateObj.getDate()),
  ].join("-");
};

/**
 * 문자열 형식의 날짜 데이터를 Date 객체로 변환
 *
 * @param {string} dateStr
 * @returns {Date}
 */
const getDateFromString = (dateStr) => {
  return new Date(dateStr);
};

/**
 * 주어진 Date 객체 또는 문자열 형식의 날짜 데이터를 'yyyy년 mm월 dd일' 
 * 형태의 문자열로 반환.
 * 
 * @param {Date | String} date - 변환하고자 하는 Date 객체 또는 문자열 타입의 날짜 데이터.
 * @throws TypeError - date 인자가 Date 또는 문자열 타입이 아닐 경우 에러 발생함. 
 * @returns {String} - 'yyyy년 mm월 dd일'
 */
const getDateStrByKoreanFormat = (date) => {
  // 리터럴 문자열은 그 타입이 String이 아닌 Object로 판별된다고 한다. 
  // 따라서 String 타입으로 변환하여 인자가 Date건 리터럴 문자열이건 
  // 모두 정상 동작하도록 함.
  const dateStr = String(date);
  //console.log(dateStr);

  let targetDate = new Date(dateStr);

  if (isNaN(targetDate.getFullYear())) {
    const errorMessage = `TypeError From getDateStrByKoreanFormat in 'dateTools.js' : date 인자는 Date 객체이거나 문자열이어야 합니다.`;
    throw new TypeError(errorMessage);
  }

  return `${targetDate.getFullYear()}년 ${targetDate.getMonth() + 1}월 ${targetDate.getDate()}일`;
};

export { 
  getStartEndDateOfMonth, 
  getDateStringByYYYYMMDD, 
  getDateFromString, 
  getDateStrByKoreanFormat,
};
