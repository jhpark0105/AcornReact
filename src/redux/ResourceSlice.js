import { createSlice } from "@reduxjs/toolkit";
import * as dateTools from '../libs/dateTools'

const ResourceSlice = createSlice({
    name: "resource",
    initialState: {
        // 현재 날짜로 초기화. yyyy-mm-dd 형태
        //selectedDate: new Date().toISOString().split("T")[0],
        selectedDate: dateTools.getDateStringByYYYYMMDD(new Date()),
        //selectedDate: '2024-10-24',  // 테스트용
    },
    reducers: {
        // 사용자가 클릭한 새 날짜를 state에 저장.
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload.selectedDate;
        },
    },
});

// export actions
export const {setSelectedDate} = ResourceSlice.actions;

// export reducer
export default ResourceSlice.reducer;