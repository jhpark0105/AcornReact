import axios from "axios";
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import ProductList from './productS/ProductList'; // 소분류(상품) 목록을 표시하는 컴포넌트
import CreateProduct from './productS/CreateProduct'; // 소분류(상품) 등록 폼을 처리하는 컴포넌트
import ProductDetail from './productS/ProductDetail'; // 소분류(상품) 상세보기 및 수정 폼을 처리하는 컴포넌트
import ProductDelete from './productS/ProductDelete'; // 소분류(상품) 삭제 확인 모달을 처리하는 컴포넌트

function PRODUCT() {
  const [products, setProducts] = useState([]);
  const [state, setState] = useState({});
  const [showModal, setShowModal] = useState(false); // 등록 모달 상태 관리
  const [selectedProduct, setSelectedProduct] = useState(null); // 상세보기 데이터
  const [showDetailModal, setShowDetailModal] = useState(false); // 상세보기 모달 상태
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 삭제 확인 모달
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태

  //상품 목록을 서버에서 가져옴
  useEffect(() => {
    fetchProducts();
  }, []);

  //소분류(상품) 전체 목록 조회
  const fetchProducts = () => {
    axios.get(`http://localhost:8080/product`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        toast.error("상품 정보를 불러오는 데 오류가 발생했습니다.");
        console.error("Error :", error);
      });
  };

  // 입력 폼에서 값 변경 시 상태 업데이트
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name] : e.target.value, // 변경된 입력값 상태 반영
    });
  };

  //소분류(상품) 추가
  const handleInsert = () => {
    axios.post("http://localhost:8080/product", state)
      .then((res) => {
        if (res.data.isSuccess) {
          toast.success("상품 등록 성공!");
          setShowModal(false); // 모달 닫기
          fetchProducts(); // 최신 상품 목록 불러오기
        } else {
          toast.error(res.data.message); //실패 메시지
        }
      })
      .catch((error) => {
        toast.error("상품 등록 중 오류가 발생했습니다.");
        console.error("Error :", error);
      });
  };

  //특정 상품의 상세 정보 표시
  const handleDetail = (product) => {
    setSelectedProduct(product); // 선택한 상품 데이터를 상태에 저장
    setShowDetailModal(true); // 상세보기 모달 열기
    setIsEditing(false); //update모드 초기화
  };

  // 상세보기 모달에서 update 모드로 전환
  const handleEdit = () => { // update 모드 활성화
    setIsEditing(true);
  };

  //소분류(상품) 수정 > 자동 새로고침이 안됨
  const handleSave = () => {
    axios.put(`http://localhost:8080/product/edit/${selectedProduct.productCode}`, selectedProduct)
        .then((res) => {
            if (res.data.isSuccess) {
                toast.success("상품 수정 성공!");
                setIsEditing(false); // update 모드 종료
                setShowDetailModal(false); // update 모달 닫기
                fetchProducts(); // 리로딩 후 최신 데이터 불러옴
            }
        })
        .catch((error) => {
            toast.error("상품 수정 중 오류가 발생했습니다.");
            console.error("Error :", error);
        });
  };

  // 상세보기 모달에서 입력값 변경 시 상태 업데이트
  const handleDetailChange = (e) => {
    setSelectedProduct({
      ...selectedProduct,
      [e.target.name] : e.target.value, // 변경된 입력값 상태에 반영
    });
  };

  //소분류(상품) 삭제 > 자동 새로고침이 안됨
  const handleDelete = () => {
    if (selectedProduct) {
        axios.delete(`http://localhost:8080/product/${selectedProduct.productCode}`)
            .then((res) => {
                if (res.data.isSuccess) {
                    toast.success("상품 삭제 성공!");
                    setShowDeleteModal(false); // 삭제 모달 닫기
                    setShowDetailModal(false); // 상세보기 모달 닫기
                    fetchProducts(); // 리로딩 후 최신 데이터 불러옴
                }
            })
            .catch((error) => {
                toast.error("상품 삭제 중 오류가 발생했습니다.");
                console.error("Error :", error);
            });
    }
  };

  return (
    <div className="App">
      <ToastContainer />

      <ProductList
        products={products} // 상품 목록 데이터를 전달
        handleDetail={handleDetail} // 상품 상세 보기 이벤트를 처리하는 함수
        fetchProducts={fetchProducts}  //상품을 가져오는 함수
        setShowModal={setShowModal} //모달 창을 열기 위한 상태 설정 함수
      />
      
      {showModal && <CreateProduct //showModal이 true일 경우 새 상품 생성 모달보기
        handleChange={handleChange} // 입력값 변경을 처리
        handleInsert={handleInsert} // 새 상품을 추가
        setShowModal={setShowModal} // 모달을 닫을 때 사용
        />
      }

      {showDetailModal && selectedProduct && (
        //showDetailModal이 true이고, selectedProduct가 존재할 경우, 상품 정보 상세 보기 모달 보기
        <ProductDetail
          isEditing={isEditing} // 수정 가능 여부를 결정하는 상태값
          selectedProduct={selectedProduct} // 선택된 대분류 데이터
          handleDetailChange={handleDetailChange} // 상세 정보 변경을 처리하는 함수
          handleSave={handleSave} // 변경된 정보를 저장
          handleEdit={handleEdit} // 수정 모드로 전환
          setShowDetailModal={setShowDetailModal} // 상세 모달 창을 닫는 함수
          setShowDeleteModal={setShowDeleteModal} // 삭제 확인 모달을 여는 함수
        />
      )}

      {showDeleteModal && (
        <ProductDelete
          selectedProduct={selectedProduct}
          handleDelete={handleDelete} // 삭제 작업을 처리
          setShowDeleteModal={setShowDeleteModal} // 삭제 모달을 닫는 함수
        />
      )}
    </div>
  );
}

export default PRODUCT;