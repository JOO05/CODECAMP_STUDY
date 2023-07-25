import { useState } from 'react';
import { Modal } from 'antd';
import DaumPostcodeEmbed, { type Address } from 'react-daum-postcode';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {setIsModalOpen(true);};
  const handleOk = () => {setIsModalOpen(false);}
  const handleCancel = () => {setIsModalOpen(false);};

	const handleComplete = (address:Address) => {
		console.log(address);
		setIsModalOpen(false);
	}
	
  return (
    <>
      <button onClick={showModal}>Open Modal</button>
			{/* 모달 종료 방식 1: 숨기기 */}
      <Modal title="1" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				<DaumPostcodeEmbed onComplete={handleComplete} />
      </Modal>

			{/* 모달 종료 방식 2: 삭제하기 */}
      {isModalOpen && (
				<Modal title="2" open={true} onOk={handleOk} onCancel={handleCancel}>
					<DaumPostcodeEmbed onComplete={handleComplete} />
      	</Modal>
			)}
    </>
  );
};

export default App;