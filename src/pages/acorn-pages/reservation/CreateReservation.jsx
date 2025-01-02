import React, { useEffect, useState } from 'react';
import CustomSelect from './Picker/CustomSelect';
import TimePickerComponent from './Picker/TimePickerComponent';

function ReservationModal({ handleChange, handleInsert, setShowModal }) {
  const [services, setServices] = useState([]);// 서비스 목록을 상태로 관리
  const [members, setMembers] = useState([]);// 담당 직원 목록을 상태로 관리
  const [customers, setCustomers] = useState([]);// 예약자 목록을 상태로 관리

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
      .then(data => setServices(data))
      .catch(err => console.error('Error fetching services:', err));

    fetch('http://localhost:8080/reservation/member')
      .then(response => response.json())
      .then(data => setMembers(data))
      .catch(err => console.error('Error fetching members:', err));

    fetch('http://localhost:8080/reservation/customer')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(err => console.error('Error fetching customers:', err));
  }, []);

  const handleFieldChange = (name, value) => {
    // 필드 변경 시 상태를 업데이트하는 함수
    setSelectedReservation(prev => ({
      ...prev,// 이전 상태를 유지
      [name]: value, // 변경된 필드 업데이트
    }));
    handleChange({ target: { name, value } }); // 부모로 값 전달
  };

  return (
		<div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">예약 등록</h5>
						<button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
					</div>

					<div className="modal-body">
						<form>
							{/* 서비스명 Select */}
							<div className="mb-3">
								<label>서비스 명</label>
								<CustomSelect
									data={services.map((service) => ({
										label: service.serviceName, // 드롭다운에 표시될 이름
										value: service.serviceName // 선택 시 저장될 값
									}))}
									value={selectedReservation.serviceName} // 선택된 값
									onChange={(value) => handleFieldChange('serviceName', value)}
									placeholder="서비스를 선택하세요"
								/>
							</div>

							{/* 예약자 Select */}
							<div className="mb-3">
								<label>예약자</label>
								<CustomSelect
									data={customers.map((customer) => ({
										label: customer.customerName,
										value: customer.customerName
									}))}
									value={selectedReservation.customerName}
									onChange={(value) => handleFieldChange('customerName', value)}
									placeholder="예약자를 선택하세요"
								/>
							</div>

							{/* 담당 직원 Select */}
							<div className="mb-3">
								<label>담당 직원</label>
								<CustomSelect
									data={members.map((member) => ({
										label: member.memberName,
										value: member.memberName
									}))}
									value={selectedReservation.memberName}
									onChange={(value) => handleFieldChange('memberName', value)}
									placeholder="직원을 선택하세요"
								/>
							</div>

							{/* 예약 날짜 */}
							<div className="mb-3">
								<label>예약 날짜</label>
								<input
									type="date"
									name="reservationDate"
									value={selectedReservation.reservationDate}
									onFocus={(e) => e.target.showPicker()} //클릭 시 달력 표시
									onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
									className="form-control"
									min={new Date().toLocaleDateString('en-CA')} // 최소값: 오늘 날짜
									style={{width: 465}}
								/>
							</div>

							{/* 예약 시간 */}
							<div className="mb-3">
								<label>예약 시간</label>
                <TimePickerComponent
                  value={selectedReservation.reservationTime} // 선택된 예약 시간 전달
                  onChange={(value) => handleFieldChange('reservationTime', value)}
                  isEditing={true} // 항상 편집 가능
                />
							</div>

							{/* 특이사항 */}
							<div className="mb-3">
								<label>특이사항</label>
								<input
									type="text"
									name="reservationComm"
									value={selectedReservation.reservationComm}
									onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
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
