import React from 'react';

/**
 * 상품 삭제 확인 모달 컴포넌트
 * (JSDoc 주석. 자바스크립트 코드에서 함수, 변수, 매개변수, 클래스 등의 설명을 추가하기 위해 사용)
 * @param {object} selectedProduct - 삭제할 상품의 정보
 * @param {function} handleDelete - 삭제 버튼 클릭 시 실행되는 함수
 * @param {function} setShowDeleteModal - 모달의 열기/닫기 상태를 변경하는 함수
 */

function DeleteConfirmationModal({ selectedProduct, handleDelete, setShowDeleteModal }) {
  return (
    <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">삭제 확인</h5>

            {/* 모달 닫기 버튼 */}
            <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
          </div>

          <div className="modal-body">
            {/* 삭제할 상품에 대한 경고 메시지 */}
            <p>정말로 '{selectedProduct.productName}' 상품을 삭제하시겠습니까?</p>
          </div>

          <div className="modal-footer">
            {/* 취소 버튼: 모달을 닫고 삭제를 취소 */}
            <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
              취소
            </button>
            {/* 삭제 버튼: 실제 삭제를 처리하는 함수 호출 */}
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