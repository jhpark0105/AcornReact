// components/DeleteConfirmationModal.js
import React from 'react';
import '../../../styles/modal.css';

function DeleteConfirmationModal({ selectedService, handleDelete, setShowDeleteModal }) {
  return (
    <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">삭제 확인</h5>
            <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
          </div>

          <div className="modal-body">
            <p>정말로 {selectedService.serviceName} 서비스를 삭제하시겠습니까?</p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
              취소
            </button>
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
