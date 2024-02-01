import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/actions';
import { selectUser } from '../../redux/selectors';
import { ROLE } from '../../constants/role';
import { useResetForm } from '../../hooks';
import { AuthFormError, AuthButton, Input, H2 } from '../../components/';
import { request } from '../../utils/request';

const registerFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин. Допускаются только буквы и цифры')
		.matches(/^\w+$/, 'Неверный логин')
		.min(3, 'Некорректный логин. Минимум 3 символа')
		.max(15, 'Некорректный логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните логин. Допускаются буквы, цифры и знаки # %')
		.matches(/^[\w#%]+$/, 'Неверный логин')
		.min(6, 'Некорректный пароль. Минимум 6 символов')
		.max(30, 'Некорректный пароль. Максимум 30 символов'),
	passcheck: yup
		.string()
		.required('Заполните повтор пароля')
		.oneOf([yup.ref('password'), null], 'Повтор пароля не совпадает'),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	fonst-size: 18px;
	color: blue;
`;

const RegistrationContainer = ({ className }) => {
	const [serverError, setServerError] = useState('');
	const dispatch = useDispatch();
	const { roleId } = useSelector(selectUser);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(registerFormSchema),
	});

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError =
		errors?.login?.message || errors?.password?.message || errors.passcheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					autoComplete="on"
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Проверка пароля..."
					autoComplete="on"
					{...register('passcheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<AuthButton type="submit" disabled={!!formError}>
					Зарегистрироваться
				</AuthButton>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<StyledLink to="/login">Есть учетная запись? Войти</StyledLink>
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
