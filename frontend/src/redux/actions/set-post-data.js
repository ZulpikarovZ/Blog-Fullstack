import { SET_POST_DATA } from '../action-types/action-types';

export const setPostData = (postData) => ({
	type: SET_POST_DATA,
	payload: postData,
});
