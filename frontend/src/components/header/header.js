import styled from 'styled-components';

import { ControlPanel, Description, Logo } from '../';

const HeaderContainer = ({ className }) => {
	return (
		<header className={className}>
			<Logo />
			<Description />
			<ControlPanel />
		</header>
	);
};

export const Header = styled(HeaderContainer)`
	position: fixed;
	top: 0;
	width: 1000px;
	height: 120px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 40px;
	background-color: #fff;
	box-shadow: 0 -2px 17px #000;
	z-index: 10;
`;
