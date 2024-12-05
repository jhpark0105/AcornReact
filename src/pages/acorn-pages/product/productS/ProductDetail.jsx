function ProductDetailModal({ isEditing, selectedProduct, handleDetailChange, handleSave, handleEdit, setShowDetailModal, setShowDeleteModal }) {
    return (
      <div
        className="modal show"
        style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">상품 상세</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowDetailModal(false)}
              ></button>
            </div>
  
            <div className="modal-body">
              <form>
                {/* <div className="mb-3">
                  <label>대분류</label>
                  <input
                    type="text"
                    name="productBName"
                    value={selectedProduct.productBName}
                    readOnly
                    className="form-control"
                  />
                </div> */}
  
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
  
  export default ProductDetailModal;