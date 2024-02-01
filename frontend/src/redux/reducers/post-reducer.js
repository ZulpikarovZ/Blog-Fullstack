import {
	ADD_COMMENT,
	REMOVE_COMMENT,
	RESET_POST_DATA,
	SET_POST_DATA,
} from '../action-types/action-types';

const postInitialState = {
	id: '',
	title: '',
	imageUrl: '',
	content: '',
	publishedAt: '',
	comments: [],
};

export const postReducer = (state = postInitialState, action) => {
	switch (action.type) {
		case SET_POST_DATA:
			return { ...state, ...action.payload };

		case RESET_POST_DATA:
			return postInitialState;

		case ADD_COMMENT:
			return { ...state, comments: [...state.comments, action.payload] };

		case REMOVE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(({ id }) => id !== action.payload),
			};

		default:
			return state;
	}
};
