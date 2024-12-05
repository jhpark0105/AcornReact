import React, { useEffect, useState } from 'react';

function ReservationModal({ handleChange, handleInsert, setShowModal }) {
  const [services, setServices] = useState([]); // 서비스 목록 상태
  const [members, setMembers] = useState([]); // 담당 직원 목록 상태
  const [customers, setCustomers] = useState([]); // 예약자 목록 상태

    // 선택된 예약 정보를 관리하는 상태
    const [selectedReservation, setSelectedReservation] = useState({
      serviceName: '',
      customerName: '',
      memberName: '',
      reservationDate: '',
      reservationTime: '',
      reservationComm: '',
    });


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

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setSelectedReservation((prev) => ({
      ...prev,
      [name]: value,
    }));
    handleChange(e); // 부모로 값 전달
  };

  return (
    <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">예약 등록</h5>
            {/* onClick={() => setShowModal(true)} : 등록 모달 열기 */}
            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
          </div>

          <div className="modal-body">
            <form>
              {/* 서비스명 select */}
              <div className="mb-3">
                <label>서비스 명</label>
                <select
                    name="serviceName"
                    value={selectedReservation.serviceName}
                    onChange={handleFieldChange}
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
                      value={selectedReservation.customerName}
                      onChange={handleFieldChange}
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
                      value={selectedReservation.memberName}
                      onChange={handleFieldChange}
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
                      value={selectedReservation.reservationDate}
                      onChange={handleFieldChange}
                      className="form-control"
                      min={new Date().toLocaleDateString("en-CA")} // 오늘 날짜로 최소값 설정
                  />
              </div>
              <div className="mb-3">
                  <label>예약 시간</label>
                  <input
                      type="time"
                      name="reservationTime"
                      value={selectedReservation.reservationTime}
                      onChange={handleFieldChange}
                      className="form-control"
                  />
              </div>
              <div className="mb-3">
                  <label>특이사항</label>
                  <input
                      type="text"
                      name="reservationComm"
                      value={selectedReservation.reservationComm}
                      onChange={handleFieldChange}
                      className="form-control"
                  />
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
              닫기
            </button>
            <button type="button" className="btn btn-primary" onClick={handleInsert}>
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReservationModal;