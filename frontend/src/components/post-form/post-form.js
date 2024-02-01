import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { Input } from '../input/input';
import { useLayoutEffect, useRef, useState } from 'react';
import { sanitizeContent } from '../../utils';
import { useDispatch } from 'react-redux';
import {
	closeModal,
	openModal,
	removePostAsync,
	savePostAsync,
} from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const PostFormCotainer = ({ className, post }) => {
	const [imageUrlValue, setImageUrlValue] = useState(post?.imageUrl);
	const [postTitleValue, setPostTitleValue] = useState(post?.title);
	const contentRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useLayoutEffect(() => {
		setImageUrlValue(post.imageUrl);
		setPostTitleValue(post.title);
	}, [post.imageUrl, post.title]);

	const onPostSave = () => {
		const newcontentRef = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(post.id, {
				imageUrl: imageUrlValue,
				title: postTitleValue,
				content: newcontentRef,
			}),
		).then(({ id }) => navigate(`/post/${id}`));
	};

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
			<Input
				value={imageUrlValue}
				placeholder="Изображение..."
				onChange={({ target }) => setImageUrlValue(target.value)}
			/>
			<Input
				value={postTitleValue}
				placeholder="Заголовок..."
				onChange={({ target }) => setPostTitleValue(target.value)}
			/>
			<div className="special-panel">
				<div className="panel-item">
					{post.publishedAt && (
						<Icon id="fa-calendar-o" size="20px" margin="0 10px 0 0" />
					)}
					<div className="published">{post.publishedAt}</div>
				</div>
				<div className="panel-item">
					<Icon id="fa-floppy-o" size="20px" onClick={onPostSave} />
					{post.publishedAt && (
						<Icon
							id="fa-trash-o"
							size="20px"
							margin="0 0 0 10px"
							onClick={() => onPostRemove(post.id)}
						/>
					)}
				</div>
			</div>
			<div
				className="content"
				ref={contentRef}
				contentEditable="true"
				suppressContentEditableWarning="true"
			>
				{post.content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormCotainer)`
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
	}

	& .published {
		margin-top: 2px;
	}

	& .content {
		min-height: 80px;
		outline: 1px solid #000;
	}
`;
