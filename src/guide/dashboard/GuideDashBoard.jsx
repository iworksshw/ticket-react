import DashBoard from '@/features/dashboard/components/DashBoard';

function GuideDashBoard() {
  return (
    <>
      <h3>DashBoard Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/dashboard/components/DashBoard.jsx</p>

      {/* 기본 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>기본</h4>
        <DashBoard
          ticket={{
            date: '2025-10-05',
            trainNo: 'A1026',
            stations: [
              { name: '인천공항 1터미널', time: '(05:23)' },
              { name: '서울역', time: '(06:07)' },
            ],
            headCount: '어른 3명, 어린이 2명',
          }}
          useInfo={[
            { txt: 'AREX 직통열차 이용실적', count: 59, href: '#' },
            { txt: '도심공항터미널 이용실적', count: 2, href: '#' },
            { txt: '보유한 할인쿠폰', count: '+999', href: '#' },
          ]}
          myInfo={[
            { txt: '체험학습', current: 5, total: 10, href: '#' },
            { txt: '회의실', current: 5, total: 10, href: '#' },
            { txt: '고객의 소리', current: 5, total: 10, href: '#' },
          ]}
          basicInfo={{
            email: 'idid1234@naver.com',
            sns: ['naver', 'google', 'kakao', 'apple'],
            nationality: '대한민국',
          }}
        />
      </div>

      {/* SNS 미연동 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>SNS 미연동</h4>
        <DashBoard
          ticket={{
            date: '2025-10-05',
            trainNo: 'A1026',
            stations: [
              { name: '인천공항 1터미널', time: '(05:23)' },
              { name: '서울역', time: '(06:07)' },
            ],
            headCount: '어른 3명, 어린이 2명',
          }}
          useInfo={[
            { txt: 'AREX 직통열차 이용실적', count: 59, href: '#' },
            { txt: '도심공항터미널 이용실적', count: 2, href: '#' },
            { txt: '보유한 할인쿠폰', count: '+999', href: '#' },
          ]}
          myInfo={[
            { txt: '체험학습', current: 5, total: 10, href: '#' },
            { txt: '회의실', current: 5, total: 10, href: '#' },
            { txt: '고객의 소리', current: 5, total: 10, href: '#' },
          ]}
          basicInfo={{
            email: 'idid1234@naver.com',
            sns: [],
            nationality: '대한민국',
          }}
        />
      </div>
    </>
  );
}
export default GuideDashBoard;
