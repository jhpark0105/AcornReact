import { List } from 'rsuite';
import React from 'react';

const ListItemOfTitle = ({currentDate}) => {
  return (
    <List.Item>
      <h5 style={{ textAlign: "center" }}>
        {currentDate} 예약 현황
      </h5>
    </List.Item>
  );
};

export default React.memo(ListItemOfTitle);
