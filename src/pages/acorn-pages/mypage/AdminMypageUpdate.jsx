import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmModal from './ConfirmModal';
import { Postcode } from './PostCode'; // 주소
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

export default function AdminUpdateForm() {
    const { branchCode } = useParams();  // URL에서 지점 코드 호출
    const [showModal, setShowModal] = useState(false);  // 모달 상태 관리
    const navigate = useNavigate();

    const [state, setState] = useState({
        branchCode: "",
        branchPw: "",
        branchName: "",
        branchTel: "",
        branchAddress: "",
        branchNote: "",
    });

    // 컴포넌트 마운트 시 해당 지점 정보 불러오기
    useEffect(() => {
        axios.get(`/admin/mypage/${branchCode}`)
            .then(res => {
                setState(res.data);  // 지점 정보 설정
            })
            .catch(error => {
                console.error('지점 정보 불러오기 실패:', error);
            });
    }, [branchCode]);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value  // 입력 값 업데이트
        });
    };

    // 수정 버튼 클릭 시 모달 표시
    const handleUpdate = () => {
        setShowModal(true);  // 수정 확인 모달 열기
    };

    // 모달에서 수정 확인 시 PUT 요청 보내기
    const confirmUpdate = () => {
        axios.put(`/admin/mypage/update/${branchCode}`, state)
            .then(res => {
                if (res.data === 'isSuccess') {
                    navigate('/admin/mypage/view');  // 수정 후 목록 보기 페이지로 이동
                }
            })
            .catch(error => {
                console.error('지점 수정 중 오류:', error);
            })
            .finally(() => {
                setShowModal(false);  // 모달 닫기
            });
    };

    return (
        <div>
            {/* 수정 확인 모달 */}
            {showModal && (
                <ConfirmModal 
                    message="정말로 이 지점을 수정하시겠습니까?" 
                    onConfirm={confirmUpdate} 
                    onCancel={() => setShowModal(false)} 
                />
            )}

            <h2>지점 수정</h2>
            지점 코드: <input onChange={handleChange} type='text' name='branchCode' value={state.branchCode} />
            <br/>
            지점 패스워드: <input onChange={handleChange} type='text' name='branchPw' value={state.branchPw} />
            <br/>
            지점명: <input onChange={handleChange} type='text' name='branchName' value={state.branchName} />
            <br/>
            지점 번호: <input onChange={handleChange} type='text' name='branchTel' value={state.branchTel} />
            <br/>
            지점 주소: <input onChange={handleChange} type='text' name='branchAddress' value={state.branchAddress} />
            <br/>
            {/* Postcode 컴포넌트 사용 */}
            <Postcode setState={setState} />
            지점 설명: <input onChange={handleChange} type='text' name='branchNote' value={state.branchNote} />
            <br/>
            <button onClick={handleUpdate}>지점 수정</button>
        </div>
    );
}
