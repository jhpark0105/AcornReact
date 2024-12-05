import React from 'react';

function ProductBModal({ handleChange, handleInsertB, setShowModal }) {
    return (
        <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">대분류 등록</h5>
                        
                        {/* onClick={() => setShowModal(true)} : 등록 모달 열기 */}
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>    
                    </div>

                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label>대분류 코드</label>
                                <input type="text" name="productBCode" onChange={handleChange} className="form-control" placeholder="대분류 코드를 입력하세요." />
                            </div>

                            <div className="mb-3">
                                <label>상품명</label>
                                <input type="text" name="productBName" onChange={handleChange} className="form-control" placeholder="대분류 이름을 입력하세요." />
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                            닫기
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleInsertB}>
                            등록
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductBModal;