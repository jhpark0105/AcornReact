import '../../../styles/modal.css';
import React, { useEffect, useState } from 'react';
import CustomSelect from './Picker/CustomSelect';

function ReservationDetail({
    isEditing,
    selectedReservation = {}, // 초기값 설정
    handleDetailChange,
    handleSave,
    handleEdit,
    handleFinish,
    setShowDetailModal,
    setShowDeleteModal,
}) {
    const [services, setServices] = useState([]);
    const [members, setMembers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [reservation, setReservation] = useState({
        reservationNo: '',
        service: { serviceName: '' },
        customer: { customerName: '' },
        member: { memberName: '' },
        reservationDate: '',
        reservationTime: '',
        reservationComm: '',
        ...selectedReservation, // 부모로부터 받은 초기 예약 데이터를 병합
    });

    useEffect(() => {
        // 서비스 데이터 가져오기
        fetch('http://localhost:8080/reservation/service')
            .then((response) => response.json())
            .then((data) => setServices(data))
            .catch((err) => console.error('Error fetching services:', err));

        // 담당 직원 데이터 가져오기
        fetch('http://localhost:8080/reservation/member')
            .then((response) => response.json())
            .then((data) => setMembers(data))
            .catch((err) => console.error('Error fetching members:', err));

        // 예약자 데이터 가져오기
        fetch('http://localhost:8080/reservation/customer')
            .then((response) => response.json())
            .then((data) => setCustomers(data))
            .catch((err) => console.error('Error fetching customers:', err));
    }, []);

    // 입력 필드 값 변경 시 호출되는 함수
    const handleFieldChange = (name, value) => {
        setReservation((prev) => ({
            ...prev,
            [name]: value,
        }));
        // 부모 컴포넌트로 값 변경 알림
        handleDetailChange({ target: { name, value } });
    };

    return (
        <div
            className="modal show"
            style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            tabIndex="-1"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {/* <h5 className="modal-title">예약 상세</h5> */}
                        <h5 className="modal-title">
                            {isEditing ? "예약 수정" : "예약 상세"}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowDetailModal(false)}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <form>
                            {/* 예약 번호 */}
                            <div className="mb-3">
                                <label>예약 번호</label>
                                <input
                                    type="text"
                                    name="reservationNo"
                                    value={reservation.reservationNo}
                                    readOnly
                                    className="form-control"
                                />
                            </div>

                            {/* 서비스명 */}
                            <div className="mb-3">
                                <label>서비스 명</label>
                                {isEditing ? ( // 편집 모드일 경우
                                    <CustomSelect
                                        data={services.map((service) => ({
                                            label: service.serviceName, // 드롭다운 표시값
                                            value: service.serviceName, // 선택 값
                                        }))}
                                        value={reservation.service.serviceName}// 선택된 서비스
                                        onChange={(value) => handleFieldChange('service', { serviceName: value })}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={reservation.service.serviceName}
                                        readOnly
                                        className="form-control"
                                    />
                                )}
                            </div>

                            {/* 예약자 */}
                            <div className="mb-3">
                                <label>예약자</label>
                                {isEditing ? (
                                    <CustomSelect
                                        data={customers.map((customer) => ({
                                            label: customer.customerName,
                                            value: customer.customerName,
                                        }))}
                                        value={reservation.customer.customerName}
                                        onChange={(value) =>
                                            handleFieldChange('customer', { customerName: value })
                                        }
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={reservation.customer.customerName}
                                        readOnly
                                        className="form-control"
                                    />
                                )}
                            </div>

                            {/* 담당 직원 */}
                            <div className="mb-3">
                                <label>담당 직원</label>
                                {isEditing ? (
                                    <CustomSelect
                                        data={members.map((member) => ({
                                            label: member.memberName,
                                            value: member.memberName,
                                        }))}
                                        value={reservation.member.memberName}
                                        onChange={(value) =>
                                            handleFieldChange('member', { memberName: value })
                                        }
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={reservation.member.memberName}
                                        readOnly
                                        className="form-control"
                                    />
                                )}
                            </div>

                            {/* 예약 날짜 */}
                            <div className="mb-3">
                                <label>예약 날짜</label>
                                <input
                                    type="date"
                                    name="reservationDate"
                                    value={reservation.reservationDate}
                                    onChange={(e) =>
                                        handleFieldChange('reservationDate', e.target.value)
                                    }
                                    disabled={!isEditing}
                                    className="form-control"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            {/* 예약 시간 */}
                            <div className="mb-3">
                                <label>예약 시간</label>
                                <input
                                    type="time"
                                    name="reservationTime"
                                    value={reservation.reservationTime}
                                    onChange={(e) =>
                                        handleFieldChange('reservationTime', e.target.value)
                                    }
                                    disabled={!isEditing}
                                    className="form-control"
                                />
                            </div>

                            {/* 특이사항 */}
                            <div className="mb-3">
                                <label>특이사항</label>
                                <input
                                    type="text"
                                    name="reservationComm"
                                    value={reservation.reservationComm}
                                    onChange={(e) =>
                                        handleFieldChange('reservationComm', e.target.value)
                                    }
                                    disabled={!isEditing}
                                    className="form-control"
                                />
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowDetailModal(false)}
                        >
                            닫기
                        </button>
                        {isEditing ? (
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={handleSave}
                            >
                            저장
                            </button>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={handleEdit}
                                >
                                수정
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleFinish}
                                >
                                확정
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleEdit}
                                >
                                취소
                                </button>
                                {/* <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => setShowDeleteModal(true)}
                                >
                                    삭제
                                </button> */}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReservationDetail;
