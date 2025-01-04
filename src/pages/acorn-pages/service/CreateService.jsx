import React, { useState } from "react";

/**
 * 서비스 등록 모달
 * @param {function} handleChange - 입력값 변경을 처리하는 함수
 * @param {function} handleInsert - 등록 버튼 선택 시 실행되는 함수
 * @param {function} setShowModal - 모달 상태를 변경하는 함수 (열기/닫기)
 */
function ServiceModal({ handleChange, handleInsert, setShowModal }) {
  const [inputs, setInputs] = useState({
    serviceCode: "",
    serviceName: "",
    servicePrice: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    serviceCode: "",
    serviceName: "",
    servicePrice: "",
  });

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });

    // 입력값 변경 시 에러 메시지 초기화
    setErrorMessages({ ...errorMessages, [name]: "" });

    // 부모 컴포넌트의 핸들러 호출
    handleChange(e);
  };

  // 등록 버튼 클릭 핸들러
  const handleSubmit = () => {
    let hasError = false;
    const newErrorMessages = {
      serviceCode: "",
      serviceName: "",
      servicePrice: "",
    };

    // 입력값 검증
    if (!inputs.serviceCode.trim()) {
      newErrorMessages.serviceCode = "서비스 코드를 입력해주세요.";
      hasError = true;
    }
    if (!inputs.serviceName.trim()) {
      newErrorMessages.serviceName = "서비스 이름을 입력해주세요.";
      hasError = true;
    }
    if (!inputs.servicePrice.trim() || isNaN(inputs.servicePrice)) {
      newErrorMessages.servicePrice = "서비스 금액은 숫자로 입력해주세요.";
      hasError = true;
    }

    // 에러 메시지 상태 업데이트
    setErrorMessages(newErrorMessages);

    // 에러가 있는 경우 등록을 중단
    if (hasError) {
      return;
    }

    // 유효성 검사를 통과한 경우 등록 처리
    handleInsert();
  };

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
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label>서비스 코드</label>
                <input
                  type="text"
                  name="serviceCode"
                  value={inputs.serviceCode}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="서비스 코드를 입력하세요."
                />
                {/* 서비스 코드 오류 메시지 */}
                {errorMessages.serviceCode && (
                  <p style={{ color: "red", marginTop: "5px" }}>
                    {errorMessages.serviceCode}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label>서비스 명</label>
                <input
                  type="text"
                  name="serviceName"
                  value={inputs.serviceName}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="서비스 이름을 입력하세요."
                />
                {/* 서비스 이름 오류 메시지 */}
                {errorMessages.serviceName && (
                  <p style={{ color: "red", marginTop: "5px" }}>
                    {errorMessages.serviceName}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label>서비스 금액</label>
                <input
                  type="text"
                  name="servicePrice"
                  value={inputs.servicePrice}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="서비스 금액을 입력하세요."
                />
                {/* 서비스 금액 오류 메시지 */}
                {errorMessages.servicePrice && (
                  <p style={{ color: "red", marginTop: "5px" }}>
                    {errorMessages.servicePrice}
                  </p>
                )}
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
              onClick={handleSubmit} // 등록 버튼 클릭 시 유효성 검사 후 실행
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