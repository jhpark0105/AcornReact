import React from 'react';

function ProductBDetailModal({ selectedProductB, setShowDetailBModal, setShowDeleteBModal }) {
    return (
        <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">대분류 상세</h5>
                        
                        <button type="button" className="btn-close" onClick={() => setShowDetailBModal(false)}></button>
                    </div>

                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label>대분류 코드</label>
                                <input type="text" name="productBCode" value={selectedProductB.productBCode} readOnly className="form-control" />
                            </div>

                            <div className="mb-3">
                                <label>상품명</label>
                                <input type="text" name="productBName" value={selectedProductB.productBName} readOnly className="form-control" />
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowDetailBModal(false)}>
                            닫기
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => setShowDeleteBModal(true)}>
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductBDetailModal;