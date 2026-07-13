import { Outlet, Link } from 'react-router-dom';

function GuideLayout() {
  return (
    <div className="app-container">
      {/* 웹 접근성을 위한 스킵 네비게이션 공간 수립 가능 */}
      <header style={{ padding: '10px', background: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
        <h2>Ticket Project Header</h2>
        <nav style={{ display: 'flex', gap: '15px' }}>
          <Link to="/">홈으로</Link>
          <Link to="/tickets">티켓 목록</Link>
          <Link to="/invalid-page">없는 페이지 테스트(404)</Link>
        </nav>
      </header>

      {/* 실제 페이지 컴포넌트들이 렌더링되는 핵심 영역 */}
      <main style={{ padding: '20px', minHeight: '60vh' }}>
        <Outlet />
      </main>

      <footer style={{ padding: '10px', background: '#333', color: '#fff', textAlign: 'center' }}>
        <p>&copy; 2026 Ticket Project. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default GuideLayout;