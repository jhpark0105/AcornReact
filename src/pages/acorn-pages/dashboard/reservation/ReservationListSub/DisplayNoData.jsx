import { List, FlexboxGrid } from "rsuite";
import React from "react";

const DisplayNoData = () => {
    return (
      <List.Item>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item>
            현재 날짜에서 조회된 예약현황이 없습니다.
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </List.Item>
    );
};

export default React.memo(DisplayNoData);