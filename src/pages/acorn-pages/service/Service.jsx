import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServiceList from "./ServiceList"; // 서비스 목록을 표시하는 컴포넌트
import CreateService from "./CreateService"; // 서비스 등록 폼을 처리하는 컴포넌트
import ServiceDetail from "./ServiceDetail"; // 서비스 상세보기 및 수정 폼을 처리하는 컴포넌트
import ServiceDelete from "./ServiceDelete"; // 서비스 삭제 확인 모달을 처리하는 컴포넌트

const Service = () => {
  const [services, setServices] = useState([]);
  const [state, setState] = useState({});
  const [showModal, setShowModal] = useState(false); // 등록 모달 상태 관리
  const [selectedService, setSelectedService] = useState(null); // 상세보기 데이터
  const [showDetailModal, setShowDetailModal] = useState(false); // 상세보기 모달 상태
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 삭제 확인 모달
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태

  useEffect(() => {
    fetchServices();
  }, []);

  // 전체 서비스 목록 조회
  const fetchServices = () => {
    axios.get("http://localhost:8080/service")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        toast.error("서비스 정보를 불러오는 데 오류가 발생했습니다.");
        console.error("Error fetching services:", error);
      });
  };

  // 입력 폼에서 값 변경 시 상태 업데이트
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value, // 변경된 입력값 상태 반영
    });
  };

  // insertprocess
  const handleInsert = () => {
    axios.post("http://localhost:8080/service", state)
      .then((res) => {
        if (res.data.isSuccess) {
          toast.success("서비스 등록 성공!");
          setShowModal(false); // insert 모달 닫기
          fetchServices(); // 리로딩 후 최신 데이터 불러옴
        }
      })
      .catch((error) => {
        toast.error("서비스 등록 중 오류가 발생했습니다.");
        console.error("Error:", error);
      });
  };

  // 특정 서비스의 상세 정보 표시
  const handleDetail = (service) => {
    setSelectedService(service); // 선택한 서비스 데이터를 상태에 저장
    setShowDetailModal(true); // 상세보기 모달 열기
    setIsEditing(false); // update 모드 초기화
  };

  // 상세보기 모달에서 update 모드로 전환
  const handleEdit = () => {
    setIsEditing(true); // update 모드 활성화
  };

  // updateprocess
  const handleSave = () => {
    axios.put(`http://localhost:8080/service/${selectedService.serviceCode}`, selectedService)
      .then((res) => {
        if (res.data.isSuccess) {
          toast.success("서비스 수정 성공!");
          setIsEditing(false); // update 모드 종료
          setShowDetailModal(false); // update 모달 닫기
          fetchServices(); // 리로딩 후 최신 데이터 불러옴
        }
      })
      .catch((error) => {
        toast.error("수정 중 오류가 발생했습니다.");
        console.error("Error:", error);
      });
  };

  // 상세보기 모달에서 입력값 변경 시 상태 업데이트
  const handleDetailChange = (e) => {
    setSelectedService({
      ...selectedService,
      [e.target.name]: e.target.value, // 변경된 입력값 상태에 반영
    });
  };

  // deleteprocess
  const handleDelete = () => {
    if (selectedService) {
      axios.delete(`http://localhost:8080/service/${selectedService.serviceCode}`)
        .then((res) => {
          if (res.data.isSuccess) {
            toast.success("서비스 삭제 성공!");
            setShowDeleteModal(false); // 삭제 모달 닫기
            setShowDetailModal(false); // 상세보기 모달 닫기
            fetchServices(); // 리로딩 후 최신 데이터 불러옴
          }
        })
        .catch((error) => {
          toast.error("삭제 중 오류가 발생했습니다.");
          console.error("Error deleting service:", error);
        });
    }
  };

  return (
    <div className="App">
      <ToastContainer />

      <ServiceList 
        services={services} // 서비스 목록 데이터를 전달
        handleDetail={handleDetail} // 서비스 상세 보기 이벤트를 처리하는 함수
        fetchServices={fetchServices} // 서비스 목록 갱신 함수
        setShowModal={setShowModal} // 등록 모달 상태 변경 함수
      />

      {showModal && (
        <CreateService 
          handleChange={handleChange} 
          handleInsert={handleInsert} 
          setShowModal={setShowModal} 
        />
      )}

      {showDetailModal && selectedService && (
        <ServiceDetail 
          isEditing={isEditing} 
          selectedService={selectedService} 
          handleDetailChange={handleDetailChange} 
          handleSave={handleSave} 
          handleEdit={handleEdit} 
          setShowDetailModal={setShowDetailModal} 
          setShowDeleteModal={setShowDeleteModal} 
        />
      )}

      {showDeleteModal && (
        <ServiceDelete 
          selectedService={selectedService} 
          handleDelete={handleDelete} 
          setShowDeleteModal={setShowDeleteModal} 
        />
      )}
    </div>
  );
};

export default Service;
