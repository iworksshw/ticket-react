import Mypage from '@/features/train/components/Mypage';

function GuideMypage() {
  return (
    <>
      <h3>Mypage Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/train/components/Mypage.jsx</p>

      {/* 기본 - 예약 목록 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>기본</h4>
        <Mypage
          reservations={[
            {
              date: '2025-11-01(수)',
              title: '회의실 AREX-B1-1',
              time: '16:00~18:00 (2시간)',
              location: '서울역 지하1층',
              price: '￦ 70,000 원',
              applyDate: '2025-11-01',
              reservNo: 'MB20250826009',
              state: 'cancel',
            },
            {
              date: '2025-11-01(수)',
              title: '회의실 AREX-B1-1',
              time: '16:00~18:00 (2시간)',
              location: '서울역 지하1층',
              price: '￦ 70,000 원',
              applyDate: '2025-11-01',
              reservNo: 'MB20250826009',
              state: 'payComplete',
            },
          ]}
        />
      </div>

      {/* 상태별 - 예약취소 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>상태 - 예약취소</h4>
        <Mypage
          reservations={[
            {
              date: '2025-11-01(수)',
              title: '회의실 AREX-B1-1',
              time: '16:00~18:00 (2시간)',
              location: '서울역 지하1층',
              price: '￦ 70,000 원',
              applyDate: '2025-11-01',
              reservNo: 'MB20250826009',
              state: 'cancel',
            },
          ]}
        />
      </div>

      {/* 상태별 - 승인대기 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>상태 - 승인대기</h4>
        <Mypage
          reservations={[
            {
              date: '2025-11-01(수)',
              title: '회의실 AREX-B1-1',
              time: '16:00~18:00 (2시간)',
              location: '서울역 지하1층',
              price: '￦ 70,000 원',
              applyDate: '2025-11-01',
              reservNo: 'MB20250826009',
              state: 'confirmWait',
            },
          ]}
        />
      </div>

      {/* 상태별 - 결제대기 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>상태 - 결제대기</h4>
        <Mypage
          reservations={[
            {
              date: '2025-11-01(수)',
              title: '회의실 AREX-B1-1',
              time: '16:00~18:00 (2시간)',
              location: '서울역 지하1층',
              price: '￦ 70,000 원',
              applyDate: '2025-11-01',
              reservNo: 'MB20250826009',
              state: 'payWait',
            },
          ]}
        />
      </div>

      {/* 상태별 - 결제완료 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>상태 - 결제완료</h4>
        <Mypage
          reservations={[
            {
              date: '2025-11-01(수)',
              title: '회의실 AREX-B1-1',
              time: '16:00~18:00 (2시간)',
              location: '서울역 지하1층',
              price: '￦ 70,000 원',
              applyDate: '2025-11-01',
              reservNo: 'MB20250826009',
              state: 'payComplete',
            },
          ]}
        />
      </div>
    </>
  );
}
export default GuideMypage;
