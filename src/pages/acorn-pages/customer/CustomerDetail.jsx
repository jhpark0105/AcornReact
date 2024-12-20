import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerComponent from "./Picker/DatePicker";
import 'rsuite/dist/rsuite.min.css';
import SelectPickerComponent from "./Picker/SelectPicker";
import GenderPickerComponent from "./Picker/GenderPicker";
import '../../../styles/modal.css';

export default function CustomerDetail({ selectedCustomer, setShowDetailModal, refresh }) {
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
    const [customer, setCustomer] = useState({ ...selectedCustomer });  // 선택된 고객 정보를 상태로 저장
    const [startDate, setStartDate] = useState(new Date(customer.customerReg));  // 등록일을 상태로 저장

    // 수정 버튼 클릭시 수정 모드 활성화
    const handleEdit = () => {
        setIsEditing(true);
    };

    // 수정 후 저장(수정된 고객 정보를 서버로 전송)
    const handleSave = () => {
        axios.put(`http://localhost:8080/customer/${customer.customerId}`, customer)  // PUT 요청 -> 고객 정보 업데이트
            .then((res) => {
                if (res.status === 200) {
                    toast.success("고객 수정 성공!", {
                        icon: false, // 체크 아이콘 제거
                    });
                    setIsEditing(false);  // 수정 모드 비활성화
                    setShowDetailModal(false);  // 상세 모달 닫기
                    refresh();  // 부모 컴포넌트 데이터 갱신
                } else {
                    toast.error("수정 실패: 서버 오류 발생");
                }
            })
            .catch((error) => {
                console.error("수정 중 오류:", error);
                toast.error("수정 중 오류가 발생했습니다.");
            });
    };

    // 입력된 값 변경시 호출. 상태에 변경된 값 반영
    const handleDetailChange = (value, fieldName) => {
        setCustomer(prevCustomer => ({
            ...prevCustomer,
            [fieldName]: value,
        }));
    };

    // 등록일 변경 시 호출. 날짜를 상태에 반영
    const handleDateChange = (date) => {
        setStartDate(date);
        setCustomer({
            ...customer,
            customerReg: date.toISOString().split('T')[0],
        });
    };

    return (
        <>
            <div
                className="modal show"
                style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
                tabIndex="-1"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {isEditing ? "고객 정보 수정" : "고객 상세 정보"}
                            </h5>
                            <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)}></button>
                        </div>

                        <div className="modal-body">
                            <form>
                                {/* ID */}
                                <div className="mb-3">
                                    <label>ID</label>
                                    <input
                                        type="text"
                                        name="customerId"
                                        className="form-control"
                                        value={customer.customerId}
                                        readOnly
                                    />
                                </div>

                                {/* 이름 */}
                                <div className="mb-3">
                                    <label>이름</label>
                                    <input
                                        type="text"
                                        name="customerName"
                                        className="form-control"
                                        value={customer.customerName}
                                        onChange={(e) => handleDetailChange(e.target.value, "customerName")}
                                        readOnly={!isEditing}
                                    />
                                </div>

                                {/* 성별 */}
                                <div className="mb-3">
                                    <label>성별</label>
                                    {isEditing ? (
                                        <GenderPickerComponent
                                            value={customer.customerGender}
                                            onChange={(value) => handleDetailChange(value, "customerGender")}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={customer.customerGender}
                                            readOnly
                                        />
                                    )}
                                </div>

                                {/* 연락처 */}
                                <div className="mb-3">
                                    <label>연락처</label>
                                    <input
                                        type="text"
                                        name="customerTel"
                                        className="form-control"
                                        value={customer.customerTel}
                                        onChange={(e) => handleDetailChange(e.target.value, "customerTel")}
                                        readOnly={!isEditing}
                                    />
                                </div>

                                {/* 이메일 */}
                                <div className="mb-3">
                                    <label>e-mail</label>
                                    <input
                                        type="text"
                                        name="customerMail"
                                        className="form-control"
                                        value={customer.customerMail}
                                        onChange={(e) => handleDetailChange(e.target.value, "customerMail")}
                                        readOnly={!isEditing}
                                    />
                                </div>

                                {/* 등록일 */}
                                <div className="mb-3">
                                    <label>고객 등록일</label>
                                    <DatePickerComponent
                                        selected={startDate}
                                        onChange={handleDateChange}
                                        disabled={!isEditing} // 수정 모드에서만 날짜 선택 가능
                                    />
                                </div>

                                {/* 등급 */}
                                <div className="mb-3">
                                    <label>고객 등급</label>
                                    {isEditing ? (
                                        <SelectPickerComponent
                                            value={customer.customerRank}
                                            onChange={(value) => handleDetailChange(value, "customerRank")}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={customer.customerRank}
                                            readOnly
                                        />
                                    )}
                                </div>

                                {/* 특이사항 */}
                                <div className="mb-3">
                                    <label>특이사항</label>
                                    <input
                                        type="text"
                                        name="customerNote"
                                        className="form-control"
                                        value={customer.customerNote}
                                        onChange={(e) => handleDetailChange(e.target.value, "customerNote")}
                                        readOnly={!isEditing}
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            {isEditing ? (
                                <>
                                    <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                                        취소
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleSave}>
                                        저장
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowDetailModal(false)}
                                    >
                                        닫기
                                    </button>
                                    <button type="button" className="btn btn-warning" onClick={handleEdit}>
                                        수정
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{ zIndex: 9999 }}
            />
        </>
    );
}
