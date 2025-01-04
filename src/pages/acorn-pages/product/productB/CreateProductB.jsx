import React from 'react';
import '../../../../styles/modal.css';

/**
 * 대분류 등록 모달
 * @param {function} handleChange - 입력값 변경을 처리하는 함수
 * @param {function} handleInsertB - 등록 버튼 선택 시 실행되는 함수
 * @param {function} setShowModal - 모달 상태를 변경하는 함수 (열기/닫기)
 */

function ProductBModal({ handleChange, handleInsertB, setShowModal }) {
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
          maxWidth: '500px', // 최대 너비
          width: '90%', // 화면 크기에 따라 조정
          margin: 'auto', // 중앙 정렬
          overflow: 'hidden', // 넘치는 내용 방지
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">대분류 등록</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>

          <div
            className="modal-body"
            style={{
              maxHeight: '70vh', // 화면 높이의 70%를 넘지 않도록 설정
              overflowY: 'auto', // 높이를 초과할 경우 스크롤 가능
            }}
          >
            <form>
              <div className="mb-3">
                <label>대분류 코드</label>
                <input
                  type="text"
                  name="productBCode"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="대분류 코드를 입력하세요."
                />
              </div>

              <div className="mb-3">
                <label>상품명</label>
                <input
                  type="text"
                  name="productBName"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="대분류 이름을 입력하세요."
                />
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              닫기
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleInsertB}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductBModal;