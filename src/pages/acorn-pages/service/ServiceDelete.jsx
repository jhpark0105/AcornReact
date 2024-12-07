// components/DeleteConfirmationModal.js
import React from 'react';
import '../../../styles/modal.css';

/**
 * 삭제 확인 모달
 * @param {object} selectedService - 삭제할 서비스의 데이터 객체
 * @param {function} handleDelete - 삭제 버튼 선택 시 실행되는 함수
 * @param {function} setShowDeleteModal - 모달 상태를 변경하는 함수 (열기/닫기)
 */
function DeleteConfirmationModal({ selectedService, handleDelete, setShowDeleteModal }) {
  return (
    <div
      className="modal show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">삭제 확인</h5>
            {/* 모달을 닫기 위해 setShowDeleteModal(false)을 호출 */}
            <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
          </div>

          <div className="modal-body">
            <p>정말로 {selectedService.serviceName} 서비스를 삭제하시겠습니까?</p>
          </div>

          <div className="modal-footer">
            {/* 모달을 닫고 취소하는 버튼 */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowDeleteModal(false)} // 모달 닫기
            >
              취소
            </button>
            {/* 삭제 버튼 선택 시 handleDelete 함수 호출 */}
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
