import '../../../../styles/modal.css';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * 상품 상세 모달 컴포넌트
 */
function ProductDetailModal({
  isEditing,
  selectedProduct,
  handleDetailChange,
  setSelectedProduct, // 부모로부터 전달받은 상태 업데이트 함수
  handleSave,
  handleEdit,
  setShowDetailModal,
  setShowDeleteModal,
}) {
  const [imagePreview, setImagePreview] = useState(
    selectedProduct.productImagePath
      ? `${selectedProduct.productImagePath}`
      : '' // 초기 이미지 경로 설정
  );

  // 이미지 변경 처리
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB 제한
      if (file.size > maxSize) {
        toast.error("파일 크기는 5MB를 초과할 수 없습니다.");
        return;
      }

      if (["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        // 이미지 미리보기 URL 설정
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result); // 미리보기 업데이트
          setImage(file);
        };
        reader.readAsDataURL(file);

        // `selectedProduct` 상태 업데이트
        setSelectedProduct((prev) => ({
          ...prev,
          imageFile: file, // 새로운 이미지 파일 추가
        }));
      } else {
        toast.error("PNG, JPG, JPEG 파일만 업로드 가능합니다.");
      }
    }
  };

  // 모달 닫기 시 상태 초기화
  const closeModal = () => {
    setShowDetailModal(false);
    setImagePreview(
      selectedProduct.productImagePath
        ? `${selectedProduct.productImagePath}`
        : ''
    );
  };

  return (
    <div
      className="modal show"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        inset: '0',
        zIndex: 1050,
      }}
      tabIndex="-1"
    >
      <div
        className="modal-dialog"
        style={{
          maxWidth: '800px',
          width: '90%',
          margin: 'auto',
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
              onClick={closeModal}
            ></button>
          </div>

          <div className="modal-body" style={{ display: 'flex', gap: '20px' }}> 
            {/* 왼쪽: 상품 정보 */}
            <form style={{ flex: 2 }}>
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

              {isEditing && (
                <div className="mb-3">
                  <label>상품 사진</label>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleImageChange}
                    className="form-control"
                  />
                </div>
              )}
            </form>

            {/* 오른쪽: 이미지 미리보기 */}
            <div style={{ flex: 1, textAlign: 'center' }}>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="상품 사진"
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
                  상품 사진이 없습니다.
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer" style={{ justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              닫기
            </button>
            {isEditing ? (
              <button
                type="button"
                className="btn btn-success"
                onClick={() => handleSave(selectedProduct)} // 저장 호출 시 변경된 데이터를 전달
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