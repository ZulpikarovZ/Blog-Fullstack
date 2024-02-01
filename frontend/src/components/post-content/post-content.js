import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal, removePostAsync } from '../../redux/actions';
import { checkAccess } from '../../utils/check-access';
import { ROLE } from '../../constants';
import { selectUserRoleId } from '../../redux/selectors';

const PostContentCotainer = ({ className, post }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userRole = useSelector(selectUserRoleId);
	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	const onPostRemove = (postId) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(postId)).then(() => navigate('/'));
					dispatch(closeModal());
				},
				onCancel: () => dispatch(closeModal()),
			}),
		);
	};

	return (
		<div className={className}>
			<img src={post.imageUrl} alt={post.title}></img>
			<h2>{post.title}</h2>
			<div className="special-panel">
				<div className="panel-item">
					<Icon id="fa-calendar-o" size="20px" margin="0 10px 0 0" />
					<div className="published">{post.publishedAt}</div>
				</div>
				{isAdmin && (
					<div className="panel-item">
						<Icon
							id="fa-pencil-square-o"
							size="20px"
							margin="0 10px 0 0"
							onClick={() => navigate(`/post/${post.id}/edit`)}
						/>
						<Icon
							id="fa-trash-o"
							size="20px"
							onClick={() => onPostRemove(post.id)}
						/>
					</div>
				)}
			</div>
			<div>{post.content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentCotainer)`
	margin-bottom: 20px;

	& img {
		float: left;
		margin: 0px 20px 14px 0;
	}

	& .special-panel {
		margin: 20px 0;
		font-size: 18px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	& .panel-item {
		display: flex;
		align-items: center;
	}

	& .panel-item:nth-child(2) div:nth-child(1) {
		display: flex;
		align-items: center;
		margin-top: 3px;
	}

	& .published {
		margin-top: 2px;
	}
`;
