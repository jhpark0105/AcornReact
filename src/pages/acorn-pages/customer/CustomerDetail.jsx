import { useEffect, useState } from "react";
import { ToastContainer,toast } from 'react-toastify';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerComponent from "./Picker/DatePicker";
import 'rsuite/dist/rsuite.min.css';
import SelectPickerComponent from "./Picker/SelectPicker";
import GenderPickerComponent from "./Picker/GenderPicker";

export default function CustomerDetail({selectedCustomer, setShowDetailModal, refresh}) {
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
    const [ customer, setCustomer] = useState({...selectedCustomer});
    const [startDate, setStartDate] = useState(new Date(customer.customerReg));

    const handleEdit = () => {
        setIsEditing(true);
    };


    // 수정 후 저장
    const handleSave = () => {
        axios.put(`http://localhost:8080/customer/${customer.customerId}`, customer)
          .then((res) => {
            if (res.data.isSuccess) {
              toast.success("고객 수정 성공!");
              setIsEditing(false);
              setShowDetailModal(false);
              refresh();
            }
          })
          .catch((error) => {
            toast.error("수정 중 오류가 발생했습니다.");
            toast.error("Error:", error);
          });
    };
    
    // 수정
    const handleDetailChange = (value, fieldName) => {
      setCustomer(prevCustomer => ({
        ...prevCustomer,
        [fieldName]: value,
      }));
    };

    // 날짜 수정
    const handleDateChange = (date) => {
        setStartDate(date);
        setCustomer({
            ...customer,
            customerReg:date.toISOString().split('T')[0],
        });
    }

    return (
        <>
        <div className="modal show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title">
                    {isEditing ? "고객 정보 수정" : "고객 상세 정보"}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)}></button>
              </div>
              
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label>ID</label>
                    <input type="text" name="customerId" className="form-control"
                      value={customer.customerId} onChange={handleDetailChange} readOnly/>
                  </div>

                  <div className="mb-3">
                    <label>이름</label>
                    <input type="text" name="customerName" className="form-control"
                      value={customer.customerName} onChange={(e) => handleDetailChange(e.target.value, "customerName")} readOnly={!isEditing}/>
                  </div>

                  <div className="mb-3">
                    <label>성별</label>
                    {/* <select name="customerGender" onChange={handleDetailChange} className="form-control" value={customer.customerGender} readOnly={!isEditing}>
                        <option value={"남자"}>남자</option>
                        <option value={"여자"}>여자</option>
                    </select> */}
                    {isEditing ? (
                    <GenderPickerComponent
                        value={customer.customerGender}
                        onChange={(value) => handleDetailChange(value, "customerGender")}
                    />
                    ) : (
                        <input
                            type="text"
                            className="form-control"
                            value={customer.customerGender}
                            readOnly
                        />
                    )}
                  </div>

                  <div className="mb-3">
                    <label>연락처</label>
                    <input type="text" name="customerTel" className="form-control"
                      value={customer.customerTel} onChange={(e) => handleDetailChange(e.target.value, "customerTel")} readOnly={!isEditing}/>
                  </div>

                  <div className="mb-3">
                    <label>e-mail</label>
                    <input type="text" name="customerMail" className="form-control"
                      value={customer.customerMail} onChange={(e) => handleDetailChange(e.target.value, "customerMail")} readOnly={!isEditing}/>
                  </div>

                  <div className="mb-3">
                    <label>고객 등록일</label><br/>
                    <DatePickerComponent
                        selected={startDate}
                        onChange={handleDateChange}
                        disabled // 수정 모드에서만 날짜 선택 가능
                    />

                    {/* 등록일 수정 필요할 경우 */}
                    {/* {isEditing ? (
                    <DatePickerComponent
                        selected={startDate}
                        value={customer.customerReg}
                        onChange={(value) => handleDateChange(value, "customerReg")}
                    />
                    ) : (
                        <input
                            type="text"
                            className="form-control"
                            value={customer.customerReg}
                            readOnly
                        />
                    )} */}
                  </div>

                  <div className="mb-3">
                    <label>고객 등급</label>
                    {/* <select name="customerRank" onChange={handleDetailChange} className="form-control" value={customer.customerRank} readOnly={!isEditing}>
                        <option value={"GOLD"}>GOLD</option>
                        <option value={"SILVER"}>SILVER</option>
                        <option value={"BRONZE"}>BRONZE</option>
                    </select> */}
                    {isEditing ? (
                      <SelectPickerComponent
                        value={customer.customerRank}
                        onChange={(value) => handleDetailChange(value, "customerRank")}
                      />
                    ) : (
                      <input 
                        type="text" 
                        className="form-control" 
                        value={customer.customerRank} 
                        readOnly
                      />
                    )}
                  </div>

                  <div className="mb-3">
                    <label>특이사항</label>
                    <input type="text" name="customerNote" className="form-control"
                      value={customer.customerNote} onChange={(e) => handleDetailChange(e.target.value, "customerNote")} readOnly={!isEditing}/>
                  </div>

                </form>
              </div>

              <div className="modal-footer">
                
                {isEditing ? (
                  <>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                    취소
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSave}>
                    저장
                  </button>
                  </>

                    ) : (
                  <>
                    <button type="button" className="btn btn-warning" onClick={handleEdit}>
                      수정
                    </button>
                    {/** 
                    <button type="button" className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>
                      삭제
                    </button>*/}
                  </>
                )} 
              </div>
            </div>
          </div>
        </div>
        </>
    );
}