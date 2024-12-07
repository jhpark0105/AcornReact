import React, { useState, useEffect } from 'react';
import '../../../../styles/modal.css'

/**
 * 상품 등록 모달
 * (JSDoc 주석. 자바스크립트 코드에서 함수, 변수, 매개변수, 클래스 등의 설명을 추가하기 위해 사용)
 * @param {function} handleChange - 입력값 변경을 처리하는 함수
 * @param {function} handleInsert - 등록 버튼 선택 시 실행되는 함수
 * @param {function} setShowModal - 모달 상태를 변경하는 함수 (열기/닫기)
 */

const ProductModal = ({ handleChange, handleInsert, setShowModal }) => {
    const [productbs, setProductbs] = useState([]); // 대분류 목록 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [selectedCategory, setSelectedCategory] = useState(''); // 선택된 대분류 초기값

    // 대분류 목록을 서버에서 받아오기
    useEffect(() => {
        const fetchProductB = async () => {
            try {
                const response = await fetch('http://localhost:8080/product/product-b');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setProductbs(data); // 대분류 데이터 설정
                } else {
                    console.error('데이터 형식 오류: 배열이 아닙니다.', data);
                }
            } catch (error) {
                console.error('Error fetching product_b:', error); // API 호출 에러 처리
            } finally {
                setLoading(false); // 로딩 완료 상태 설정
            }
        };
        fetchProductB(); // 컴포넌트 마운트 시 대분류 데이터 로딩
    }, []);

    // 로딩 중인 경우 로딩 텍스트 출력
    if (loading) {
        return <div>Loading...</div>;
    }

    // 대분류 선택 시 처리
    const handleCategoryChange = (e) => {
        const selectedCode = e.target.value; // 선택된 대분류 코드
        setSelectedCategory(selectedCode); // 선택된 대분류 코드 상태 업데이트
        handleChange({ target: { name: 'productBCode', value: selectedCode } }); // 대분류 코드 변경을 상위 컴포넌트로 전달
    };

    // 상품 등록 처리
    const handleProductInsert = () => {
        handleInsert(selectedCategory); // 대분류 코드와 함께 상품 등록 처리 함수 호출
        setShowModal(false); // 모달 닫기
    };

    return (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">상품 등록</h5>
                        {/* 모달 닫기 버튼 */}
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            {/* 대분류 선택 */}
                            <div className="mb-3">
                                <label>대분류</label>
                                <select
                                    name="productBCode"
                                    value={selectedCategory}
                                    onChange={handleCategoryChange} // 대분류 선택 시 처리
                                    className="form-control"
                                >
                                    <option value="">대분류를 선택하세요</option>
                                    {productbs.map((productb) => (
                                        <option key={productb.productBCode} value={productb.productBCode}>
                                            {productb.productBName} {/* 대분류 이름 출력 */}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* 상품 코드 입력 */}
                            <div className="mb-3">
                                <label>상품 코드</label>
                                <input
                                    type="text"
                                    name="productCode"
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="상품 코드를 입력하세요."
                                />
                            </div>

                            {/* 상품 명 입력 */}
                            <div className="mb-3">
                                <label>상품 명</label>
                                <input
                                    type="text"
                                    name="productName"
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="상품 이름을 입력하세요."
                                />
                            </div>

                            {/* 상품 금액 입력 */}
                            <div className="mb-3">
                                <label>상품 금액</label>
                                <input
                                    type="number"
                                    name="productPrice"
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="상품 금액을 입력하세요."
                                />
                            </div>

                            {/* 상품 수량 입력 */}
                            <div className="mb-3">
                                <label>상품 수량</label>
                                <input
                                    type="number"
                                    name="productEa"
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="상품 수량을 입력하세요."
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        {/* 모달 닫기 버튼 */}
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                            닫기
                        </button>

                        {/* 소분류(상품) 등록 버튼 */}
                        <button type="button" className="btn btn-primary" onClick={handleProductInsert}>
                            등록
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;