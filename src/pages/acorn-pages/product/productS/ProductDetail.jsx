import '../../../../styles/modal.css';

/**
 * 상품 상세 모달 컴포넌트
 */
function ProductDetailModal({
  isEditing,
  selectedProduct,
  handleDetailChange,
  handleSave,
  handleEdit,
  setShowDetailModal,
  setShowDeleteModal,
}) {
  return (
    <div
      className="modal show"
      style={{
        display: 'flex',
        alignItems: 'center', // 세로 중앙 정렬
        justifyContent: 'center', // 가로 중앙 정렬
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
        position: 'fixed',
        inset: '0', // top, right, bottom, left 단축 속성
        zIndex: 1050,
      }}
      tabIndex="-1"
    >
      <div
        className="modal-dialog"
        style={{
          maxWidth: '600px', // 최대 너비
          width: '90%', // 화면이 작을 경우 너비 조정
          margin: 'auto', // 중앙 정렬
          overflow: 'hidden', // 넘치는 내용 방지
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isEditing ? '상품 수정' : '상품 상세'}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowDetailModal(false)}
            ></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label>대분류</label>
                <input
                  type="text"
                  name="productBName"
                  value={selectedProduct.product_b.productBName}
                  readOnly
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>상품 코드</label>
                <input
                  type="text"
                  name="productCode"
                  value={selectedProduct.productCode}
                  onChange={handleDetailChange}
                  readOnly
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>상품 명</label>
                <input
                  type="text"
                  name="productName"
                  value={selectedProduct.productName}
                  onChange={handleDetailChange}
                  disabled={!isEditing}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>상품 금액</label>
                <input
                  type="number"
                  name="productPrice"
                  value={selectedProduct.productPrice}
                  onChange={handleDetailChange}
                  disabled={!isEditing}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>상품 수량</label>
                <input
                  type="number"
                  name="productEa"
                  value={selectedProduct.productEa}
                  onChange={handleDetailChange}
                  disabled={!isEditing}
                  className="form-control"
                />
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowDetailModal(false)}
            >
              닫기
            </button>
            {isEditing ? (
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSave}
              >
                저장
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={handleEdit}
                >
                  수정
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setShowDeleteModal(true)}
                >
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