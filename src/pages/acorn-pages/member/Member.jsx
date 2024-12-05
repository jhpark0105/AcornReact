import React, { useEffect, useState } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
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

  const fetchServices = () => {
    axios.get('http://localhost:8080/service')
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        toast.error("서비스 정보를 불러오는 데 오류가 발생했습니다.");
        console.error("Error fetching services:", error);
      });
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleInsert = () => {
    axios.post("http://localhost:8080/service", state)
      .then((res) => {
        if (res.data.isSuccess) {
          toast.success("서비스 등록 성공!");
          setShowModal(false);
          fetchServices();
        }
      })
      .catch((error) => {
        toast.error("서비스 등록 중 오류가 발생했습니다.");
        console.error("Error:", error);
      });
  };

  const handleDetail = (service) => {
    setSelectedService(service);
    setShowDetailModal(true);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    axios.put(`http://localhost:8080/service/${selectedService.serviceCode}`, selectedService)
      .then((res) => {
        if (res.data.isSuccess) {
          toast.success("서비스 수정 성공!");
          setIsEditing(false);
          setShowDetailModal(false);
          fetchServices();
        }
      })
      .catch((error) => {
        toast.error("수정 중 오류가 발생했습니다.");
        console.error("Error:", error);
      });
  };

  const handleDetailChange = (e) => {
    setSelectedService({
      ...selectedService,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = () => {
    if (selectedService) {
      axios.delete(`http://localhost:8080/service/${selectedService.serviceCode}`)
        .then((res) => {
          if (res.data.isSuccess) {
            toast.success("서비스 삭제 성공!");
            setShowDeleteModal(false);
            setShowDetailModal(false);
            fetchServices();
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
      <h2>Service List</h2>

      <ToastContainer />

      <div style={{ width: "80%", margin: "0 auto", display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => setShowModal(true)} className="btn btn-success mb-3">
          서비스 등록
        </button>
      </div>

      <table className="table table-bordered" style={{ margin: "0 auto", width: "80%" }}>
        <thead>
          <tr>
            <th>서비스 코드</th>
            <th>서비스 명</th>
            <th>서비스 금액</th>
          </tr>
        </thead>
        <tbody>
          {services.length > 0 ? (
            services.map((service) => (
              <tr key={service.serviceCode}>
                <td>{service.serviceCode}</td>
                <td>
                  <span
                    style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => handleDetail(service)}>
                    {service.serviceName}
                  </span>
                </td>
                <td>{service.servicePrice}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">등록된 서비스가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal show" 
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">서비스 등록</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label>서비스 코드</label>
                    <input type="text" name="serviceCode" onChange={handleChange}
                      className="form-control" placeholder="서비스 코드를 입력하세요." />
                  </div>

                  <div className="mb-3">
                    <label>서비스 명</label>
                    <input type="text" name="serviceName" onChange={handleChange}
                      className="form-control" placeholder="서비스 이름을 입력하세요." />
                  </div>

                  <div className="mb-3">
                    <label>서비스 금액</label>
                    <input type="number" name="servicePrice" onChange={handleChange}
                      className="form-control" placeholder="서비스 금액을 입력하세요." />
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  닫기
                </button>
                <button type="button" className="btn btn-primary" onClick={handleInsert}>
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedService && (
        <div className="modal show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title">
                    {isEditing ? "서비스 수정" : "서비스 상세 정보"}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)}></button>
              </div>

              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label>서비스 코드</label>
                    <input type="text" name="serviceCode" className="form-control"
                      value={selectedService.serviceCode} onChange={handleDetailChange} readOnly/>
                  </div>

                  <div className="mb-3">
                    <label>서비스 명</label>
                    <input type="text" name="serviceName" className="form-control"
                      value={selectedService.serviceName} onChange={handleDetailChange} readOnly={!isEditing}/>
                  </div>

                  <div className="mb-3">
                    <label>서비스 금액</label>
                    <input type="number" name="servicePrice" className="form-control"
                      value={selectedService.servicePrice} onChange={handleDetailChange} readOnly={!isEditing}/>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                {isEditing ? (
                  <button type="button" className="btn btn-primary" onClick={handleSave}>
                    저장
                  </button>
                ) : (
                  <>
                    <button type="button" className="btn btn-warning" onClick={handleEdit}>
                      수정
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>
                      삭제
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title">"{selectedService.serviceName}" 삭제</h5>
                  <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>

              <div className="modal-body">
                  <p>정말 이 서비스를 삭제하시겠습니까?</p>
              </div>

              <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                    취소
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleDelete}>
                    삭제
                  </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;