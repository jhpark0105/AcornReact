import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  TableBody,
  TableHead,
  Paper,
  TableContainer,
  Table,
  Pagination,
  Box
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import * as dateTools from '../../../../libs/dateTools';
import { isEmptyObject } from '../../../../libs/jsonTools';

// reservationListSub 폴더명이어야 함. git 테스트
import ReservationTitle from "./reservationListSub/ReservationTitle";
import ReservationData from "./reservationListSub/ReservationData";

const ReservationTable = () => {
  const CELL_ALIGN = "center";

  // 캘린더에서의 사용자 선택 날짜를 redux store로부터 가져와 작업
  const targetDate = useSelector((state) => state.resource.selectedDate);

  const [jsonData, setJsonData] = useState({}); // axios fetch로 가져온 데이터 저장.
  const [currentPageNo, setCurrentPageNo] = useState(1); // 현재 페이지 번호 저장.
  const [prevDate, setPrevDate] = useState(""); // 바로 이전에 선택한 날짜 저장. 중복 페이지 요청 방지용.

  const fetchData = (targetDateParam, pageNo = 1) => {
    // 똑같은 페이지 요청 방지.
    if (targetDateParam === prevDate && pageNo === currentPageNo) return;
    axios
      .get(
        `http://localhost:8080/dashboard/reservations/date/${targetDateParam}?pageNo=${pageNo}`
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

  // 첫 렌더링 시에도 오늘 날짜의 예약현황을 볼 수 있도록 AJAX 요청을 함.
  useEffect(() => {
    fetchData(targetDate);
  }, [targetDate]);

  // useMemo 미사용 시 getDateStrByKoreanFormat 함수가 6번이나 호출되는 버그 발생.
  const dateStrInKorean = useMemo(() => {
    return dateTools.getDateStrByKoreanFormat(targetDate);
  }, [targetDate]);

  return (
    <Card>
      <CardHeader title={`${dateStrInKorean} 예약현황`} style={{textAlign: 'center'}}  />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: '30em' }} aria-label="simple table">
          <TableHead>
            <ReservationTitle />
          </TableHead>
          <TableBody>
            <ReservationData jsonData={jsonData} align={CELL_ALIGN} />
          </TableBody>
        </Table>
      </TableContainer>
      <Box style={{
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'center',
        margin: '1em auto'
      }}>
        <Pagination
          count={
            !isEmptyObject(jsonData) ? jsonData.data.pages.page.totalPages : 0
          }
          siblingCount={
            !isEmptyObject(jsonData) ? jsonData.data.pages.page.size : 0
          }
          showFirstButton
          showLastButton
          variant="outlined"
          color="primary"
          onChange={(event, page) => fetchData(targetDate, page)}
        />
      </Box>
    </Card>
  );
};

export default ReservationTable;
