import React from 'react';
import '../../../styles/modal.css';

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
            <h5 className="modal-title">서비스 상세</h5>
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
                  disabled={!isEditing}
                  className="form-control"
                />
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>
              닫기
            </button>
            {isEditing ? (
              <button type="button" className="btn btn-success" onClick={handleSave}>
                저장
              </button>
            ) : (
              <>
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
