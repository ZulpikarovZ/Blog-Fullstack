import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { StyledUserRow } from '../';
import { useState } from 'react';
import { request } from '../../utils/request';

const UserItemContainer = ({ className, user, roles, onUserRemove }) => {
	const [initailRoleId, setInintialRoleId] = useState(user.roleId);
	const [selectedRoleId, setSelectedRoleId] = useState(user.roleId);

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onSaveRole = (userId, userRoleId) => {
		request(`/users/${userId}`, 'PATCH', { roleId: userRoleId }).then(() => {
			setInintialRoleId(userRoleId);
		});
	};

	const isSaveButtonDisabled = initailRoleId === selectedRoleId;

	return (
		<div className={className}>
			<StyledUserRow className="user-row">
				<div className="table-login">{user.login}</div>
				<div className="table-reg-date">{user.registeredAt}</div>
				<div className="table-role">
					<select
						className="select-role"
						value={selectedRoleId}
						onChange={onRoleChange}
					>
						{roles.map((role) => (
							<option key={role.id} value={role.id}>
								{role.name}
							</option>
						))}
					</select>
					<Icon
						id="fa-floppy-o"
						disabled={isSaveButtonDisabled}
						onClick={() => onSaveRole(user.id, selectedRoleId)}
					/>
				</div>
			</StyledUserRow>
			<Icon id="fa-trash-o" onClick={onUserRemove} />
		</div>
	);
};

export const UserItem = styled(UserItemContainer)`
	margin-bottom: 11px;
	display: flex;
	align-items: center;

	& .user-row {
		height: 45px;
		outline: 2px solid black;
		border-radius: 3px;
		margin-right: 11px;
		display: flex;
		align-items: center;
	}

	& .table-role {
		display: flex;
	}
`;
