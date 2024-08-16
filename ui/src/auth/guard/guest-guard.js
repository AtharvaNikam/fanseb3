import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
// routes
import { useRouter } from 'src/routes/hook';
//
import { PATH_AFTER_LOGIN } from 'src/config-global';
import { useUserRoles } from 'src/utils/constant';
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const router = useRouter();

  const { authenticated } = useAuthContext();

  const userRoles = useUserRoles();
  const check = useCallback(() => {
    const isAdmin = userRoles?.includes('admin');
    const isBrand = userRoles?.includes('brand');
    const isInfluencer = userRoles?.includes('influencer');
    if (authenticated) {
      if (isAdmin) router.push('/admin-dashboard');
      else if (isInfluencer) router.push('/influencer-dashboard');
      else if (isBrand) router.push('/brand-dashboard');
      else router.push(PATH_AFTER_LOGIN);
    }
  }, [authenticated, router, userRoles]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}

GuestGuard.propTypes = {
  children: PropTypes.node,
};
