import '../../../styles/modal.css';
import React from 'react';

function ReservationCancel({ selectedReservation, handleCancel, setShowCancelModal }) {
	return (
		<div className="modal show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">취소 확인</h5>
						<button type="button" className="btn-close" onClick={() => setShowCancelModal(false)}></button>
					</div>

					<div className="modal-body">
						<p>정말 예약을 취소하시겠습니까?</p>
					</div>

					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" onClick={() => setShowCancelModal(false)}>
							뒤로
						</button>
						<button type="button" className="btn btn-danger" onClick={handleCancel}>
							취소
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ReservationCancel;
