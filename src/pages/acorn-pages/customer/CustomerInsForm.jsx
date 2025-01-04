import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // 이메일 유효성 검사 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 전화번호 유효성 검사 정규식
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;

    // 필수 입력값 검증
    if (!state.customerName.trim()) {
      toast.error("고객 이름을 입력해주세요.");
      return;
    }
    if (!state.customerTel.trim()) {
      toast.error("고객 연락처를 입력해주세요.");
      return;
    }
    if (!phoneRegex.test(state.customerTel)) {
      toast.error("올바른 연락처 형식을 입력해주세요. (예: 000-0000-0000)");
      return;
    }
    if (!state.customerMail.trim()) {
      toast.error("고객 e-mail을 입력해주세요.");
      return;
    }
    if (!emailRegex.test(state.customerMail)) {
      toast.error("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    // 등록 요청 데이터 준비
    const requestData = {  
      ...state,
      customerReg: startDate.toISOString().split('T')[0], // 등록일 년월일
    };

    axios
      .post("http://localhost:8080/customer", requestData)  // POST 요청으로 고객 데이터 전송
      .then((res) => {
        if (res.data.isSuccess) {  // 요청 성공 시 처리
          toast.success("고객 등록이 완료되었습니다.");
          setShowModal(false); // 모달 닫기
          refresh();  // 부모 컴포넌트의 데이터를 갱신
          navigate(""); // 추가 후 고객 목록 페이지로 이동
        }
      })
      .catch((error) => {  // 요청 실패 시 처리
        toast.error("고객 등록 중 오류가 발생했습니다: " + (error.message || "서버 오류"));
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
          <div className="modal-body">
            <form>
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

              <div className="mb-3">
                <label>고객 성별</label>
                <GenderPickerComponent
                  value={state.customerGender}
                  onChange={(value) => setState({ ...state, customerGender: value })}
                />
              </div>

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

              <div className="mb-3">
                <label>고객 등급</label>
                <SelectPickerComponent
                  value={state.customerRank}
                  onChange={(value) => setState({ ...state, customerRank: value })}
                />
              </div>

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