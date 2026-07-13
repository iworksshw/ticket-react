//역 위치 탭 (역간 이동)
import LocaTab from '@/components/common/navigation/LocaTab';

function GuideLocaTab() {
  return (
    <>
      <h3>LocaTab Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/navigation/LocaTab.jsx</p>

      {/* 좌측 정차역만 있을 경우 (.jsStart) */}
      <div style={{ marginBottom: '20px' }}>
        <h4>좌측만 있음 (jsStart)</h4>
        <LocaTab
          stnNum="A01"
          stnNm="서울역"
          prev={{ label: '공덕' }}
        />
      </div>

      {/* 좌우 정차역 모두 있을 경우 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>좌우 모두 있음</h4>
        <LocaTab
          stnNum="A05"
          stnNm="김포공항"
          prev={{ label: '계양' }}
          next={{ label: '마곡나루' }}
        />
      </div>

      {/* 우측 정차역만 있을 경우 (.jsEnd) */}
      <div style={{ marginBottom: '20px' }}>
        <h4>우측만 있음 (jsEnd)</h4>
        <LocaTab
          stnNum="A14"
          stnNm="인천공항2터미널"
          next={{ label: '인천공항1터미널' }}
        />
      </div>
    </>
  );
}
export default GuideLocaTab;
