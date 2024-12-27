import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { TextField, Checkbox, FormControlLabel, Button, Box, Typography, Container, Paper } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 스타일

export default function NoticeCreate() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null); // 이미지 상태 추가
    const [imagePreview, setImagePreview] = useState(''); // 이미지 미리보기 상태 추가
    const [loading, setLoading] = useState(false); // 로딩 상태

    // 입력 폼 상태 초기화
    const [formData, setFormData] = useState({
        noticeTitle: '',
        noticeCheck: false,
        noticeContent: '',
    });

    // 입력 필드 변경 핸들러
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
            // 파일 크기 제한 (예: 5MB)
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                toast.error('파일 크기는 5MB를 초과할 수 없습니다.');
                return;
            }
    
            // 이미지 파일 형식 체크 (PNG, JPG, JPEG)
            if (['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
                setImage(file);
    
                // 이미지 미리보기 URL 설정
                const reader = new FileReader();
                reader.onloadend = () => setImagePreview(reader.result);
                reader.readAsDataURL(file);
            } else {
                toast.error('PNG, JPG, JPEG 파일만 업로드 가능합니다.');
            }
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!formData.noticeTitle.trim() || !formData.noticeContent.trim()) {
            toast.error('제목과 내용을 모두 입력해주세요.');
            return;
        }
    
        setLoading(true);
    
        const formDataToSend = new FormData();
        formDataToSend.append('dto', new Blob([JSON.stringify(formData)], { type: 'application/json' }));
        if (image) {
            formDataToSend.append('image', image);
        }
    
        axios.post('http://localhost:8080/notice', formDataToSend)
            .then((response) => {
                if (response.data.isSuccess) {
                    return axios.get('http://localhost:8080/notice/latest');
                } else {
                    throw new Error(response.data.message);
                }
            })
            .then((latestNoResponse) => {
                const latestNoticeNo = latestNoResponse.data.noticeNo;
                navigate(`/main/notice/${latestNoticeNo}`);
            })
            .catch((err) => toast.error(err.message || '공지 작성 중 오류가 발생했습니다.'))
            .finally(() => setLoading(false));
    };

    return (
        <>
            <ToastContainer />

            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        공지사항 작성
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="noticeTitle"
                            label="공지 제목"
                            name="noticeTitle"
                            value={formData.noticeTitle}
                            onChange={handleChange}
                            autoFocus
                        />
                        <FormControlLabel
                            control={<Checkbox checked={formData.noticeCheck} onChange={handleChange} name="noticeCheck" />}
                            label="중요한 공지"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="noticeContent"
                            label="본문"
                            id="noticeContent"
                            multiline
                            rows={4}
                            value={formData.noticeContent}
                            onChange={handleChange}
                        />
                        <Box sx={{ mt: 2 }}>
                            {/* 파일 업로드 */}
                            <div className="input-group mb-3">
                                <input
                                    type="file"
                                    className="form-control"
                                    id="inputGroupFile02"
                                    accept="image/*"
                                    onChange={handleImageChange} // 이미지 파일 변경 시
                                />
                            </div>
                            {/* 이미지 미리보기 */}
                            {imagePreview && (
                                <Box sx={{ mt: 2, display: 'inline-block' }}>
                                    <img
                                        src={imagePreview}
                                        alt="이미지 미리보기"
                                        style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
                                    />
                                </Box>
                            )}
                        </Box>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="button" variant="outlined" onClick={() => navigate(-1)}>
                                취소
                            </Button>
                            <Button type="submit" variant="contained" disabled={loading}>
                                {loading ? '로딩 중...' : '작성'}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}