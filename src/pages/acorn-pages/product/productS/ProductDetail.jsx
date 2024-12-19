import '../../../../styles/modal.css'

/**
 * 상품 상세 모달 컴포넌트
 * (JSDoc 주석. 자바스크립트 코드에서 함수, 변수, 매개변수, 클래스 등의 설명을 추가하기 위해 사용)
 * @param {boolean} isEditing - 수정 모드 여부를 나타내는 상태
 * @param {object} selectedProduct - 선택된 상품의 상세 정보
 * @param {function} handleDetailChange - 입력값 변경을 처리하는 함수
 * @param {function} handleSave - 저장 버튼 클릭 시 호출되는 함수
 * @param {function} handleEdit - 수정 버튼 클릭 시 호출되는 함수
 * @param {function} setShowDetailModal - 모달의 열기/닫기 상태를 관리하는 함수
 * @param {function} setShowDeleteModal - 삭제 확인 모달을 열기 위한 함수
 */

function ProductDetailModal({ isEditing, selectedProduct, handleDetailChange, handleSave, handleEdit, setShowDetailModal, setShowDeleteModal }) {
  return (
    <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isEditing ? "상품 수정" : "상품 상세"}
            </h5>

            {/* 모달 닫기 버튼 */}
            <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)} ></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label>대분류</label>
                <input type="text" name="productBName" value={selectedProduct.product_b.productBName} readOnly className="form-control" />
              </div>

              <div className="mb-3">
                <label>상품 코드</label>
                <input type="text" name="productCode" value={selectedProduct.productCode} onChange={handleDetailChange} readOnly className="form-control" />
              </div>

              <div className="mb-3">
                <label>상품 명</label>
                <input type="text" name="productName" value={selectedProduct.productName} onChange={handleDetailChange} disabled={!isEditing} className="form-control" />
              </div>

              <div className="mb-3">
                <label>상품 금액</label>
                <input type="number" name="productPrice" value={selectedProduct.productPrice} onChange={handleDetailChange} disabled={!isEditing} className="form-control" />
              </div>

              <div className="mb-3">
                <label>상품 수량</label>
                <input type="number" name="productEa" value={selectedProduct.productEa} onChange={handleDetailChange} disabled={!isEditing} className="form-control" />
              </div>
            </form>
          </div>

          <div className="modal-footer">
            {/* 모달 닫기 버튼 */}
            <button type="button" className="btn btn-secondary" onClick={() => setShowDetailModal(false)} >
              닫기
            </button>
            {/* 수정 모드일 때만 저장 버튼 활성화, 수정/삭제 버튼은 수정 모드가 아닐 때만 표시 */}
            {isEditing ? (
              <button type="button" className="btn btn-success" onClick={handleSave}>
                저장
              </button>
            ) : (
              <>
                {/* 수정 버튼 (수정 모드로 전환) */}
                <button type="button" className="btn btn-warning" onClick={handleEdit}>
                  수정
                </button>
                {/* 삭제 버튼 (삭제 확인 모달 열기) */}
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

export default ProductDetailModal;