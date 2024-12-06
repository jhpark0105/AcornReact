import DatePickerComponent from "./Picker/DatePicker";
import SelectPickerComponent from "./Picker/SelectPicker";
import '../../../styles/modal.css';

const MemberDetailModal = ({updating, selectedMember, handleDetailChange, handleSave, handleUpdate, setShowDetailModal, setShowDeleteModal, selectedDate}) => {

    const handleDate = (date) => {
        handleDetailChange({target:{name:'memberDate', value:date}});
    }
    //console.log(selectedMember.memberDate)

    const memberDate = selectedMember.memberDate ? new Date(selectedMember.memberDate) : null;
    // Date 객체로 반환

    const handleJob = (value) => {
        handleDetailChange({target:{name:'memberJob', value}});
    }
    console.log(selectedMember.memberName)
    return(
        <>
        {/* 모달 배경
        <div
        className="modal-overlay"
        style={{
            position: "fixed",  // 화면 전체에 배경을 고정
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1040, // 모달 내용 위에 배경이 오도록
        }}
        onClick={() => setShowDetailModal(false)} // 배경 클릭 시 모달 닫기
    /> */}

{/* <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1"> */}
        <div 
                className="modal show" 
                style={{display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                tabIndex="-1"
            >
           {/* </div> <div className="modal-dialog"> */}
            <div className="modal-dialog" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">직원 상세</h5>
                        <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)}></button>
                    </div>

                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label>직원 사번</label>
                                <input
                                    type="text"
                                    name="memberId"
                                    value={selectedMember.memberId}
                                    onChange={handleDetailChange}
                                    readOnly
                                    className="form-control"
                                />
                            </div>

                            <div className="mb-3">
                                <label>직원 명</label>
                                <input
                                    type="text"
                                    name="memberName"
                                    value={selectedMember.memberName}
                                    onChange={handleDetailChange}
                                    disabled={!updating}
                                    className="form-control"
                                />
                            </div>

                            <div className="mb-3">
                                <label>직원 직책</label>
                                {updating ? (
                                  <SelectPickerComponent
                                    value={selectedMember.memberJob}
                                    handleJob={handleJob}
                                    readOnly={!updating}
                                    className="form-control"
                                />
                                ): (
                                  <input 
                                    type="text"
                                    value={selectedMember.memberJob}
                                    readOnly
                                    className="form-control"
                                  />
                                )}
                                
                            </div>

                            <div className="mb-3">

                                <label>직원 입사일</label>
                                <DatePickerComponent
                                    value={memberDate ? new Date(memberDate) : null}
                                    // LocalDate -> Date로 변환
                                    handleDate={handleDate}
                                    readOnly={true} // 항상 읽기전용으로 설정
                                    // -> datepicker 컴포에 
                                    dateFormat="yyyy-MM-dd"
                                    className="form-control"
                                />
                                </div>

                            <div className="mb-3">
                                <label>직원 연락처</label>
                                <input
                                    type="text"
                                    name="memberTel"
                                    value={selectedMember.memberTel}
                                    onChange={handleDetailChange}
                                    disabled={!updating}
                                    className="form-control"
                                />
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>
                            닫기
                        </button>
                        {updating ? (
                            <button type="button" className="btn btn-success" onClick={handleSave}>
                                저장
                            </button>
                    ) : (
                        <>
                            <button type="button" className="btn btn-warning" onClick={handleUpdate}>
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
    </>
  )  
};
export default MemberDetailModal