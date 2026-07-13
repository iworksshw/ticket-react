//신청절차
import StepInfo from '@/components/common/contents/StepInfo';

function GuideStepInfo() {
  return (
    <>
      <h3>StepInfo Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/contents/StepInfo.jsx</p>

      {/* 기본 - 5단계 전체 절차 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>기본</h4>
        <StepInfo
          items={[
            { step: 'STEP 1', title: '로그인', desc: '공항철도 홈페이지 로그인', icon: 'icon001' },
            { step: 'STEP 2', title: '예약신청', desc: '신청기간 내 예약 가능', icon: 'icon002' },
            { step: 'STEP 3', title: '신청접수', desc: '담당자 확인', icon: 'icon006' },
            { step: 'STEP 4', title: '세부일정 발송', desc: '일정 확정 후 개별 발송', icon: 'icon007' },
            { step: 'STEP 5', title: '신청완료', desc: '신청결과 개별 안내', icon: 'icon008' },
          ]}
        />
      </div>

      {/* 3단계 절차 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>3단계</h4>
        <StepInfo
          items={[
            { step: 'STEP 1', title: '로그인', desc: '공항철도 홈페이지 로그인', icon: 'icon001' },
            { step: 'STEP 2', title: '예약신청', desc: '신청기간 내 예약 가능', icon: 'icon002' },
            { step: 'STEP 3', title: '신청완료', desc: '신청결과 개별 안내', icon: 'icon008' },
          ]}
        />
      </div>

      {/* 설명 없는 단계 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>설명(desc) 없는 단계</h4>
        <StepInfo
          items={[
            { step: 'STEP 1', title: '로그인', icon: 'icon001' },
            { step: 'STEP 2', title: '예약신청', icon: 'icon002' },
          ]}
        />
      </div>
    </>
  );
}
export default GuideStepInfo;
