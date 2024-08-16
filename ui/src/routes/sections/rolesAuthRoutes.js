import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useUserRoles } from 'src/utils/constant';

export function RolesAuthRoute({ children, roles }) {
  const userRoles = useUserRoles();

  const canAccess = userRoles ? userRoles.some((userRole) => roles.includes(userRole)) : null;
  console.log('🚀 ~ canAccess:', canAccess);

  if (canAccess) return <>{children}</>;

  return <Navigate to="/404" />;
}
RolesAuthRoute.propTypes = {
  children: PropTypes.object,
  roles: PropTypes.array,
};
