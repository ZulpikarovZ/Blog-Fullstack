import styled from 'styled-components';
import { StyledUserRow, UserItem, H2, PrivateContent } from '../../components';
import { useEffect, useState } from 'react';
import { ROLE } from '../../constants/role';
import { checkAccess } from '../../utils/check-access';
import { useSelector } from 'react-redux';
import { selectUserRoleId } from '../../redux/selectors';
import { request } from '../../utils/request';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
	const userRole = useSelector(selectUserRoleId);

	new useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		Promise.all([request('/users'), request('/users/roles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}

				setUsers(usersRes.data);
				setRoles(rolesRes.data);
			},
		);
	}, [shouldUpdateUserList]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		request(`/users/${userId}`, 'DELETE').then(() =>
			setShouldUpdateUserList(!shouldUpdateUserList),
		);
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
				<H2>Пользователи</H2>
				<StyledUserRow className="user-header-row">
					<div className="table-login">Логин</div>
					<div className="table-reg-date">Дата регистрации</div>
					<div className="table-role">Роль</div>
				</StyledUserRow>
				{users.map((user) => (
					<UserItem
						key={user.id}
						user={user}
						roles={roles.filter((role) => role.id !== ROLE.GUEST)}
						onUserRemove={() => onUserRemove(user.id)}
					/>
				))}
			</div>
		</PrivateContent>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& .user-header-row {
		margin: 0 0 10px -30px;
	}
`;
