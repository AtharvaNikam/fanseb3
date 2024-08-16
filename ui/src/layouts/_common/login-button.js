import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
// routes
import { useRouter } from 'src/routes/hook';
// config

// ----------------------------------------------------------------------

export default function LoginButton({ sx }) {
  const router = useRouter();
  const clearUser = async () => {
    await localStorage.removeItem('permissions');
    await localStorage.removeItem('accessToken');
    // router.push(PATH_AFTER_LOGIN_CUSTOMER);
  };
  const loginUser = () => {
    // clearUser();
    router.push('/auth/customer/login');
  };
  return (
    <Button
      // component={RouterLink}
      // href={PATH_AFTER_LOGIN_CUSTOMER}
      onClick={loginUser}
      variant="outlined"
      sx={{
        mr: 1,
        color: 'text.primary',
        ...sx,
      }}
    >
      Login
    </Button>
  );
}

LoginButton.propTypes = {
  sx: PropTypes.object,
};
