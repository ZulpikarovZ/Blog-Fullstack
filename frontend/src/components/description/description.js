import styled from 'styled-components';

const DescriptionContainer = ({ className }) => {
	return (
		<div className={className}>
			Веб-технологии
			<br />
			Написание кода
			<br />
			Разбор ошибок
			<br />
		</div>
	);
};

export const Description = styled(DescriptionContainer)`
	font-style: italic;
`;
