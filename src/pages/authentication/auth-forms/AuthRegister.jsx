import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { values } from 'lodash';
import { Postcode } from './PostCode';

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {
  const navigate = useNavigate();
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  const handleSignup = (values, { setSubmitting, setErrors }) => {
    //console.log("Sent data: ", values);
    axios
      .post('http://localhost:8080/main/signup', values)
      .then((response) => {
        if (response.status === 200) {
          alert('회원가입 완료');
          navigate('/login');
        }
      })
      .catch((error) => {
        if (error.response) {
          const { code, message } = error.response.data;
          if (code === 'DI') {
            setErrors({ submit: '이미 사용 중인 아이디 입니다.' });
          } else if (code == 'DM') {
            setErrors({ submit: '이미 사용 중인 이메일 입니다.' });
          } else if (code == 'DP') {
            setErrors({ submit: '이미 사용 중인 번호 입니다.' });
          } else if (error.response.status === 500) {
            setErrors({ submit: '각 항목의 형식에 맞게 입력해주세요.' });
          }
        } else {
          setErrors({ submit: '서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.' });
        }
      })
      .finally(() => {
        setSubmitting(false); // 폼 제출 실패시 회원가입 버튼 재활성화
      });
  };
  return (
    <>
      <Formik
        initialValues={{
          adminId: '',
          adminPw: '',
          adminName: '',
          adminBirth: '',
          adminPhone: '',
          adminEmail: '',
          adminPostcode: '',
          adminAddress1: '',
          adminAddress2: '',
          adminTerm1: true,
          adminTerm2: true,
          adminTerm3: false,
          submit: null
        }}
        validationSchema={Yup.object().shape({
          adminId: Yup.string()
            .min(2, '아이디는 최소 2자 이상이어야 합니다.')
            .max(20, '아이디는 최대 20자 이하여야 합니다.')
            .matches(/^[A-Za-z][A-Za-z0-9]{1,19}$/, '아이디는 영문자와 숫자만 포함하며, 2자 이상 20자 이하로 입력해야 합니다.')
            .required('아이디는 필수 입력입니다.'),
          adminPw: Yup.string()
            .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
            .max(20, '비밀번호는 최대 20자 이하여야 합니다.')
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/,
              '비밀번호는 최소 8자 이상 최대 20자 이하, 숫자, 특수문자, 영문자가 포함되어야 합니다.'
            )
            .required('비밀번호는 필수 입력입니다.'),
          adminName: Yup.string()
            .max(20)
            .matches(/^[a-zA-Z가-힣]{2,20}$/, '이름은 한글과 영어만 입력해야 합니다.')
            .required('이름은 필수 입력입니다.'),
          adminBirth: Yup.string()
            .length(8, '생년월일은 숫자 8자리로 입력해야합니다.')
            .matches(/^\d{8}$/, '생년월일은 YYYYMMDD 형식이어야 합니다.')
            .required('생년월일은 필수 입력입니다.'),
          adminPhone: Yup.string()
            .length(11, '휴대전화 번호는 11자로 입력해야 합니다.')
            .matches(/^[0-9]{11}$/, "'-'를 제외한 숫자 11자리를 입력해주세요.")
            .required('휴대전화 번호는 필수 입력입니다.'),
          adminEmail: Yup.string().email('이메일 형식에 맞춰 입력해주세요.').max(255).required('이메일은 필수 입력입니다.'),
          adminPostcode: Yup.string().required('우편번호는 필수 입력입니다.'),
          adminAddress1: Yup.string().required('도로명주소는 필수 입력입니다.'),
          adminAddress2: Yup.string().required('상세주소는 필수 입력입니다.')
        })}
        onSubmit={handleSignup}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="id-signup">아이디</InputLabel>
                  <OutlinedInput
                    id="id-signup"
                    type="text"
                    value={values.adminId}
                    name="adminId"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="아이디는 영문자와 숫자로만 입력해주세요."
                    fullWidth
                    error={Boolean(touched.adminId && errors.adminId)}
                  />
                </Stack>
                {touched.adminId && errors.adminId && (
                  <FormHelperText error id="helper-text-id-signup">
                    {errors.adminId}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">비밀번호</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.adminPw && errors.adminPw)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.adminPw}
                    name="adminPw"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="8자 이상 20자 이하로 입력해주세요."
                    inputProps={{}}
                  />
                </Stack>
                {touched.adminPw && errors.adminPw && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.adminPw}
                  </FormHelperText>
                )}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name-signup">이름</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.adminName && errors.adminName)}
                    id="name-signup"
                    type="text"
                    value={values.adminName}
                    name="adminName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="한글과 영어만 입력해주세요."
                    inputProps={{}}
                  />
                </Stack>
                {touched.adminName && errors.adminName && (
                  <FormHelperText error id="helper-text-name-signup">
                    {errors.adminName}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="birth-signup">생년월일</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.adminBirth && errors.adminBirth)}
                    id="birth-signup"
                    type="text"
                    value={values.adminBirth}
                    name="adminBirth"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                    placeholder="YYYYMMDD 형식으로 입력해주세요."
                  />
                </Stack>
                {touched.adminBirth && errors.adminBirth && (
                  <FormHelperText error id="helper-text-birth-signup">
                    {errors.adminBirth}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">이메일</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.adminEmail && errors.adminEmail)}
                    id="email-signup"
                    type="email"
                    value={values.adminEmail}
                    name="adminEmail"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="이메일 형식에 맞춰 입력해주세요."
                    inputProps={{}}
                  />
                </Stack>
                {touched.adminEmail && errors.adminEmail && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.adminEmail}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phone-signup">휴대전화</InputLabel>
                  <OutlinedInput
                    id="phone-signup"
                    type="text"
                    value={values.adminPhone}
                    name="adminPhone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="'-'를 제외한 숫자 11자리를 입력해주세요."
                    fullWidth
                    error={Boolean(touched.adminPhone && errors.adminPhone)}
                  />
                </Stack>
                {touched.adminPhone && errors.adminPhone && (
                  <FormHelperText error id="helper-text-phone-signup">
                    {errors.adminPhone}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={7.5}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="postcode-signup">우편번호</InputLabel>
                  <OutlinedInput
                    id="postcode-signup"
                    type="text"
                    value={values.adminPostcode}
                    name="adminPostcode"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="우편번호"
                    fullWidth
                    readOnly
                    error={Boolean(touched.adminPostcode && errors.adminPostcode)}
                  />
                </Stack>
                {touched.adminPostcode && errors.adminPostcode && (
                  <FormHelperText error id="helper-text-postcode-signup">
                    {errors.adminPostcode}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={4.5}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="address1-signup">&nbsp;</InputLabel>
                  <Postcode setFieldValue={setFieldValue} />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="address1-signup">도로명 주소</InputLabel>
                  <OutlinedInput
                    id="address1-signup"
                    type="text"
                    value={values.adminAddress1}
                    name="adminAddress1"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="도로명 주소"
                    fullWidth
                    readOnly
                    error={Boolean(touched.adminAddress1 && errors.adminAddress1)}
                  />
                </Stack>
                {touched.adminAddress1 && errors.adminAddress1 && (
                  <FormHelperText error id="helper-text-address1-signup">
                    {errors.adminAddress1}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="address2-signup">상세 주소</InputLabel>
                  <OutlinedInput
                    id="address2-signup"
                    type="text"
                    value={values.adminAddress2}
                    name="adminAddress2"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="상세 주소"
                    fullWidth
                    error={Boolean(touched.adminAddress2 && errors.adminAddress2)}
                  />
                </Stack>
                {touched.adminAddress2 && errors.adminAddress2 && (
                  <FormHelperText error id="helper-text-address2-signup">
                    {errors.adminAddress2}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  회원가입 시 &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    서비스 이용 약관
                  </Link>
                  과 &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    개인 정보 보호 정책
                  </Link>
                  에 동의하게 됩니다.
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    회원가입
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
