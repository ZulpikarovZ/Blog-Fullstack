import styled from 'styled-components';

const ButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	width: ${({ width = '100%' }) => width};
	font-size: 18px;
	height: 32px;
	cursor: ${({ disabled }) => (disabled ? 'dafault' : 'pointer')};
`;
