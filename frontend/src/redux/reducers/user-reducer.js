import { ROLE } from '../../constants/role';
import { LOGOUT, SET_USER } from '../action-types/action-types';

const userInitialState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
};

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				...action.payload,
			};

		case LOGOUT:
			return userInitialState;

		default:
			return state;
	}
};
