import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { Link } from 'react-router-dom';

const PostCardContainer = ({ className, post }) => {
	return (
		<div className={className}>
			<Link to={`/post/${post.id}`}>
				<img src={post.imageUrl} alt={post.title} />
				<div className="post-card_footer">
					<h4>{post.title}</h4>
					<div className="post-card_info">
						<div className="published-at">
							<Icon id="fa-calendar-o" size="20px" margin="0 5px 0 0" />
							{post.publishedAt}
						</div>
						<div className="coments-count">
							<Icon id="fa-comment-o" size="20px" margin="0 5px 0 0" />
							{post.comments.length}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	width: 280px;
	margin: 20px;
	outline: 1px solid black;

	& img {
		outline: 1px solid black;
		width: 100%;
		height: 150px;
	}

	& .post-card_footer {
		padding: 10px;
	}

	& h4 {
		margin: 0 0 5px 0;
		white-space: nowrap; /* Запрещаем перенос строк */
		overflow: hidden; /* Обрезаем все, что не помещается в область */
		text-overflow: ellipsis; /* Добавляем многоточие */
	}

	& .post-card_info {
		display: flex;
		justify-content: space-between;

		& .published-at,
		& .coments-count {
			display: flex;
			align-items: center;
		}
	}
`;
