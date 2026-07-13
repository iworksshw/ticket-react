//담당부서
import SubBtm from '@/components/common/contents/SubBtm';

function GuideSubBtm() {
  return (
    <>
      <h3>Sub Btm Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/contents/SubBtm.jsx</p>

      {/* 담당부서 - 기본 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>기본</h4>
        <SubBtm locations={['서울역 회의실']} phone="1599-7788" />
      </div>

      {/* 담당부서 - 중앙 정렬 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>중앙 정렬 (subCenterArea)</h4>
        <SubBtm phone="1599-7788" center />
      </div>
    </>
  );
}
export default GuideSubBtm;
