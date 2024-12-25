// project import
import MainCard from 'components/MainCard';
import React, { useState, useEffect } from "react";
import Pagination from "../../../acorn-components/components/Pagination";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import styles from "../../../styles/ListSearch.module.css"; // 스타일
import './ChatPage.css';
function OrderCardList({ orders }) {
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [itemsPerPage, setItemsPerPage] = useState(5); // 한 페이지당 항목 수
  // 데이터를 그룹화
  useEffect(() => {
    const groupByDate = {};
    orders.forEach((order) => {
      const dateKey = `${order.ordersApplyDate}_${order.ordersEndDate}`;  //groupByDate 객체의 키
      if (!groupByDate[dateKey]) {
        groupByDate[dateKey] = []; // 해당 키에 빈 배열을 초기화
      }
      groupByDate[dateKey].push(order);
    });

    // 날짜별로 그룹화된 데이터를 배열로 변환
    const groupedArray = Object.entries(groupByDate).map(([dateKey, records]) => {
      const groupByProductBCode = {};
      records.forEach((record) => {
        const productBCode = record.productDtoFO.productBDto.productBCode;//groupByProductBCode 객체의 키
        if (!groupByProductBCode[productBCode]) {
          groupByProductBCode[productBCode] = [];
        }
        groupByProductBCode[productBCode].push(record);
      });

      // productBCode별로 그룹화된 데이터 배열로 변환
      const subGroups = Object.entries(groupByProductBCode).map(([productBCode, subRecords]) => ({
        productBCode,
        productBName: subRecords[0].productDtoFO.productBDto.productBName,
        records: subRecords,
      }));

      return { dateKey, subGroups };
    });
    setFilteredData(groupedArray); // orders가 변경될 때마다 filteredData 갱신
  }, [orders]);

  // 현재 페이지 데이터 계산
  // 현재 페이지의 마지막 항목의 인덱스(데이터를 페이지별로 나누기 위해 사용) = 현재 페이지 상태 * 한 페이지당 항목 수
  const indexOfLastItem = currentPage * itemsPerPage; 

  // 현재 페이지의 첫 번째 항목의 인덱스(현재 페이지에 표시할 데이터 범위를 지정) = 현재 페이지의 마지막 항목의 인덱스 - 한 페이지당 항목 수
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem); //  데이터 배열에서 현재 페이지에 해당하는 데이터만 추출 -> 추출된 데이터는 현재 페이지에 표시 

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <Box className={styles["card-container"]}>
      {currentItems.length>0 ?
      (currentItems.map((group, index) => (
        <div className='cardDiv'>
        <MainCard key={index} title={`신청일: ${group.dateKey.split("_")[0]} ~ 마감일: ${group.dateKey.split("_")[1]}`}>
          {group.subGroups.map((subGroup, subIndex) => (
            <MainCard
              key={subIndex}
              title={`${subGroup.productBName} (${subGroup.productBCode})`}
            >
              {subGroup.records.map((record, recordIndex) => (
                <div key={recordIndex}>
                  <Typography variant="body2" style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ flex: 0.5}}>[상품코드: {record.productDtoFO.productCode}]</span>&nbsp;
                    <span style={{ flex: 2}}>상품명: {record.productDtoFO.productName}</span>&nbsp;
                    <span style={{ flex: 1}}>상품 가격: {record.productDtoFO.productPrice.toLocaleString()} 원</span>&nbsp;
                    <span style={{ flex: 0.5}}>발주 수량: {record.ordersEa}</span>&nbsp;
                    <span style={{ flex: 1}}>금액: {record.ordersPrice.toLocaleString()} 원</span>
                  </Typography>
                </div>
              ))}
            </MainCard>
          ))}
        </MainCard>
        </div>
      ))) :
      (
        <MainCard>
          <Typography variant="body2">신청한 발주가 없습니다.</Typography>
        </MainCard>
      )
      }
      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
    </Box>
  );
}

OrderCardList.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      ordersEa: PropTypes.number.isRequired,
      ordersPrice: PropTypes.number.isRequired,
      ordersApplyDate: PropTypes.string.isRequired,
      ordersEndDate: PropTypes.string.isRequired,
      productDtoFO: PropTypes.shape({
        productCode: PropTypes.string.isRequired,
        productName: PropTypes.string.isRequired,
        productPrice: PropTypes.number.isRequired,
        productEa: PropTypes.number.isRequired,
        productBDto: PropTypes.shape({
          productBCode: PropTypes.string.isRequired,
          productBName: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default OrderCardList;
