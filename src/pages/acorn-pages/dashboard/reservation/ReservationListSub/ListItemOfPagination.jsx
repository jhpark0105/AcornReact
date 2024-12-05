import { List, FlexboxGrid, Pagination } from "rsuite";
import { isEmptyObject } from '../../../../../libs/jsonTools';
import React from "react";

const ListItemOfPagination = ({
    justify, 
    jsonData, 
    onChangePageCallback,
    currentPageNo
}) => {

    return (
        <List.Item>
        <FlexboxGrid justify={justify}>
          <FlexboxGrid.Item>
            <Pagination
              prev
              next
              last
              first
              size="md"
              limit={
                !isEmptyObject(jsonData) ? jsonData.data.pages.page.size : 1
              }
              total={
                !isEmptyObject(jsonData)
                  ? jsonData.data.pages.page.totalElements
                  : 1
              }
              onChangePage={onChangePageCallback}
              activePage={currentPageNo}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </List.Item>
    );
};

export default React.memo(ListItemOfPagination);