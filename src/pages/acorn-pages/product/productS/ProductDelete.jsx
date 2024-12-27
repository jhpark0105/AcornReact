import React from 'react';

/**
 * 상품 삭제 확인 모달 컴포넌트
 * @param {object} selectedProduct - 삭제할 상품의 정보
 * @param {function} handleDelete - 삭제 버튼 클릭 시 실행되는 함수
 * @param {function} setShowDeleteModal - 모달의 열기/닫기 상태를 변경하는 함수
 */

function DeleteConfirmationModal({ selectedProduct, handleDelete, setShowDeleteModal }) {
  return (
    <div
      className="modal show"
      style={{
        display: 'flex',
        alignItems: 'center', // 세로 중앙 정렬
        justifyContent: 'center', // 가로 중앙 정렬
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
        position: 'fixed', // 화면에 고정
        inset: '0', // 화면 전체를 덮도록 설정
        zIndex: 1050, // 모달이 다른 요소 위에 표시되도록 설정
      }}
      tabIndex="-1"
    >
      <div
        className="modal-dialog"
        style={{
          maxWidth: '400px', // 최대 너비 설정
          width: '90%', // 화면 크기에 따라 동적으로 너비 조정
          margin: 'auto', // 중앙 정렬
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">삭제 확인</h5>

            {/* 모달 닫기 버튼 */}
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowDeleteModal(false)}
            ></button>
          </div>

          <div
            className="modal-body"
            style={{
              textAlign: 'center', // 텍스트 중앙 정렬
              padding: '20px', // 내부 여백 추가
            }}
          >
            {/* 삭제할 상품에 대한 경고 메시지 */}
            <p>정말로 '{selectedProduct.productName}' 상품을 삭제하시겠습니까?</p>
          </div>

          <div
            className="modal-footer"
            style={{
              display: 'flex', // 버튼 정렬
              justifyContent: 'center', // 버튼을 중앙에 정렬
              gap: '10px', // 버튼 간격 설정
            }}
          >
            {/* 취소 버튼 */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              취소
            </button>
            {/* 삭제 버튼 */}
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;