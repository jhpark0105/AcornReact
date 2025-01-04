import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Button, TextField } from "@mui/material";
import DatePickerComponent from "./Picker/DatePicker.jsx";
import SelectPicker from "./Picker/SelectPicker.jsx";
import "../../../styles/modal.css";

const AttendanceDetailModal = ({
																 existingData,
																 handleDetailChange,
																 handleSave,
																 handleUpdate,
																 setShowDetailModal,
																 updating,
															 }) => {

	// 수정 버튼과 저장 버튼 관리
	const [showSaveButton, setShowSaveButton] = useState(false);

	// 날짜 값 설정
	const attendanceDate = existingData.attendanceDate
		? new Date(existingData.attendanceDate)
		: "";

	//console.log(attendanceDate);

	return (
		<div className="modal show">
			<div className="modal-dialog">
				<div className="modal-content">
					{/* 모달 헤더 */}
					<div className="modal-header">
						<h5 className="modal-title">{updating ? "근태 수정" : "근태 상세"}</h5>
						<button
							type="button"
							className="btn-close"
							onClick={() => setShowDetailModal(false)}
						></button>
					</div>

					{/* 모달 본문 */}
					<div className="modal-body">
						<form>
							{/* 직원 이름 */}
							<div className="mb-3">
								<label>직원 이름</label>
								<TextField
									fullWidth
									name="memberName"
									value={existingData.memberName || ""}
									onChange={handleDetailChange}
									disabled={!updating} // 수정 모드에서만 활성화
								/>
							</div>

							{/* 날짜 */}
							<div className="mb-3">
								<label>날짜</label>
								<DatePickerComponent
									value={attendanceDate}
									handleDate={(date) =>
										handleDetailChange({
											target: { name: "attendanceDate", value: date.toISOString().split("T")[0] },
										})
									}
									readOnly={!updating} // 수정 모드에서만 활성화
									style={{ width: 600 }}
								/>
							</div>

							{/* 출근 시간 */}
							<div className="mb-3">
								<label>출근 시간</label>
								<TextField
									fullWidth
									type="time"
									name="checkIn"
									value={existingData.checkIn || ""}
									onChange={handleDetailChange}
									disabled={!updating} // 수정 모드에서만 활성화
								/>
							</div>

							{/* 퇴근 시간 */}
							<div className="mb-3">
								<label>퇴근 시간</label>
								<TextField
									fullWidth
									type="time"
									name="checkOut"
									value={existingData.checkOut || ""}
									onChange={handleDetailChange}
									disabled={!updating} // 수정 모드에서만 활성화
								/>
							</div>

							{/* 상태 */}
							<div className="mb-3">
								<label>상태</label>
								<SelectPicker
									options={[
										{ label: "출근", value: "출근" },
										{ label: "퇴근", value: "퇴근" },
									]}
									value={existingData.attendanceStatus || ""}
									onChange={(value) =>
										handleDetailChange({
											target: { name: "attendanceStatus", value },
										})
									}
									disabled={!updating} // 수정 모드에서만 활성화
								/>
							</div>
						</form>
					</div>

					{/* 모달 푸터 */}
					<div className="modal-footer">
						<Button
							variant="outlined"
							onClick={() => setShowDetailModal(false)}
						>
							닫기
						</Button>
						{!showSaveButton && (
							<Button
								variant="contained"
								color="warning"
								onClick={() => {
									handleUpdate(); // 수정 모드 활성화
									setShowSaveButton(true); // 저장 버튼 표시
								}}
								style={{ marginRight: "8px" }}
							>
								수정
							</Button>
						)}
						{showSaveButton && (
							<Button
								variant="contained"
								color="primary"
								onClick={() => {
									handleSave(); // 저장 수행
									setShowSaveButton(false); // 저장 버튼 숨기기
								}}
							>
								저장
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

AttendanceDetailModal.propTypes = {
	existingData: PropTypes.object.isRequired,
	handleDetailChange: PropTypes.func.isRequired,
	handleSave: PropTypes.func.isRequired,
	handleUpdate: PropTypes.func.isRequired,
	setShowDetailModal: PropTypes.func.isRequired,
	updating: PropTypes.bool.isRequired,
};

export default AttendanceDetailModal;
