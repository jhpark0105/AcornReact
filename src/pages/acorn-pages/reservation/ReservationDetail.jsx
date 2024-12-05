
import React, { useEffect, useState } from 'react';

function ReservationDetail({ isEditing, selectedReservation, handleDetailChange, handleSave, handleEdit, setShowDetailModal, setShowDeleteModal }) {
    const [services, setServices] = useState([]); // 서비스 목록 상태
    const [members, setMembers] = useState([]); // 담당 직원 목록 상태
    const [customers, setCustomers] = useState([]); // 예약자 목록 상태

    // 서비스, 담당 직원, 예약자 목록을 DB에서 가져오는 useEffect
    useEffect(() => {
        fetch('http://localhost:8080/reservation/service')
            .then(response => response.json())
            .then(data => {
                console.log("Services:", data);  // 서비스 데이터 확인
                setServices(data);
            })
            .catch(err => console.error("Error fetching services:", err));
    
        fetch('http://localhost:8080/reservation/member')
            .then(response => response.json())
            .then(data => {
                console.log("Members:", data);  // 직원 데이터 확인
                setMembers(data);
            })
            .catch(err => console.error("Error fetching members:", err));
    
        fetch('http://localhost:8080/reservation/customer')
            .then(response => response.json())
            .then(data => {
                console.log("Customers:", data);  // 고객 데이터 확인
                setCustomers(data);
            })
            .catch(err => console.error("Error fetching customers:", err));
    }, []);

    // selectedReservation이 비어있지 않다면 기본값 설정
    const initializeSelectedReservation = selectedReservation || {
        reservationNo: '',
        service: { serviceName: '' },
        customer: { customerName: '' },
        member: { memberName: '' },
        reservationDate: '',
        reservationTime: '',
        reservationComm: '',
    };

    return (
        <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">예약 상세</h5>
                        <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)}></button>
                    </div>

                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label>예약 번호</label>
                                <input
                                    type="text"
                                    name="reservationNo"
                                    value={initializeSelectedReservation.reservationNo}
                                    onChange={handleDetailChange}
                                    readOnly
                                    className="form-control"
                                />
                            </div>

                            {/* 서비스명 select */}
                            <div className="mb-3">
                                <label>서비스 명</label>
                                <select
                                    name="serviceName"
                                    value={initializeSelectedReservation.service.serviceName}
                                    onChange={handleDetailChange}
                                    disabled={!isEditing}
                                    className="form-control"
                                >
                                    {Array.isArray(services) && services.map((service) => (
                                        <option key={service.serviceId} value={service.serviceName}>
                                            {service.serviceName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* 예약자 select */}
                            <div className="mb-3">
                                <label>예약자</label>
                                <select
                                    name="customerName"
                                    value={initializeSelectedReservation.customer.customerName}
                                    onChange={handleDetailChange}
                                    disabled={!isEditing}
                                    className="form-control"
                                >
                                    {Array.isArray(customers) && customers.map((customer) => (
                                        <option key={customer.customerId} value={customer.customerName}>
                                            {customer.customerName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* 담당 직원 select */}
                            <div className="mb-3">
                                <label>담당 직원</label>
                                <select
                                    name="memberName"
                                    value={initializeSelectedReservation.member.memberName}
                                    onChange={handleDetailChange}
                                    disabled={!isEditing}
                                    className="form-control"
                                >
                                    {Array.isArray(members) && members.map((member) => (
                                        <option key={member.memberId} value={member.memberName}>
                                            {member.memberName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label>예약 날짜</label>
                                <input
                                    type="date"
                                    name="reservationDate"
                                    value={initializeSelectedReservation.reservationDate}
                                    onChange={handleDetailChange}
                                    disabled={!isEditing}
                                    className="form-control"
                                    min={new Date().toLocaleDateString("en-CA")} // 오늘 날짜로 최소값 설정
                                />
                            </div>
                            <div className="mb-3">
                                <label>예약 시간</label>
                                <input
                                    type="time"
                                    name="reservationTime"
                                    value={initializeSelectedReservation.reservationTime}
                                    onChange={handleDetailChange}
                                    disabled={!isEditing}
                                    className="form-control"
                                    
                                />
                            </div>
                            <div className="mb-3">
                                <label>특이사항</label>
                                <input
                                    type="text"
                                    name="reservationComm"
                                    value={initializeSelectedReservation.reservationComm}
                                    onChange={handleDetailChange}
                                    disabled={!isEditing}
                                    className="form-control"
                                />
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>
                            닫기
                        </button>
                        {isEditing ? (
                            <button type="button" className="btn btn-success" onClick={handleSave}>
                                저장
                            </button>
                        ) : (
                            <>
                                <button type="button" className="btn btn-warning" onClick={handleEdit}>
                                    수정
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>
                                    삭제
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReservationDetail;