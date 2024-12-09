// React Import 
import React, { useState, useEffect } from "react";
import axios from "axios";

// MUI Import
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import "dayjs/locale/ko"; // 한국어로 로컬리제이션
import dayjs from "dayjs"; // dayjs 라이브러리에서는 JS 내장 객체인 Date 대신 Dayjs라는 객체를 사용함.

// Redux Import
import { useDispatch } from "react-redux";
import { setSelectedDate } from "redux/ResourceSlice";

// Custom Library Import
import * as dateTools from '../../../../libs/dateTools';

const Calendar = () => {
  const dateDispatch = useDispatch();

  // 현재 선택된 달에서 예약 현황이 존재하는 날짜 데이터들을 저장.
  const [datesInMonth, setDatesInMonth] = useState([]);

  /**
   * 사용자가 특정 날짜 클릭 시 해당 날짜를 yyyy-mm-dd 형태의 문자열로
   * redux의 store에 저장.
   *
   * @param {dayjs} date - 사용자가 선택한 특정 날짜의 Dayjs 객체. 
   * 참고 자료
   * https://day.js.org/en/
   */
  const handleDateSelect = (date) => {
    let dateInFormat = date.format("YYYY-MM-DD");

    // 사용자가 선택한 날짜를 예약 현황 목록 요소에서 사용할 수 있도록 store에 저장.
    dateDispatch(setSelectedDate({ selectedDate: dateInFormat }));

    // 선택된 달에 예약 현황이 존재하는 날짜들을 서버로부터 받기 위해
    // 그 달의 시작일과 말일을 결정.
    let [start, end] = dateTools.getStartEndDateOfMonth(
      new Date(dateInFormat),
      true
    );
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
   * MUI에서 제공하는 달력에서는 기본적으로 특정 달의 모든 날들을 돌며 
   * 실행할 기능을 제공한다. 
   * 여기서는 예약 현황이 있는 날에 대해 이를 표시하기 위해 스타일을 바꿔주는 코드이다. 
   * 
   * 참고 자료
   * https://day.js.org/en/
   * 
   * @param {dayjs} day - 기본적으로 달력을 구성하기 위해 dayjs라는 별도의 라이브러리를 사용하고 있다. 
   */
  const injectBadgeIfDataExist = ({ day, ...others }) => {
    if (datesInMonth.includes(day.format("YYYY-MM-DD"))) {
      return (
        /* PickersDay는 날짜 한 칸을 구성하는 요소이며, 필수로 지정해야 하는 
          props들이 있다고 한다. 따라서 이를 위해 {...others}를 지정함. 
            
          예약 현황이 존재하는 날짜 칸의 배경색을 달리 하여 해당 날짜에 예약 현황이 
          존재함을 알린다.
          */
        <PickersDay
          {...others} 
          day={day}
          style={{ backgroundColor: "#C5D3E8" }}
        />
      );
    }
    return <PickersDay {...others} day={day} />;
  };

  // 첫 렌더링 시에도 캘린더 내 예약 날짜 및 예약 현황 보이도록. (오늘 기준)
  useEffect(() => {
    handleDateSelect(dayjs(new Date()));
  }, []);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="ko" // 한국어로 로컬리제이션
    >
      <DateCalendar
        onMonthChange={handleDateSelect}
        onChange={handleDateSelect}
        slotProps={{
          calendarHeader: { format: "YYYY년 MM월" },
        }}
        slots={{
          day: injectBadgeIfDataExist,
        }}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
