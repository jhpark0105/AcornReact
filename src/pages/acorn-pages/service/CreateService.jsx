import React from 'react';

function ServiceModal({ handleChange, handleInsert, setShowModal }) {
  return (
    <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">서비스 등록</h5>
            {/* onClick={() => setShowModal(true)} : 등록 모달 열기 */}
            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label>서비스 코드</label>
                <input type="text" name="serviceCode" onChange={handleChange}
                  className="form-control" placeholder="서비스 코드를 입력하세요." />
              </div>

              <div className="mb-3">
                <label>서비스 명</label>
                <input type="text" name="serviceName" onChange={handleChange}
                  className="form-control" placeholder="서비스 이름을 입력하세요." />
              </div>

              <div className="mb-3">
                <label>서비스 금액</label>
                <input type="number" name="servicePrice" onChange={handleChange}
                  className="form-control" placeholder="서비스 금액을 입력하세요." />
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
              닫기
            </button>
            <button type="button" className="btn btn-primary" onClick={handleInsert}>
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceModal;
