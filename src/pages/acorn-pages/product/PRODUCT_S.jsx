import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import ProductList from "./productS/ProductList";
import CreateProduct from "./productS/CreateProduct";
import ProductDetail from "./productS/ProductDetail";
import ProductDelete from "./productS/ProductDelete";

function PRODUCT() {
  const [products, setProducts] = useState([]);
  const [state, setState] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 상품 목록을 서버에서 가져옴
  const fetchProducts = () => {
    axios
      .get(`http://localhost:8080/product`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        toast.error("상품 정보를 불러오는 데 오류가 발생했습니다.");
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 입력 폼에서 값 변경 시 상태 업데이트
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setState({
      ...state,
      [name]: files ? files[0] : value, // 파일 입력 처리
    });
  };

  // 상품 추가
  const handleInsert = (imageFile) => {
    const formData = new FormData();
    const { image, ...dtoWithoutImage } = state; // state.image는 제외

    formData.append("dto", new Blob([JSON.stringify(dtoWithoutImage)], { type: "application/json" }));
    formData.append("image", imageFile); // 전달받은 이미지 파일 추가

    axios
      .post("http://localhost:8080/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          toast.success(res.data.message);
          setShowModal(false);
          fetchProducts();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error("상품 등록 중 오류:", error);
        toast.error("상품 등록 중 오류가 발생했습니다.");
      });
  };

  // 상세 정보 표시
  const handleDetail = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
    setIsEditing(false);
  };

  // 수정 모드로 전환
  const handleEdit = () => {
    setIsEditing(true);
  };

  // 상품 수정
  const handleSave = () => {
    // 이미지가 없는 경우 에러 메시지 출력
    if (!selectedProduct.imageFile && !selectedProduct.productImagePath) {
      toast.error("상품 사진을 등록하세요.");
      return;
    }

    const formData = new FormData();

    formData.append("dto", new Blob([JSON.stringify(selectedProduct)], { type: "application/json" }));

    if (selectedProduct.imageFile) {
      formData.append("image", selectedProduct.imageFile); // 새로운 이미지 파일 추가
    }

    axios
      .put(`http://localhost:8080/product/edit/${selectedProduct.productCode}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          toast.success(res.data.message);
          setIsEditing(false);
          setShowDetailModal(false); // 모달 닫기
          fetchProducts(); // 목록 갱신
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error("상품 수정 중 오류가 발생했습니다.");
        console.error(error);
      });
  };

  // 상세 보기 입력값 변경 처리
  const handleDetailChange = (e) => {
    const { name, value, files } = e.target;

    // 상태 업데이트
    setSelectedProduct((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, // 파일 입력 처리
    }));
  };

  // 상품 삭제
  const handleDelete = () => {
    if (selectedProduct) {
      axios
        .delete(`http://localhost:8080/product/${selectedProduct.productCode}`)
        .then((res) => {
          if (res.data.isSuccess) {
            toast.success(res.data.message);
            setShowDeleteModal(false);
            setShowDetailModal(false);
            fetchProducts();
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          toast.error("상품 삭제 중 오류가 발생했습니다.");
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="App">
      <ToastContainer />

      <ProductList
        products={products}
        handleDetail={handleDetail}
        fetchProducts={fetchProducts}
        setShowModal={setShowModal}
      />

      {showModal && (
        <CreateProduct
          handleChange={handleChange}
          handleInsert={handleInsert}
          setShowModal={setShowModal}
        />
      )}

      {showDetailModal && selectedProduct && (
        <ProductDetail
          isEditing={isEditing}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          handleDetailChange={handleDetailChange}
          handleSave={handleSave}
          handleEdit={handleEdit}
          setShowDetailModal={setShowDetailModal}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}

      {showDeleteModal && (
        <ProductDelete
          selectedProduct={selectedProduct}
          handleDelete={handleDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </div>
  );
}

export default PRODUCT;