import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import FirebaseSocial from './FirebaseSocial';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin({ isDemo = false }) {
  // useNavigate 객체 생성
  const navigate = useNavigate();

  // 아이디 기억하기 체크박스 상태 관리
  const [checked, setChecked] = React.useState(false);

  // 비밀번호 표시 여부 상태 관리
  const [showPassword, setShowPassword] = React.useState(false);

  // 비밀번호 표시/숨기기 토글 함수
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // 비밀번호 표시 버튼 클릭 시 기본 이벤트 방지
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // 컴포넌트 마운트 시 쿠키에서 아이디 및 체크박스 상태 불러오기
  useEffect(() => {
    const savedUserId = Cookies.get('savedUserId'); // 쿠키에 저장된 아이디 가져오기
    const savedChecked = Cookies.get('checked') === 'true'; // 체크박스 상태 가져오기

    if (savedChecked) {
      setChecked(true); // 체크박스 체크 시 상태 업데이트
    }
  }, []);

  // 로그인 처리
  const handleLogin = (values, { setSubmitting, setErrors }) => {

        // 체크박스 상태에 따라 쿠키 저장/삭제
        if (checked) {
          Cookies.set('savedUserId', values.id, { expires: 7 }); // 아이디 7일 동안 유지
          Cookies.set('checked', 'true', { expires: 7 }); // 체크된 상태 7일동안 저장
        } else {
          Cookies.remove('savedUserId'); // 체크 해제시 쿠키에 저장된 상태 삭제
          Cookies.remove('checked');
        }
    // 로그인 요청
    axios.post('http://localhost:8080/main/login', values, {
        withCredentials: true // 쿠키 포함 요청
      })
      .then((response) => {
        if (response.status === 200) {
          const {branchCode} = response.data;
          localStorage.setItem('branchCode', branchCode);
          //alert('로그인 성공');
          navigate('/main/dashboard'); // 로그인 성공 시 대시보드로 이동
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrors({ submit: '아이디 또는 비밀번호가 올바르지 않습니다.' }); // 로그인 실패 시 에러 메시지 설정
          //alert("로그인 실패");
        } else {
          console.error('로그인 에러: ', error); // 기타 에러 로그
        }
      })
      .finally(() => {
        setSubmitting(false); // 폼 제출 실패시 로그인 버튼 재활성화
      });
  };
  return (
    <>
      <Formik
        initialValues={{ // 초기값
          id: Cookies.get('savedUserId') || '', // 초기값으로 쿠키에서 저장된 아이디 또는 빈 문자열 설정
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({ // 유효성 검사
          id: Yup.string().max(20).required('아이디는 필수 입력 항목입니다.'),
          password: Yup.string().max(20).required('비밀번호는 필수 입력 항목입니다.')
        })}
        onSubmit={handleLogin} // handleLogin 함수 연결
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="id-login">아이디</InputLabel>
                  <OutlinedInput
                    id="id-login"
                    type="text"
                    value={values.id}
                    name="id"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="아이디를 입력하세요"
                    fullWidth
                    error={Boolean(touched.id && errors.id)}
                  />
                </Stack>
                {touched.id && errors.id && (
                  <FormHelperText error id="standard-weight-helper-text-id-login">
                    {errors.id}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">비밀번호</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="비밀번호 표시 여부 변경"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="비밀번호를 입력하세요."
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">아이디 기억하기</Typography>}
                  />
                  {/* <Link variant="h6" component={RouterLink} color="text.primary">
                    아이디 / 비밀번호 찾기 (기능 미개발, 주석처리)
                  </Link> */}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    로그인
                  </Button>
                </AnimateButton>
              </Grid>
              {/* <Grid item xs={12}> 
                <Divider>
                  <Typography variant="caption">소셜 계정으로 로그인 (기능 미개발, 주석처리)</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid> */}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

AuthLogin.propTypes = { isDemo: PropTypes.bool };
