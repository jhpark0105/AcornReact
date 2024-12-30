import React, { useState } from "react";
import AttendanceTable from "./AttendanceTable.jsx";
import AttendanceForm from "./AttendanceForm.jsx";
import AttendanceActions from './AttendanceActions.jsx';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const refreshTable = () => setRefresh(!refresh);

  return (
    <div>
      <h1>근태 관리 시스템</h1>
      <AttendanceForm refreshTable={refreshTable} />
      <AttendanceTable key={refresh} />
      <AttendanceActions />
    </div>
  );
};

export default App;
