import { REMOVE_COMMENT } from '../action-types/action-types';

export const removeComment = (commentId) => ({
	type: REMOVE_COMMENT,
	payload: commentId,
});
