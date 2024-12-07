import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect,useState } from "react";
import ConfirmModal from './ConfirmModal';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

export default function AdminMypageView() {

    const [branch, setbranch] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [branchDelete, setBranchDelete] = useState(null);  // 삭제할 지점 코드 임시 저장

    // refresh 를 불러주면 branch 가 전체 데이터 가짐
    const refresh = () => {
        axios.get("/admin/mypage/list")
        .then(res => {
            setbranch(res.data);
        })
        .catch(error => {
            console.log(error);
        })
    };

    useEffect(() => {
        refresh()
    },[]);  // mount 되면 1회 실행

    const navigate = useNavigate();

    // 삭제 버튼 처리 이벤트 핸들러 함수
    const handleDelete = (branchCode) => {
        setBranchDelete(branchCode);  // 삭제할 지점 코드 설정
        setShowModal(true);              // 모달 열기
    };

    // 삭제 확인 시
    const confirmDelete = () => {
        axios.delete(`/admin/mypage/delete/${branchDelete}`)
            .then(() => {
                refresh();               // 데이터 새로고침
                setShowModal(false);     // 모달 닫기
            })
            .catch(error => console.log(error));
    };

    return (
        <>
            <Link to="/">홈페이지</Link>&nbsp;&nbsp;
            <Link to="/admin/mypage/insert">지점추가</Link>&nbsp;&nbsp;

            {/* 모달 표시 */}
            {showModal && (
                <ConfirmModal 
                    message="정말로 이 지점을 삭제하시겠습니까?" 
                    onConfirm={confirmDelete} 
                    onCancel={() => setShowModal(false)} 
                />
            )}

            <h1>* 지점 목록 *</h1>
            <table>
                <thead>
                    <tr>
                        <th>지점 코드</th><th>지점 패스워드</th><th>지점명</th><th>지점 번호</th><th>지점 주소</th><th>지점 설명</th><th>수정</th><th>삭제</th>
                    </tr>
                </thead>

                <tbody>
                    {branch.map(data => 
                    <tr key={data.branchCode}>
                        <td>{data.branchCode}</td>
                        <td>{data.branchPw}</td>
                        <td>{data.branchName}</td>
                        <td>{data.branchTel}</td>
                        <td>{data.branchAddress}</td>
                        <td>{data.branchNote}</td>
                        <td>
                            <button className="modal-button" onClick={() => {navigate(`/admin/mypage/update/${data.branchCode}`)}}>수정</button>
                        </td>

                        <td>
                            <button className="modal-button" onClick={() => handleDelete(data.branchCode)}>삭제</button>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}