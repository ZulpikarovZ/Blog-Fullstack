import { Error } from '../error/error';
import { useSelector } from 'react-redux';
import { selectUserRoleId } from '../../redux/selectors';
import { ERROR } from '../../constants';
import { checkAccess } from '../../utils/check-access';

export const PrivateContent = ({ children, access, serverError = null }) => {
	const userRole = useSelector(selectUserRoleId);

	const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED;
	const error = serverError || accessError;

	return error ? <Error error={error} /> : children;
};
