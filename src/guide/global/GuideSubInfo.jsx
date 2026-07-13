//서브 정보 텍스트
import SubInfo from '@/components/common/contents/SubInfo';

function GuideSubInfo() {
  return (
    <>
      <h3>SubInfo Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/contents/SubInfo.jsx</p>

      {/* 기본 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>기본</h4>
        <SubInfo>
          <em>주요 강조 문구</em>를 포함한 안내 텍스트를 표시합니다. 콘텐츠 상단 소개문으로 사용합니다.
        </SubInfo>
      </div>

      {/* 작은 사이즈 (comSubInfoSm) */}
      <div style={{ marginBottom: '20px' }}>
        <h4>작은 사이즈</h4>
        <SubInfo lg>
          <em>주요 강조 문구</em>를 포함한 작은 사이즈의 안내 텍스트입니다.
        </SubInfo>
      </div>

      {/* 하단 불릿 목록 (descList) */}
      <div style={{ marginBottom: '20px' }}>
        <h4>불릿 목록 포함</h4>
        <SubInfo
          descList={[
            { text: '환불 시 위약금이 발생할 수 있습니다. ', highlight: '자세히 보기', caption: '결제 수단에 따라 영업일 기준 3~5일 소요됩니다.' },
            { text: '예매 변경은 출발 전까지만 가능합니다.' },
          ]}
        >
          <em>주요 강조 문구</em>를 포함한 안내 텍스트를 표시합니다. 콘텐츠 상단 소개문으로 사용합니다.
        </SubInfo>
      </div>
    </>
  );
}
export default GuideSubInfo;
