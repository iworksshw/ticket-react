import RequestList from '@/features/board/components/RequestList';

function GuideRequestList() {
  return (
    <>
      <h3>RequestList Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/board/components/RequestList.jsx</p>

      {/* 내역 없음 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>내역 없음</h4>
        <RequestList items={[]} />
      </div>

      {/* 기본 - 목록 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>기본</h4>
        <RequestList
          items={[
            {
              id: 1,
              status: 'ing',
              title: '오는열차 승차권을 구매하고 싶어요.',
              date: '2025-10-16',
              detail: '학생 2명이 감기에 걸려 참가가 힘든 상태입니다. 2명 취소요청 드립니다.',
            },
            {
              id: 2,
              status: 'comp',
              title: '체험학습 문의 타이틀 제목 길이 테스트',
              date: '2025-10-15',
              detail: '학생 2명이 감기에 걸려 참가가 힘든 상태입니다. 2명 취소요청 드립니다.',
              defaultOpen: true,
              answer: {
                label: '답변',
                text: '체험일 5일 전까지 인원변경 가능합니다. 체험학습 예약내역에서 인원변경 버튼을 선택 후 신청해 주시기 바랍니다. 인원 취소 시 해당 금액 만큼 환불 처리됩니다. (수수료 무료)',
                date: '2025-10-16',
              },
            },
          ]}
        />
      </div>

      {/* 상태 - 접수중 (답변 전) */}
      <div style={{ marginBottom: '20px' }}>
        <h4>상태 - 접수중</h4>
        <RequestList
          items={[
            {
              id: 1,
              status: 'ing',
              title: '오는열차 승차권을 구매하고 싶어요.',
              date: '2025-10-16',
              detail: '학생 2명이 감기에 걸려 참가가 힘든 상태입니다. 2명 취소요청 드립니다.',
            },
          ]}
        />
      </div>

      {/* 상태 - 답변완료 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>상태 - 답변완료</h4>
        <RequestList
          items={[
            {
              id: 1,
              status: 'comp',
              title: '체험학습 문의 타이틀 제목 길이 테스트',
              date: '2025-10-15',
              detail: '학생 2명이 감기에 걸려 참가가 힘든 상태입니다. 2명 취소요청 드립니다.',
              defaultOpen: true,
              answer: {
                label: '답변',
                text: '체험일 5일 전까지 인원변경 가능합니다. 체험학습 예약내역에서 인원변경 버튼을 선택 후 신청해 주시기 바랍니다. 인원 취소 시 해당 금액 만큼 환불 처리됩니다. (수수료 무료)',
                date: '2025-10-16',
              },
            },
          ]}
        />
      </div>
    </>
  );
}
export default GuideRequestList;
