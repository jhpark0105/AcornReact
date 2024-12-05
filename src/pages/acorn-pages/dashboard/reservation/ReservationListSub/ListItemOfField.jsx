import { List, FlexboxGrid } from "rsuite";
import React from "react";

const ListItemOfField = ({ justify, colspan }) => {
  return (
    <List.Item>
      <FlexboxGrid justify={justify}>
        <FlexboxGrid.Item colspan={colspan}>예약 시간</FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={colspan}>서비스명</FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={colspan}>고객명</FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={colspan}>직원명</FlexboxGrid.Item>
      </FlexboxGrid>
    </List.Item>
  );
};

export default React.memo(ListItemOfField);
