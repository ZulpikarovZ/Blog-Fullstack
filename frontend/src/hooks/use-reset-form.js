import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectApp } from '../redux/selectors';

export const useResetForm = (reset) => {
	const { wasLogout } = useSelector(selectApp);

	useEffect(() => {
		return reset();
	}, [wasLogout, reset]);
};
