import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '../';

const LargeText = styled.div`
	font-size: 48px;
	font-weight: bold;
`;

const SmallText = styled.div`
	font-size: 18px;
	font-weight: bold;
`;

const LogoContainer = ({ className }) => {
	return (
		<Link to="/" className={className}>
			<Icon id="fa fa-code" size="70px" margin="0 20px 0 0" />
			<div>
				<LargeText>Блог</LargeText>
				<SmallText>веб-разработчика</SmallText>
			</div>
		</Link>
	);
};

export const Logo = styled(LogoContainer)`
	display: flex;
`;
