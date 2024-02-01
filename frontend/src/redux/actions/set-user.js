import { SET_USER } from '../action-types/action-types';

export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});
