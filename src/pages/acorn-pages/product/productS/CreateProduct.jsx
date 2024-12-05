import React, { useState, useEffect } from 'react';

const ProductModal = ({ handleChange, handleInsert, setShowModal }) => {
    const [productbs, setProductbs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(''); // 대분류 초기값

    useEffect(() => {
        const fetchProductB = async () => {
            try {
                const response = await fetch('/product/product-b');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setProductbs(data);
                } else {
                    console.error('데이터 형식 오류: 배열이 아닙니다.', data);
                }
            } catch (error) {
                console.error('Error fetching product_b:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductB();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleCategoryChange = (e) => {
        const selectedCode = e.target.value; // 선택된 productBCode
        setSelectedCategory(selectedCode);
        handleChange({ target: { name : 'productBCode', value : selectedCode } }); // productBCode 전달
    };

    const handleProductInsert = () => {
        handleInsert(selectedCategory); // 대분류 코드 삽입
        setShowModal(false);
    };
    
    return (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">상품 등록</h5>

                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            {/* 대분류 선택 */}
                            <div className="mb-3">
                                <label>대분류</label>
                                <select name="productBCode" value={selectedCategory} onChange={handleCategoryChange} className="form-control" >
                                    <option value="">대분류를 선택하세요</option>
                                    {productbs.map((productb) => (
                                        <option key={productb.productBCode} value={productb.productBCode}>
                                            {productb.productBName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label>상품 코드</label>
                                <input type="text" name="productCode" onChange={handleChange} className="form-control" placeholder="상품 코드를 입력하세요." />
                            </div>
                            <div className="mb-3">
                                <label>상품 명</label>
                                <input type="text" name="productName" onChange={handleChange} className="form-control" placeholder="상품 이름을 입력하세요." />
                            </div>
                            <div className="mb-3">
                                <label>상품 금액</label>
                                <input type="number" name="productPrice" onChange={handleChange} className="form-control" placeholder="상품 금액을 입력하세요." />
                            </div>
                            <div className="mb-3">
                                <label>상품 수량</label>
                                <input type="number" name="productEa" onChange={handleChange} className="form-control" placeholder="상품 수량을 입력하세요." />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                            닫기
                        </button>
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