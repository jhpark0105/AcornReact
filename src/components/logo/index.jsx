import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

// project import
import Logo from './LogoMain';
import config from 'config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => {
  return (
    <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
      <Stack direction="row" spacing={1} alignItems="center">

        {/* 로고 예시. 언제든지 다른 걸로 바꿔도 됨 */}
        <Typography variant='h5' color='primary' align='center' >
          뷰티샵 ERP
        </Typography>

        {/*<Logo />*/} {/* mantis 로고 ("mantis"란 글자도 포함된 하나의 이미지 파일임) (사이드바 좌상에 있는 로고) */} 
        
        {/* <Chip
          label={import.meta.env.VITE_APP_VERSION}
          variant="outlined"
          size="small"
          color="secondary"
          sx={{ mt: 0.5, ml: 1, fontSize: '0.725rem', height: 20, '& .MuiChip-label': { px: 0.5 } }}
        /> */}
      </Stack>
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;