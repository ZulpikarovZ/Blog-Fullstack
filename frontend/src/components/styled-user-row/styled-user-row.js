import styled from 'styled-components';

const StyledUserRowContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};

export const StyledUserRow = styled(StyledUserRowContainer)`
	display: flex;
	width: 725px;

	& div {
		padding: 5px 15px;
	}

	& > div:nth-child(1) {
		width: 35%;
	}

	& > div:nth-child(2) {
		width: 40%;
	}

	& div:nth-child(3) {
		width: 24%;
	}
`;
