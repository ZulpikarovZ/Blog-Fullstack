import styled from 'styled-components';
import { Button } from '../button/button';
import { useSelector } from 'react-redux';
import { selectModal } from '../../redux/selectors';

const ModalContainer = ({ className }) => {
	const { isOpen, text, onConfirm, onCancel } = useSelector(selectModal);

	if (!isOpen) {
		return;
	}

	return (
		<div className={className}>
			<div className="overlay">
				<div className="box">
					<h3>{text}</h3>
					<div className="buttons">
						<Button width="80px" onClick={onConfirm}>
							ДА
						</Button>
						<Button width="80px" onClick={onCancel}>
							Отмена
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	& .overlay {
		background: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		& .box {
			width: 400px;
			background: #fff;
			text-align: center;
			padding: 15px;
			border-radius: 10px;
		}

		Button {
			margin: 0 5px;
		}
	}

	h3 {
		margin-top: 0;
	}
`;
