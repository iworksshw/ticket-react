//냉난방 간편접수
import Complain from '@/features/complain/components/Complain';

// 가이드 : Complain
// 원본 퍼블리싱 파일: docs/html-src/html/component/cptComplain.html
function GuideComplain() {
  return (
    <div style={{ padding: '32px' }}>
      <h3>Complain Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/complain/components/Complain.jsx</p>
      <p style={{ margin: '8px 0 24px', color: '#666' }}>냉난방 간편접수 컴포넌트</p>

      <Complain onSubmit={(data) => alert(`접수: ${JSON.stringify(data)}`)} />
    </div>
  );
}

export default GuideComplain;
