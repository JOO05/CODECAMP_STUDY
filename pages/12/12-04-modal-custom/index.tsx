import { useState } from 'react';
import { Modal, Wrapper, ModalWrapper } from '../../src/test2';

export default function ModalTest() {
	const [isTrue, setIsTrue] = useState(false);

	const handleModal = () => {
		setIsTrue((prev) => !prev);
	};

	return (
			<Wrapper>
				<button onClick={handleModal}>나와라 모달</button>
				{isTrue && (
					<ModalWrapper>
						<Modal>
							<button onClick={handleModal}>모달 닫기</button>
						</Modal>
					</ModalWrapper>
				)}
			</Wrapper>
	);
}