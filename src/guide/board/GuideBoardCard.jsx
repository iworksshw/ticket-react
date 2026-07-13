import BoardCard from '@/features/board/components/BoardCard';

function GuideBoardCard() {
  const cards = [
    {
      title: '[코스1] 철도-항공 체험학습(서울역-인천공항 T1)',
      infoList: [
        { label: '구분', value: '단체' },
        { label: '소요시간', value: '약 4시간40분' },
        { label: '대상', value: '만 3세 이상' },
        { label: '인원(학생기준)', value: '15~40명' },
        { label: '진행 요일', value: '월~금요일' },
        { label: '집결시각', value: '8:50, 9:30, 10:10, 10:50' },
      ],
    },
    {
      title: '[코스2] 철도-항공 체험학습(서울역-인천공항 T2)',
      infoList: [
        { label: '구분', value: '단체' },
        { label: '소요시간', value: '약 4시간' },
        { label: '대상', value: '만 3세 이상' },
        { label: '인원(학생기준)', value: '15~40명' },
        { label: '진행 요일', value: '월~금요일' },
        { label: '집결시각', value: '8:50, 9:30, 10:10, 10:50' },
      ],
    },
    {
      title: '[코스3] 문화역 서울284 연계 체험학습',
      infoList: [
        { label: '구분', value: '단체' },
        { label: '소요시간', value: '약 5시간' },
        { label: '대상', value: '초등학생 이상' },
        { label: '인원(학생기준)', value: '15~40명' },
        { label: '진행 요일', value: '화~일요일' },
        { label: '집결시각', value: '10:10' },
      ],
    },
    {
      title: '[코스4] 항공기상청 연계 체험학습',
      infoList: [
        { label: '구분', value: '단체' },
        { label: '소요시간', value: '약 6시간' },
        { label: '대상', value: '중학생' },
        { label: '인원(학생기준)', value: '15~20명' },
        { label: '진행 요일', value: '매월 2, 4주 수요일', note: '*7~8월, 11~12월 제외' },
        { label: '집결시각', value: '8:50, 9:30, 10:10, 10:50' },
      ],
    },
    {
      title: '[코스5] BMW 코리아 미래재단 주니어 캠퍼스 연계 체험학습',
      infoList: [
        { label: '구분', value: '개별' },
        { label: '소요시간', value: '약 6시간 40분' },
        { label: '대상', value: '초등학생' },
        { label: '인원(학생기준)', value: '15~30명(보호자포함)', note: '*개인 신청 15명 이상 시 진행가능' },
        { label: '진행 요일', value: '토, 일' },
        { label: '집결시각', value: '9:30' },
      ],
    },
  ];

  return (
    <>
      <h3>Board Card Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/board/components/BoardCard.jsx</p>

      {/* 기본 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>기본</h4>
        <BoardCard cards={cards} />
      </div>

      {/* 카드 1개 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>카드 1개</h4>
        <BoardCard cards={[cards[0]]} />
      </div>
    </>
  );
}
export default GuideBoardCard;
