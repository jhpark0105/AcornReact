// Built In Hooks Import
import { useState } from "react";

// Redux Import
import { useDispatch } from "react-redux";
//import { setSelectedDate } from "../../../redux/ResourceSlice";
import { setSelectedDate } from '../../../../redux/ResourceSlice';

// Third Party Import
import axios from "axios";
import { Calendar, Badge } from "rsuite";

// Custom Tool import
//import * as dateTools from "../../../libs/dateTools";
import * as dateTools from '../../../../libs/dateTools';

const CalendarBySuite = () => {
  const dateDispatch = useDispatch();

  // 현재 선택된 달에서 예약 현황이 존재하는 날짜 데이터들을 저장. 
  const [datesInMonth, setDatesInMonth] = useState([]);

  /**
   * 사용자가 특정 날짜 클릭 시 해당 날짜를 yyyy-mm-dd 형태의 문자열로
   * redux의 store에 저장.
   *
   * @param {Date} date - 사용자가 선택한 특정 날짜의 Date 객체.
   */
  const handleDateSelect = (date) => {
    let dateInFormat = dateTools.getDateStringByYYYYMMDD(date);

    // 사용자가 선택한 날짜를 예약 현황 목록 요소에서 사용할 수 있도록 store에 저장.
    dateDispatch(setSelectedDate({ selectedDate: dateInFormat }));

    // 선택된 달에 예약 현황이 존재하는 날짜들을 서버로부터 받기 위해
    // 그 달의 시작일과 말일을 결정.
    let [start, end] = dateTools.getStartEndDateOfMonth(date, true);
    fetchDatesInMonth(start, end);
  };

  /**
   * 사용자가 선택한 날짜가 포함된 달의 예약 현황 존재 여부를 한 눈에 파악하기 위해
   * 예약 현황이 존재하는 날짜(yyyy-mm-dd)들의 배열을 서버에 요청하여 state에 저장.
   *
   * @param {string} startDate yyyy-mm-dd
   * @param {string} endDate yyyy-mm-dd
   */
  const fetchDatesInMonth = (startDate, endDate) => {
    axios
      .get(`http://localhost:8080/dashboard/reservations?from=${startDate}&to=${endDate}`)
      .then((response) => {
        setDatesInMonth(response.data.data);
        //console.log(response.data.data);  // For Test
      })
      .catch((error) => {
        console.log("axios Error 발생");
        console.log(error);
      });
  };

  /**
   * Calendar 요소의 renderCell props에 대입할 콜백 함수
   *
   * @param {Date} date
   */
  const injectBadgeIfDataExist = (date) => {
    const dateStr = dateTools.getDateStringByYYYYMMDD(date);
    //console.log(dateStr);
    if (datesInMonth.includes(dateStr)) {
      return <Badge color="blue" />;
    }
    return null;
  };

  return (
    <Calendar
      compact
      onChange={handleDateSelect}
      style={{ width: "40%" }}
      renderCell={injectBadgeIfDataExist}
    />
  );
};

export default CalendarBySuite;
