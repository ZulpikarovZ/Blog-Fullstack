import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { Pagination, PostCard, Search } from '../../components';
import { PAGINATION_LIMIT } from '../../constants/pagination-limit';
import { debounce } from '../../utils';
import { request } from '../../utils/request';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	useEffect(() => {
		request(
			`/posts?search=${searchPhrase}&limit=${PAGINATION_LIMIT}&page=${page}`,
		).then(({ data: { posts, lastPage } }) => {
			setPosts(posts);
			setLastPage(lastPage);
		});
		// eslint-disable-next-line
	}, [page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<Search searchPhrase={searchPhrase} onSearch={onSearch} />
			<div className="post-list">
				{posts.length ? (
					posts.map((post) => <PostCard key={post.id} post={post} />)
				) : (
					<div className="posts-not-found">Статьи не найдены...</div>
				)}
			</div>
			{lastPage > 1 && posts.length && (
				<Pagination page={page} setPage={setPage} lastPage={lastPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	// display: flex;
	// align-items: center;
	// justify-content: center;
	// width: 200px;

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px 80px;
	}

	& .posts-not-found {
		font-size: 18px;
		text-align: center;
		margin: auto;
		margin-top: 20px;
	}
`;
