import styled from 'styled-components';

const AuthButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const AuthButton = styled(AuthButtonContainer)`
	font-size: 16px;
	padding: 10px;
	cursor: pointer;
`;
