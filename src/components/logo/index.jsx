import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

// 로고 이미지 import (favicon.ico 또는 다른 파일)
import logo from 'src/assets/favicon.ico'; // 경로 확인 필요

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => {
  return (
    <ButtonBase disableRipple component={Link} to={to ? to : '/'} sx={sx}>
      <Stack direction="row" spacing={1} alignItems="center">
        {/* 로고 이미지 추가 */}
        <img src={logo} alt="Logo" style={{ width: 40, height: 40 }} /> {/* 크기 조정 */}
        <Typography variant="h5" align="center">
          ACORN BEAUTY
        </Typography>
      </Stack>
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;
