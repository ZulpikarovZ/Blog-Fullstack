import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Authorization, Registration, Users, Post, Main } from './pages';
import { Error, Footer, Header, Modal } from './components';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/actions';
import { ERROR } from './constants';

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	min-height: 100%;
	width: 1000px;
	background-color: #fff;
	margin: auto;
`;

const Page = styled.div`
	padding: 120px 0 0 0;
`;

export const Blog = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserData = JSON.parse(sessionStorage.getItem('userData'));

		if (!currentUserData) {
			return;
		}

		dispatch(setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }));
	}, [dispatch]);

	return (
		<AppContainer>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppContainer>
	);
};
