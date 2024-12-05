// Hooks import
import React, { useEffect, useMemo, useState } from "react";

// Redux import
import { useSelector } from "react-redux";

// Third Party Libraries import
import axios from "axios";
import { List } from "rsuite";

// Custom Tool import 
import { isEmptyObject } from "../../../libs/jsonTools";
import * as dateTools from '../../../libs/dateTools';

// Custom Sub Components Import
import ListItemOfTitle from './ReservationListSub/ListItemOfTitle';
import ListItemOfField from "./ReservationListSub/ListItemOfField";
import ListItemOfData from "./ReservationListSub/ListItemOfData";
import ListItemOfPagination from "./ReservationListSub/ListItemOfPagination";

const ReservationListBySuite = () => {
  
  // 예약 현황 카드 내 헤더 및 데이터들의 수평 간격 조절
  const fieldColSpan = 6;
  const listColSpan = 6;

  // 캘린더에서의 사용자 선택 날짜를 redux store로부터 가져와 작업
  const targetDate = useSelector((state) => state.resource.selectedDate);

  const [jsonData, setJsonData] = useState({});  // axios fetch로 가져온 데이터 저장.
  const [currentPageNo, setCurrentPageNo] = useState(1); // 현재 페이지 번호 저장.
  const [prevDate, setPrevDate] = useState("");  // 바로 이전에 선택한 날짜 저장. 중복 페이지 요청 방지용.

  const fetchData = (targetDateParam, pageNo = 1) => {
    // 똑같은 페이지 요청 방지.
    if (targetDateParam === prevDate && pageNo === currentPageNo) return;
    axios
      .get(
        `/dashboard/reservations/date/${targetDateParam}?pageNo=${pageNo}`
      )
      .then((response) => {
        setJsonData(response.data);
        if (!isEmptyObject(response.data)) {
          setCurrentPageNo(response.data.data.currentPage);
        }
        setPrevDate(targetDateParam);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log("데이터 가져오던 중 에러 발생");
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData(targetDate);
  }, [targetDate]);

  // useMemo 미사용 시 getDateStrByKoreanFormat 함수가 6번이나 호출되는 버그 발생.
  const dateStrInKorean = useMemo(() => {
    return dateTools.getDateStrByKoreanFormat(targetDate);
  }, [targetDate]);

  return (
    <List style={{ width: "60%" }} hover>
      <ListItemOfTitle currentDate={dateStrInKorean} />
      <ListItemOfField justify="space-around" colspan={fieldColSpan}/>
      <ListItemOfData jsonData={jsonData} listColSpan={listColSpan} />
      <ListItemOfPagination 
        justify="center"
        jsonData={jsonData}
        onChangePageCallback={(page) => fetchData(targetDate, page)}
        currentPageNo={currentPageNo}
      />
    </List>
  );
};

export default ReservationListBySuite;
