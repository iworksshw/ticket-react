//소비자중심경영
import Customer from '@/features/customer/components/Customer';

// 가이드 : Customer
// 원본 퍼블리싱 파일: docs/html-src/html/component/cptCustomer.html
// Customer는 고정 콘텐츠 페이지라 props 없이 그대로 렌더링한다.
function GuideCustomer() {
  return (
    <div style={{ padding: '32px' }}>
      <h3>Customer Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/customer/components/Customer.jsx</p>
      <p style={{ margin: '8px 0 24px', color: '#666' }}>소비자중심경영(CCM) 안내 페이지</p>

      <Customer />
    </div>
  );
}

export default GuideCustomer;
