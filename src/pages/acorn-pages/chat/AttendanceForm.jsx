import React, { useState } from "react";
import axios from "axios";

const AttendanceForm = ({ existingData, refreshTable }) => {
  const [formData, setFormData] = useState(
    existingData || {
      attendanceDate: "",
      checkIn: "",
      checkOut: "",
      attendanceStatus: "",
      memberId: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const api = existingData ? "/api/attendance/update" : "/api/attendance/add";

    axios.post(api, formData)
      .then(() => {
        alert(existingData ? "근태 수정 완료" : "근태 추가 완료");
        refreshTable();
      })
      .catch((error) => {
        console.error("Error saving attendance:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        날짜:
        <input
          type="date"
          name="attendanceDate"
          value={formData.attendanceDate}
          onChange={handleChange}
        />
      </label>
      <label>
        출근 시간:
        <input
          type="time"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
        />
      </label>
      <label>
        퇴근 시간:
        <input
          type="time"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
        />
      </label>
      <label>
        상태:
        <input
          type="text"
          name="attendanceStatus"
          value={formData.attendanceStatus}
          onChange={handleChange}
        />
      </label>
      <label>
        직원 ID:
        <input
          type="text"
          name="memberId"
          value={formData.memberId}
          onChange={handleChange}
        />
      </label>
      <button type="submit">저장</button>
    </form>
  );
};

export default AttendanceForm;
