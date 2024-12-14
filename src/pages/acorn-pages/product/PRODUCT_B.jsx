import axios from "axios";
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import ProductBList from './productB/ProductBList'; // 대분류 목록을 표시하는 컴포넌트
import CreateProductB from './productB/CreateProductB'; // 대분류 등록 폼을 처리하는 컴포넌트
import ProductBDetail from './productB/ProductBDetail'; // 대분류 상세보기 폼을 처리하는 컴포넌트
import ProductBDelete from './productB/ProductBDelete'; // 대분류 삭제 확인 모달을 처리하는 컴포넌트

function PRODUCT_B() {
  const [productBs, setProductBs] = useState([]);
  const [state, setState] = useState({});
  const [showModal, setShowModal] = useState(false); // 등록 모달 상태 관리
  const [selectedProductB, setSelectedProductB] = useState(null); // 상세보기 데이터
  const [showDetailBModal, setShowDetailBModal] = useState(false); // 상세보기 모달 상태
  const [showDeleteBModal, setShowDeleteBModal] = useState(false); // 삭제 확인 모달

  // 대분류 상품 목록을 서버에서 가져옴
  useEffect(() => {
    fetchProductBs();
  }, []);

  // 대분류 전체 목록 조회
  const fetchProductBs = () => {
    axios.get('http://localhost:8080/productB')
      .then((response) => {
        setProductBs(response.data);
      })
      .catch((error) => {
        toast.error("대분류 정보를 불러오는 데 오류가 발생했습니다.");
        console.error("Error fetching productBs:", error);
      });
  };

  // 입력 폼에서 값 변경 시 상태 업데이트
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name] : e.target.value, // 변경된 입력값 상태 반영
    });
  };

  // 대분류 추가
  const handleInsertB = () => {
    axios.post("http://localhost:8080/productB", state)
      .then((res) => {
        if (res.data.isSuccess) {
          toast.success(res.data.message);  // 성공 메시지
          setShowModal(false); // insert 모달 닫기
          fetchProductBs(); // 리로딩 후 최신 데이터 불러옴
        } else {
          toast.error(res.data.message);  // 실패 메시지
        }
      })
      .catch((error) => {
        toast.error("대분류 등록 중 오류가 발생했습니다.");
        console.error("Error:", error);
      });
  };  

  // 특정 대분류의 상세 정보 표시
  const handleDetailB = (productB) => {
    setSelectedProductB(productB); // 선택한 상품 데이터를 상태에 저장
    setShowDetailBModal(true); // 상세보기 모달 열기
  };

  // 대분류 삭제
  const handleDeleteB = () => {
    if (selectedProductB) {
      axios
        .delete(`http://localhost:8080/productB/${selectedProductB.productBCode}`)
        .then((res) => {
          if (res.data.isSuccess) {
            toast.success(res.data.message); // 성공 메시지
            setShowDeleteBModal(false); // 삭제 모달 닫기
            setShowDetailBModal(false); // 상세보기 모달 닫기
            fetchProductBs(); // 최신 데이터 불러오기
          } else {
            toast.error(res.data.message); // 실패 메시지
          }
        })
        .catch((error) => {
          toast.error("삭제 중 오류가 발생했습니다.");
          console.error("Error deleting productB:", error);
        });
    }
  };

  return (
    <div className="App">

      <ToastContainer />

      {/* productBs 데이터가 있을 때만 ProductBList 렌더링 */}
      {productBs.length > 0 && (
        <ProductBList
          productBs={productBs} // 상품 목록 데이터를 전달
          handleDetailB={handleDetailB} // 상품 상세 보기 이벤트를 처리하는 함수
          fetchProductBs={fetchProductBs}  //상품을 가져오는 함수
          setShowModal={setShowModal} //모달 창을 열기 위한 상태 설정 함수
        />
      )}
      
      {showModal && <CreateProductB //showModal이 true일 경우 새 대분류 생성 모달 보기
        handleChange={handleChange} // 입력값 변경을 처리
        handleInsertB={handleInsertB} // 새 대분류를 추가
        setShowModal={setShowModal} // 모달을 닫을 때 사용
      />}

      {showDetailBModal && selectedProductB && (
        <ProductBDetail
          selectedProductB={selectedProductB} // 선택된 대분류 데이터
          setShowDetailBModal={setShowDetailBModal} //상세 모달 창을 닫는 함수
          setShowDeleteBModal={setShowDeleteBModal} // 삭제 확인 모달을 여는 함수 
        />
      )}

      {showDeleteBModal && (
        <ProductBDelete
          selectedProductB={selectedProductB} //선택된 대분류 데이터
          handleDeleteB={handleDeleteB} // 삭제 작업을 처리
          setShowDeleteBModal={setShowDeleteBModal} // 삭제 모달을 닫는 함수
        />
      )}
    </div>
  );
}

export default PRODUCT_B;