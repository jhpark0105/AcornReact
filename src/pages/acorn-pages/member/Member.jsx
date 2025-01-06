
import React, { useEffect, useState } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'rsuite/SelectPicker/styles/index.css';
import MemberList from "./MemberList";
import CreateMember from "./CreateMember";
import MemberDetail from "./MemberDetail";
import MemberDelete from "./MemberDelete";
import 'rsuite/dist/rsuite.min.css';

function App() {
  const [members, setMembers] = useState([]);
  const [state, setState] = useState({});
  const [showModal,setShowModal] = useState(false); // 등록 모달 상태 관리
  const [selectedMember, setSelectedMember] = useState(null); // 상세보기 데이터
  const [showDetailModal, setShowDetailModal] = useState(false); // 상세보기 모달
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 삭제 확인 모달
  const [updating, setUpdating] = useState(false); // 수정 모드 상태

  useEffect(() => {
    fetchMembers();
  }, []);

  // 전체 직원 목록  출력
  const fetchMembers = () => {
    axios.get("http://localhost:8080/member")
    .then((response) => {
      setMembers(response.data);
    })
    .catch((error) => {
      toast.error("직원 정보를 불러오는 데 오류가 발생했습니다.");
      console.log("Error fetching members : ", error);
    });
  };

  state.memberJoinDate = new Date().toISOString();
  // 입력 폼에서 값 변경 시 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: name ===  "memberJoinDate" ? new Date(value).toISOString() : value// 변경된 값 상태 반영
    });
  };

  // insertProcess
  const insertProcess = (e) => {
    console.log(state);
    // 필수 필드 비어져있을 때 
    if(!state.memberName || !state.memberId) {
      toast.error("직원 사번과 직원 이름을 입력해주세요");
      return ;
    }

    axios.post("http://localhost:8080/member", state)
    // state를 요청 본문에 포함
    .then((response) => {
      if(response.data.Success) {
        toast.success(response.data.message);
        setShowModal(false); // insert 모달 닫기
        setState({}); // 상태 초기화 
        fetchMembers(); // 리로딩 후 최신 직원 데이터 불러오기
      } else {
        toast.error(response.data.message); // 실패메시지 출력 
      }
    })
    .catch((error) => {
      toast.error("직원 등록 중 오류가 발생했습니다.");
      console.log("member insert : " + error);
    });
  };

  // 특정 직원 상세 정보 표시
  const handleDetail = (member) => {
    setSelectedMember(member); // 선택한 직원 데이터를 상태에 저장
    setShowDetailModal(true); // 상세보기 모달 열기
    setUpdating(false); // update 모드 초기화
  };

  // 상세보기 모달에서 update 모드로 전환
  const handleUpdate = () => {// update 모드 활성화
    setUpdating(true);
  };

  // updateProcess
  const handleSave = () => {
    axios.put(`http://localhost:8080/member/${selectedMember.memberId}`, {...selectedMember})
    // 새로운 객체를 만들어서 변경하는 것이 좋아 
    .then((response) => {
      if(response.data.Success) {
        toast.success("직원 정보를 수정하였습니다.");
        setUpdating(false); // update 모드 종료
        setShowDetailModal(false); // update 모달 닫기
        fetchMembers(); // 리로딩 후 최신 데이터 불러옴 
      }
    })
    .catch((error) => {
      toast.error("직원 정보 수정 중 오류가 발생했습니다.");
      console.log("update Error : " + error);
    });
  };

  // 상세보기 모달에서 입력 값 변경 시 상태 업데이트
  const handleDetailChange = (e) => {
    console.log(e.target.value)
    setSelectedMember({
      ...selectedMember,
      [e.target.name] : e.target.value, // 변경된 입력값 상태에 반영 
    });
  };

  // deleteProcess
  const handleDelete = () => {
    if(selectedMember) {
      axios.delete(`http://localhost:8080/member/${selectedMember.memberId}`)
      .then((response) => {
        if(response.data.Success) {
          toast.success("직원 정보를 삭제했습니다.");
          setShowDeleteModal(false); // 삭제 모달 닫기
          setShowDetailModal(false); // 상세정보 보기 모달 닫기
          fetchMembers(); // 리로딩 후 최신 데이터 불러오기 
        }
      })
      .catch((error) => {
        toast.error("직원 삭제 중 오류가 발생했습니다.")
        console.log("deleting member Error : " + error);
      });
    };
  };


  return (
    <div className="App" style={{position:'relative'}}>
      

      <ToastContainer />
      <MemberList
        members={members} // 직원 목록 데이터 전달
        handleDetail={handleDetail} // 직원 상세보기 이벤트 처리하는 함수
        fetchMembers={fetchMembers} // 직원을 가져오는 함수
        setShowModal={setShowModal} // 모달 창을 열기 위한 상태 설정 함수
      />

      {showModal && <CreateMember // showModal이 true일 경우 새 서비스 생성 모달 보기
        handleChange={handleChange} // 입력값 변경 처리
        insertProcess={insertProcess} // 새 직원 추가
        setShowModal={setShowModal}  // 모달 닫음
        //handlePicker={handlePicker} // 함수 전달
        show={showModal} // show props 추가
      />}

      {showDetailModal && selectedMember && (
        // showDetailModal이 true고 selectedMember가 존재할 경우, 직원 상세보기 모달 출력
        <MemberDetail 
         updating={updating} // 수정 가능 여부 결정
         selectedMember={selectedMember} // 선택된 직원 데이터
         handleDetailChange={handleDetailChange} // 상세정보 변경
         handleSave={handleSave} // 변경 정보 저장
         handleUpdate={handleUpdate} // 수정 모드로 전환
         setShowDetailModal={setShowDetailModal} // 상세 모달창 
         setShowDeleteModal={setShowDeleteModal} // 삭제 확인 모달
        />
      )}

      {showDeleteModal && (
        <MemberDelete 
          selectedMember={selectedMember}
          handleDelete={handleDelete} // 삭제 작업
          setShowDeleteModal={setShowDeleteModal} // 삭제 모달 닫기
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} // 모달 위치 중앙으로 설정
        />
      )}

    </div>
  );
}

export default App;
