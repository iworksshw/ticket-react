//글로벌 내비게이션(GNB)
import Gnb from '@/components/layout/Gnb';

function GuideGnb() {
  return (
    <>
      <h3>Gnb Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/layout/Gnb.jsx</p>

      <div style={{ marginBottom: '20px' }}>
        <h4>기본</h4>
        <Gnb />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>장바구니 비어있음 (hasCartItems=false)</h4>
        <Gnb hasCartItems={false} />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>직통열차 CI (variant="express")</h4>
        <Gnb variant="express" />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>일반열차 CI (variant="standard")</h4>
        <Gnb variant="standard" />
      </div>
    </>
  );
}

export default GuideGnb;
