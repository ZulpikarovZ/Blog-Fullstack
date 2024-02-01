import { OPEN_MODAL, LOGOUT, CLOSE_MODAL } from '../action-types/action-types';

const userInitialState = {
	wasLogout: false,
	modal: {
		isOpen: false,
		text: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
};

export const appReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			};

		case OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...action.payload,
					isOpen: true,
				},
			};

		case CLOSE_MODAL:
			return { ...userInitialState };

		default:
			return state;
	}
};
