import { request } from '../../utils/request';
import { LOGOUT } from '../action-types/action-types';

export const logout = () => {
	request('/logout', 'POST');

	return {
		type: LOGOUT,
	};
};
