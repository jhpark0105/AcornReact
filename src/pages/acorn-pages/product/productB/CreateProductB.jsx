import React from 'react';
import '../../../../styles/modal.css'

/**
 * 대분류 등록 모달
 * (JSDoc 주석. 자바스크립트 코드에서 함수, 변수, 매개변수, 클래스 등의 설명을 추가하기 위해 사용)
 * @param {function} handleChange - 입력값 변경을 처리하는 함수
 * @param {function} handleInsertB - 등록 버튼 선택 시 실행되는 함수
 * @param {function} setShowModal - 모달 상태를 변경하는 함수 (열기/닫기)
 */

function ProductBModal({ handleChange, handleInsertB, setShowModal }) {
  return (
    <div
      className="modal show"
      // 모달 배경색 설정 및 표시
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      // 모달 외부 클릭 시 포커스 이동을 방지하기 위한 설정
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {/* 모달 제목 */}
            <h5 className="modal-title">대분류 등록</h5>
            {/* 모달을 닫기 위해 setShowModal(false)을 호출 */}
            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
          </div>

          <div className="modal-body">
            {/* 입력 폼 */}
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
            {/* 닫기 버튼: 모달을 닫는 setShowModal 함수 호출 */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              닫기
            </button>
            {/* 등록 버튼: 대분류 등록을 위한 handleInsertB 함수 호출 */}
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