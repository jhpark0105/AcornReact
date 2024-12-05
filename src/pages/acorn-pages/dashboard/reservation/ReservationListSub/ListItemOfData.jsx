import { List, FlexboxGrid } from "rsuite";
import { isEmptyObject } from '../../../../../libs/jsonTools';
import DisplayNoData from "./DisplayNoData";
import React from "react";

/**
 * 실질적으로 데이터를 화면에 보여주는 로직 컴포넌트
 */
const ListItemOfData = ({ jsonData, listColSpan }) => {
  if (!isEmptyObject(jsonData)) {
    if (jsonData.data.pages && jsonData.data.pages.content.length > 0) {
      return jsonData.data.pages.content.map((d) => (
        <List.Item key={d.reservationNo}>
          <FlexboxGrid justify="space-around">
            <FlexboxGrid.Item colspan={listColSpan}>
              {d.reservationTime}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={listColSpan}>
              {d.serviceName}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={listColSpan}>
              {d.customerName}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={listColSpan}>
              {d.memberName}
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </List.Item>
      ));
    }
  }

  return <DisplayNoData />;
};

export default React.memo(ListItemOfData);
