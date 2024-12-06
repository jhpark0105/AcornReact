import React from 'react';
import '../../../../styles/modal.css'

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
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">대분류 등록</h5>
            {/* 모달을 닫기 위해 setShowModal(false)을 호출 */}
            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label>대분류 코드</label>
                <input
                  type="text"
                  name="productBCode"
                  onChange={handleChange} // 입력값 변경 시 handleChange 함수 호출
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
              onClick={() => setShowModal(false)} // 모달 닫기
            >
              닫기
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleInsertB} // 등록 버튼 선택 시 handleInsertB 함수 호출
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