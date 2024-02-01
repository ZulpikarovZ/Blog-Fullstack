import { OPEN_MODAL } from '../action-types/action-types';

export const openModal = (modalParams) => ({
	type: OPEN_MODAL,
	payload: modalParams,
});
