import { Modal } from 'antd';

const success = () => {
  Modal.success({
    content: '게시글 등록 성공',
  });
};

const error = () => {
  Modal.error({
    title: 'This is an error message',
    content: '비밀번호가 틀렸습니다.',
  });
};

const App: React.FC = () => (
  <>
    <button onClick={success}>성공</button>
    <button onClick={error}>실패</button>
  </>
);

export default App;