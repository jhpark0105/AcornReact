import React from 'react';
/**
 * 서비스 등록 모달
 * @param {function} handleChange - 입력값 변경을 처리하는 함수
 * @param {function} handleInsert - 등록 버튼 선택 시 실행되는 함수
 * @param {function} setShowModal - 모달 상태를 변경하는 함수 (열기/닫기)
 */
function ServiceModal({ handleChange, handleInsert, setShowModal }) {
  return (
    <div
      className="modal show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">서비스 등록</h5>
            {/* 모달을 닫기 위해 setShowModal(false)을 호출 */}
            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label>서비스 코드</label>
                <input
                  type="text"
                  name="serviceCode"
                  style={{ width: 465}}
                  onChange={handleChange} // 입력값 변경 시 handleChange 함수 호출
                  className="form-control"
                  placeholder="서비스 코드를 입력하세요."
                />
              </div>

              <div className="mb-3">
                <label>서비스 명</label>
                <input
                  type="text"
                  name="serviceName"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="서비스 이름을 입력하세요."
                />
              </div>

              <div className="mb-3">
                <label>서비스 금액</label>
                <input
                  type="number"
                  name="servicePrice"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="서비스 금액을 입력하세요."
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
              onClick={handleInsert} // 등록 버튼 선택 시 handleInsert 함수 호출
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceModal;
