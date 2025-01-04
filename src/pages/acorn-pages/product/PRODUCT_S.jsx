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
  const [image, setImage] = useState(null); // 이미지 상태 추가

  // 상품 목록을 서버에서 가져옴
  const fetchProducts = () => {
    axios
      .get(`http://localhost:8080/product`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        toast.error("상품 정보를 불러오는 데 오류가 발생했습니다.");
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

    const { image, ...dtoWithoutImage } = state; // state에서 image만 제외한 나머지 데이터를 추출

    formData.append("dto", new Blob([JSON.stringify(dtoWithoutImage)], { type: "application/json" }));
    if (imageFile) {
        formData.append("image", imageFile);
    }

    axios
        .post("http://localhost:8080/product", formData)
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
            toast.error("상품 등록 중 오류가 발생했습니다.");
            console.error("Insert Error:", error);
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
    // 필수 값 검증
    if (!selectedProduct.productCode || !selectedProduct.productName) {
      toast.error("필수 값이 누락되었습니다.");
      return;
    }

    const formData = new FormData();
  
    // `dto` 추가
    formData.append(
      "dto",
      new Blob([JSON.stringify(selectedProduct)], { type: "application/json" })
    );
  
    // 이미지 처리
    if (selectedProduct.imageFile) {
      //새로운 이미지 추가
      formData.append("image", selectedProduct.imageFile);
    } else if (selectedProduct.productImagePath) {
      //기존 이미지 경로 유지
      formData.append("imagePath", selectedProduct.productImagePath);
    } else {
      console.log("이미지가 제공되지 않았습니다.");
    }
  
    axios
      .put(`http://localhost:8080/product/edit/${selectedProduct.productCode}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          toast.success(res.data.message);
          fetchProducts();
          setIsEditing(false);
          setShowDetailModal(false);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        toast.error("상품 수정 중 오류가 발생했습니다.");
        console.error("Update Error:", error);
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
          console.error("Delete Error:", error);
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