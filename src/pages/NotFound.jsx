import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h3>페이지를 찾을 수 없습니다. (404)</h3>
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
}
export default NotFound;