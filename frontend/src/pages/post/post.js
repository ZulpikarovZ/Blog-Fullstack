import styled from 'styled-components';
import { Comments, Error, PostContent, PostForm, PrivateContent } from '../../components';
import { useEffect, useLayoutEffect, useState } from 'react';
import { loadPostAsync, resetPostData } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { selectPost } from '../../redux/selectors';
import { ROLE } from '../../constants';

const PostContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const params = useParams();
	const dispatch = useDispatch();
	const post = useSelector(selectPost);
	const isCreating = !!useMatch('/post');
	const isEditing = !!useMatch('/post/:id/edit');

	useLayoutEffect(() => {
		dispatch(resetPostData());
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		dispatch(loadPostAsync(params.id)).then((postData) => {
			setError(postData.error);
			setIsLoading(false);
		});
		// eslint-disable-next-line
	}, [dispatch, isCreating, params.id]);

	if (isLoading) {
		return null;
	}

	const SpecificPostPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
				<div className={className}>
					<PostForm post={post} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<PostContent post={post} />
				<Comments comments={post.comments} postId={post.id} />
			</div>
		);

	return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)`
	padding: 40px 80px;
	white-space: pre-line;
`;
