import React from 'react';

function DeleteConfirmationModal({ selectedProductB, handleDeleteB, setShowDeleteBModal }) {
  return (
    <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {/* 모달 제목: 삭제 확인 */}
            <h5 className="modal-title">삭제 확인</h5>

            {/* 모달을 닫는 버튼 */}
            <button type="button" className="btn-close" onClick={() => setShowDeleteBModal(false)}></button>
          </div>

          <div className="modal-body">
            {/* 삭제할 항목의 이름을 포함한 확인 메시지 */}
            <p>정말로 '{selectedProductB.productBName}'을 삭제하시겠습니까?</p>
          </div>

          <div className="modal-footer">
            {/* 취소 버튼: 모달을 닫고 삭제를 취소 */}
            <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteBModal(false)}>
              취소
            </button>
            {/* 삭제 버튼: 삭제를 확정하고 handleDeleteB 함수를 호출 */}
            <button type="button" className="btn btn-danger" onClick={handleDeleteB}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;