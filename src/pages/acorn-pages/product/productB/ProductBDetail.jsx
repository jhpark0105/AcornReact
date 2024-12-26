import React from 'react';
import '../../../../styles/modal.css'

/**
 * 대분류 상세 모달
 * (JSDoc 주석. 자바스크립트 코드에서 함수, 변수, 매개변수, 클래스 등의 설명을 추가하기 위해 사용)
 * @param {object} selectedProductB - 선택된 대분류의 데이터
 * @param {function} setShowDetailBModal - 대분류 상세 모달의 상태를 변경하는 함수 (열기/닫기)
 * @param {function} setShowDeleteBModal - 대분류 삭제 모달의 상태를 변경하는 함수 (열기/닫기)
 */

function ProductBDetailModal({ selectedProductB, setShowDetailBModal, setShowDeleteBModal }) {
    return (
        <div className="modal show" style={{
                display: "flex",
                alignItems: "center", // 세로 중앙 정렬
                justifyContent: "center", // 가로 중앙 정렬
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                position: "fixed",
                inset: "0", // top, right, bottom, left를 한 번에 설정
                zIndex: 1050,
            }}
            tabIndex="-1"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">대분류 상세</h5>
                        <button type="button" className="btn-close" onClick={() => setShowDetailBModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                {/* 대분류 코드 표시 (읽기 전용) */}
                                <label>대분류 코드</label>
                                <input type="text" 
                                       name="productBCode" 
                                       value={selectedProductB.productBCode} // 선택된 대분류의 코드 값을 표시
                                       readOnly 
                                       className="form-control" />
                            </div>

                            <div className="mb-3">
                                {/* 상품명 표시 (읽기 전용) */}
                                <label>상품명</label>
                                <input type="text" 
                                       name="productBName" 
                                       value={selectedProductB.productBName} // 선택된 대분류의 상품명 값을 표시
                                       readOnly 
                                       className="form-control" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowDetailBModal(false)}>닫기</button>
                        <button type="button" className="btn btn-danger" onClick={() => setShowDeleteBModal(true)}>삭제</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductBDetailModal;