import React, { useState, useEffect } from 'react';
import '../../../../styles/modal.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * 상품 등록 모달
 * @param {function} handleChange - 입력값 변경을 처리하는 함수
 * @param {function} handleInsert - 등록 버튼 선택 시 실행되는 함수
 * @param {function} setShowModal - 모달 상태를 변경하는 함수 (열기/닫기)
 */

const ProductModal = ({ handleChange, handleInsert, setShowModal }) => {
    const [productbs, setProductbs] = useState([]); // 대분류 목록 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [selectedCategory, setSelectedCategory] = useState(''); // 선택된 대분류 초기값
    const [image, setImage] = useState(null); // 이미지 상태 추가
    const [imagePreview, setImagePreview] = useState(''); // 이미지 미리보기 상태

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

    // 이미지 업로드 처리
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // 파일 크기 제한 및 형식 확인
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                toast.error("파일 크기는 5MB를 초과할 수 없습니다.");
                return;
            }

            // 이미지 파일 형식 체크 (PNG, JPG, JPEG)
            if (['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
                setImage(file);
    
                // 이미지 미리보기 URL 설정
                const reader = new FileReader();
                reader.onloadend = () => setImagePreview(reader.result);
                reader.readAsDataURL(file);
            } else {
                toast.error('PNG, JPG, JPEG 파일만 업로드 가능합니다.');
            }
        }
    };

    // 상품 등록 처리
    const handleProductInsert = () => {
        handleInsert(image); // 대분류 코드와 함께 상품 등록 처리 함수 호출
        setShowModal(false); // 모달 닫기
    };

    return (
        <div
            className="modal show"
            style={{
                display: 'flex',
                alignItems: 'center', // 세로 중앙 정렬
                justifyContent: 'center', // 가로 중앙 정렬
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
                position: 'fixed', // 화면에 고정
                inset: '0', // top, right, bottom, left를 0으로 설정
                zIndex: 1050, // 모달이 다른 요소 위에 표시되도록 설정
            }}
            tabIndex="-1"
        >
            <div
                className="modal-dialog"
                style={{
                    maxWidth: '800px', // 더 넓은 너비
                    width: '90%', // 화면 너비에 따라 조정
                    margin: 'auto', // 중앙 정렬
                }}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">상품 등록</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowModal(false)}
                        ></button>
                    </div>
                    <div className="modal-body" style={{ display: 'flex', gap: '20px', maxHeight: '70vh', overflowY: 'auto' }}>
                        {/* 왼쪽: 입력 폼 */}
                        <form style={{ flex: '2' }}>
                            <div className="mb-3">
                                <label>대분류</label>
                                <select
                                    name="productBCode"
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    className="form-control"
                                >
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
                                <input
                                    type="text"
                                    name="productCode"
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="상품 코드를 입력하세요."
                                />
                            </div>
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
                            <div className="mb-3">
                                <label>상품 이미지</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={handleImageChange}
                                    className="form-control"
                                />
                            </div>
                        </form>
                        {/* 오른쪽: 이미지 미리보기 */}
                        <div style={{ flex: '1', textAlign: 'center' }}>
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="상품 이미지 미리보기"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '300px',
                                        objectFit: 'contain',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        padding: '5px',
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: '100%',
                                        height: '300px',
                                        border: '1px dashed #ccc',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#aaa',
                                    }}
                                >
                                    상품 사진
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="modal-footer" style={{ justifyContent: 'flex-end' }}>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowModal(false)}
                        >
                            닫기
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleProductInsert}
                        >
                            등록
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;