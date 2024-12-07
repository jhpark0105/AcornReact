import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmModal from './ConfirmModal';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

// 회원 추가 폼 컴포넌트
export default function AdminMypageInsert() {
    const navigate = useNavigate();
    const [state, setState] = useState({});
    const [showModal, setShowModal] = useState(false);  // 모달 상태 관리

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    };

    // 추가 버튼 클릭 시 모달 표시
    const handleInsert = () => {
        setShowModal(true);  // 추가 확인 모달 열기
    };

    const ConfirmInsert = () => {
        axios.post('/admin/mypage/insert', state)
            .then(res => {
                if(res.data === 'isSuccess') {
                    navigate('/admin/mypage/view');   // 추가 후 목록보기(LINK)
                }
            })
            .catch(error => {
                console.log('지점 추가 중 오류:', error);
            })
            .finally(() => {
                setShowModal(false); // 모달 닫기
            });
    };

    return (
        <div>
            {/* 추가 확인 모달 */}
            {showModal && (
                <ConfirmModal 
                    message="정말로 이 지점을 추가하시겠습니까?" 
                    onConfirm={ConfirmInsert} 
                    onCancel={() => setShowModal(false)} 
                />
            )}

            <h2>새 지점 등록</h2>
            지점 코드 : <input onChange={handleChange} type='text' name='branchCode' placeholder='지점 코드' />
            <br/>
            지점 패스워드 : <input onChange={handleChange} type='text' name='branchPw' placeholder='지점 패스워드' />
            <br/>
            지점명 : <input onChange={handleChange} type='text' name='branchName' placeholder='지점명' />
            <br/>
            지점 번호 : <input onChange={handleChange} type='text' name='branchTel' placeholder='지점 번호' />
            <br/>
            지점 주소 : <input onChange={handleChange} type='text' name='branchAddress' placeholder='지점 주소' />
            <br/>
            지점 설명 : <input onChange={handleChange} type='text' name='branchNote' placeholder='지점 설명' />
            <br/>
            <button onClick={handleInsert}>지점 등록</button>
        </div>
    );
}