import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import DatePickerComponent from "./Picker/DatePicker";
import GenderPickerComponent from "./Picker/GenderPicker";
import SelectPickerComponent from "./Picker/SelectPicker";
import '../../../styles/modal.css';

export default function CustomerInsForm({ setShowModal, refresh, show }) {
  const [state, setState] = useState({
    customerName: "",
    customerGender: "남자",
    customerTel: "",
    customerMail: "",
    customerRank: "GOLD",
    customerNote: "",
  });

  // DatePicker - 고객 등록일 관리
  const [startDate, setStartDate] = useState(new Date());

  // useNavigate - 페이지 전환
  const navigate = useNavigate();

  // 입력값 변경 핸들러(입력된 값에 따라 state 업데이트)
  const handleChange = (e) => {
    setState({
      ...state,  // 기존 state 유지
      [e.target.name]: e.target.value,  // 변경된 입력 필드 업데이트
    });
  };

  // 등록 버튼 누르면 저장(저장 버튼 -> 고객 데이터 서버로 전송)
  const handleSave = () => {
    const requestData = {  
      ...state,
      customerReg: startDate.toISOString().split('T')[0], // 등록일 년월일
    };

    axios
      .post("http://localhost:8080/customer", requestData)  //POST요청으로 고객 데이터 보냄
      .then((res) => {
        if (res.data.isSuccess) {  // 요청 성공 시 처리
          toast.success("고객 등록이 완료되었습니다.");
          setShowModal(false); // 모달 닫기
          refresh();  // 부모 컴포넌트의 데이터를 갱신
          navigate(""); //추가 후 고객 목록페이지로
        }
      })
      .catch((error) => {  // 요청 실패 시
        toast.error("등록 중 오류 발생:", error);
        toast.error("고객 등록 중 오류가 발생했습니다: " + (error.message || "서버 오류"));
        // 오류 응답을 로그에 출력
        if (error.response) {
          toast.error("서버 응답 오류:", error.response);
        } else if (error.request) {
          toast.error("서버에 요청이 전달되지 않았습니다:", error.request);
        } else {
          toast.error("오류 발생:", error.message);
        }
      });
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none', backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1080 }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">고객 등록</h5>
            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
          </div>
          <div className="modal-body" >
            <form>
              {/* 고객 이름 */}
              <div className="mb-3">
                <label>고객 이름</label>
                <input
                  type="text"
                  name="customerName"
                  value={state.customerName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="이름을 입력하세요"
                  required
                />
              </div>

              {/* 고객 성별 */}
              <div className="mb-3">
                <label>고객 성별</label>
                <GenderPickerComponent
                  value={state.customerGender}
                  onChange={(value) => setState({ ...state, customerGender: value })}
                />
              </div>

              {/* 고객 연락처 */}
              <div className="mb-3">
                <label>고객 연락처</label>
                <input
                  type="text"
                  name="customerTel"
                  value={state.customerTel}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="연락처를 입력하세요"
                  required
                />
              </div>

              {/* 고객 e-mail */}
              <div className="mb-3">
                <label>고객 e-mail</label>
                <input
                  type="text"
                  name="customerMail"
                  value={state.customerMail}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e-mail을 입력하세요"
                />
              </div>

              {/* 고객 등록일 */}
              <div className="mb-3">
                <label>고객 등록일</label>
                <DatePickerComponent
                  style={{ width: 465 }}
                  value={state.customerReg}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                />
              </div>

              {/* 고객 등급 */}
              <div className="mb-3">
                <label>고객 등급</label>
                <SelectPickerComponent
                  value={state.customerRank}
                  onChange={(value) => setState({ ...state, customerRank: value })}
                />
              </div>

              {/* 고객 특이사항 */}
              <div className="mb-3">
                <label>고객 특이사항</label>
                <input
                  type="text"
                  name="customerNote"
                  value={state.customerNote}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="특이사항을 입력하세요"
                />
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
              닫기
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
