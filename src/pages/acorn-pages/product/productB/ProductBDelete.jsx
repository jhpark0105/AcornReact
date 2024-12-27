import React from 'react';

function DeleteConfirmationModal({ selectedProductB, handleDeleteB, setShowDeleteBModal }) {
  return (
    <div
      className="modal show"
      style={{
        display: 'flex',
        alignItems: 'center', // 세로 중앙 정렬
        justifyContent: 'center', // 가로 중앙 정렬
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
        position: 'fixed', // 화면 고정
        inset: '0', // top, right, bottom, left 단축 속성
        zIndex: 1050, // 모달이 다른 요소 위에 표시되도록 설정
      }}
      tabIndex="-1"
    >
      <div
        className="modal-dialog"
        style={{
          maxWidth: '400px', // 최대 너비
          width: '90%', // 화면 크기에 따라 조정
          margin: 'auto', // 중앙 정렬
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            {/* 모달 제목: 삭제 확인 */}
            <h5 className="modal-title">삭제 확인</h5>

            {/* 모달을 닫는 버튼 */}
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowDeleteBModal(false)}
            ></button>
          </div>

          <div
            className="modal-body"
            style={{
              textAlign: 'center', // 텍스트 중앙 정렬
              padding: '20px', // 내부 여백 추가
            }}
          >
            {/* 삭제할 항목의 이름을 포함한 확인 메시지 */}
            <p>정말로 '{selectedProductB.productBName}'을 삭제하시겠습니까?</p>
          </div>

          <div className="modal-footer" style={{ justifyContent: 'center' }}>
            {/* 취소 버튼: 모달을 닫고 삭제를 취소 */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowDeleteBModal(false)}
              style={{ marginRight: '10px' }}
            >
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