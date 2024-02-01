import styled from 'styled-components';
import { Input } from '../input/input';
import { Icon } from '../icon/icon';

const SearchContainer = ({ className, searchPhrase, onSearch }) => {
	return (
		<div className={className}>
			<Input value={searchPhrase} onChange={onSearch} placeholder="Поиск..." />
			<Icon id="fa-search" size="18px" margin="0 7px 0 0" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	width: 340px;
	height: 40px;
	margin: 40px auto 0;

	& input {
		padding: 10px 32px 10px 10px;
	}

	& div {
		position: absolute;
		top: 10px;
		right: 0px;
	}
`;
