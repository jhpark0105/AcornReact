import React, { useState } from "react";
import AttendanceTable from "./AttendanceTable";
import AttendanceForm from "./AttendanceForm";
import AttendanceActions from "./AttendanceActions";
import "./Tab.css";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="tabs-container">
      {/* 탭 버튼 */}
      <div className="tab-buttons">
        <button
          className={activeTab === "tab1" ? "active" : ""}
          onClick={() => setActiveTab("tab1")}
        >
          근태 기록
        </button>
        <button
          className={activeTab === "tab2" ? "active" : ""}
          onClick={() => setActiveTab("tab2")}
        >
          근태 관리
        </button>
        <button
          className={activeTab === "tab3" ? "active" : ""}
          onClick={() => setActiveTab("tab3")}
        >
          출근/퇴근
        </button>
      </div>

      {/* 탭 내용 */}
      <div className="tab-content">
        {activeTab === "tab1" && (
          <div>

            <AttendanceTable />
          </div>
        )}
        {activeTab === "tab2" && (
          <div>

            <AttendanceForm />
          </div>
        )}
        {activeTab === "tab3" && (
          <div>

            <AttendanceActions />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
