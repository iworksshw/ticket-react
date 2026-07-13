//단계별 절차 박스
import StepBox from '@/components/common/contents/StepBox';

function GuideStepBox() {
  return (
    <>
      <h3>StepBox Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/contents/StepBox.jsx</p>

      {/* 단계별 절차 박스 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>기본</h4>
        <StepBox
          steps={[
            {
              icon: '/images/common/ic_60_ticket.png',
              stepLabel: 'STEP 1.',
              title: '단계 제목',
              desc: '단계 설명 텍스트',
              descArea: ['세부 항목 1', '세부 항목 2'],
            },
            {
              icon: '/images/common/ic_60_baggage.png',
              stepLabel: 'STEP 2.',
              title: '단계 제목',
              desc: '단계 설명 텍스트',
              descArea: ['세부 항목 1', <><em>강조 항목</em> : 내용</>],
            },
            {
              icon: '/images/common/ic_60_ticket.png',
              stepLabel: 'STEP 3.',
              title: '단계 제목',
              desc: '단계 설명 텍스트',
              descArea: ['세부 항목 1', <><em>강조 항목</em> : 내용</>],
            },
            {
              icon: '/images/common/ic_60_baggage.png',
              stepLabel: 'STEP 4.',
              title: '단계 제목',
              desc: '단계 설명 텍스트',
              descArea: ['세부 항목 1', <><em>강조 항목</em> : 내용</>],
            },
            {
              icon: '/images/common/ic_60_ticket.png',
              stepLabel: 'STEP 5.',
              title: '단계 제목',
              desc: '단계 설명 텍스트',
              descArea: ['세부 항목 1', <><em>강조 항목</em> : 내용</>],
            },
          ]}
        />
      </div>
    </>
  );
}
export default GuideStepBox;
