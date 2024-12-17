import React from 'react';
import '../../../styles/modal.css';
/**
 * 서비스 상세  & 수정 모달
 * @param {boolean} isEditing - 편집 모드 여부
 * @param {object} selectedService - 선택된 서비스 데이터
 * @param {function} handleDetailChange - 서비스 상세 정보 변경 함수
 * @param {function} handleSave - 서비스 저장 함수
 * @param {function} handleEdit - 수정 모드로 전환하는 함수
 * @param {function} setShowDetailModal - 모달 상태 변경 함수 (열기/닫기)
 * @param {function} setShowDeleteModal - 삭제 확인 모달 상태 변경 함수
 */

function ServiceDetailModal({
                              isEditing,
                              selectedService,
                              handleDetailChange,
                              handleSave,
                              handleEdit,
                              setShowDetailModal,
                              setShowDeleteModal
                            }) {
  return (
    <div className="modal show" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEditing ? "서비스 수정" : "서비스 상세"}</h5>
            <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)}></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label>서비스 코드</label>
                <input
                  type="text"
                  name="serviceCode"
                  value={selectedService.serviceCode}
                  onChange={handleDetailChange}
                  readOnly
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>서비스 명</label>
                <input
                  type="text"
                  name="serviceName"
                  value={selectedService.serviceName}
                  onChange={handleDetailChange}
                  disabled={!isEditing}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>서비스 금액</label>
                <input
                  type="number"
                  name="servicePrice"
                  value={selectedService.servicePrice}
                  onChange={handleDetailChange}
                  disabled={!isEditing} // 편집 모드가 아니면 비활성화
                  className="form-control"
                />
              </div>
            </form>
          </div>

          <div className="modal-footer"> {/* 편집 모드 여부에 따라 버튼 구성 */}
            <button type="button" className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>
              닫기
            </button>
            {isEditing ? ( // 편집 모드일 때만 표시
              <button type="button" className="btn btn-success" onClick={handleSave}>
                저장
              </button>
            ) : (
              <>
                {/* 편집 모드가 아닐 때만 표시 */}
                <button type="button" className="btn btn-warning" onClick={handleEdit}>
                  수정
                </button>
                <button type="button" className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>
                  삭제
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetailModal;

