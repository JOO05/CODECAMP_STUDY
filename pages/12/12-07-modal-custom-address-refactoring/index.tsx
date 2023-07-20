import { useState } from 'react';
import { Modal } from 'antd';
import DaumPostcodeEmbed, { type Address } from 'react-daum-postcode';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onToggleModal = () => {setIsModalOpen(prev => !prev);};
	const handleComplete = (address:Address) => {
		console.log(address);
		onToggleModal()
	}
	
  return (
    <>
      <button onClick={onToggleModal}>Open Modal</button>
      {isModalOpen && (
				<Modal title="2" open={true} onOk={onToggleModal} onCancel={onToggleModal}>
					<DaumPostcodeEmbed onComplete={handleComplete} />
      	</Modal>
			)}
    </>
  );
};

export default App;