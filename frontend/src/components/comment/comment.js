import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal, removeCommentAsync } from '../../redux/actions';
import { Icon } from '../';
import { selectUserRoleId } from '../../redux/selectors';
import { ROLE } from '../../constants';

const CommentCotainer = ({ className, comment, postId }) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRoleId);

	const isAdminOrModer = [ROLE.ADMIN, ROLE.MODER].includes(userRole);

	const onCommentRemove = (commentId) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(commentId, postId));
					dispatch(closeModal());
				},
				onCancel: () => dispatch(closeModal()),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="comment">
				<div className="header">
					<div className="author">
						<Icon id="fa-user-circle-o" size="20px" margin="0 10px 0 0" />
						{comment.author}
					</div>
					<div className="calendar">
						<Icon id="fa-calendar-o" size="20px" margin="0 10px 0 0" />
						{comment.publishedAt}
					</div>
				</div>
				<div className="text">{comment.content}</div>
			</div>
			{isAdminOrModer && (
				<Icon
					id="fa-trash-o"
					size="18px"
					margin="0 0 0 10px"
					onClick={() => onCommentRemove(comment.id)}
				/>
			)}
		</div>
	);
};

export const Comment = styled(CommentCotainer)`
	display: flex;

	& .comment {
		width: 550px;
		outline: 1px solid #666;
		border-radius: 1px;
		padding: 5px 5px 0 5px;
		margin-bottom: 20px;
	}

	& .header {
		margin-bottom: 10px;
	}

	& .header,
	& .author,
	& .calendar {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;
