//체험학습 예약 절차
import ResvPros from '@/components/common/contents/ResvPros';

function GuideResvPros() {
  return (
    <>
      <h3>ResvPros Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/contents/ResvPros.jsx</p>

      {/* 기본 - 전체 예약 절차 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>기본</h4>
        <ResvPros
          items={[
            {
              title: <>체험학습 <br />프로그램 선택</>,
              sub: { type: 'text', text: '날짜 & 단체/개인' },
            },
            {
              title: <>신청정보 입력 <br />참석자 명단 첨부</>,
              sub: { type: 'link', text: '참가자 양식 다운로드', onClick: () => {} },
            },
            {
              title: <>체험학습 <br />예약 완료</>,
              wide: true,
              sub: { type: 'text', text: <>체험일 2개월 전 ~ <br />2주전 예약 가능</> },
            },
            {
              title: <>직통열차 승차권 결제<br />(마이페이지 확인)</>,
              sub: { type: 'text', text: <>체험일 10일 전까지 <br />결제완료 (이후 자동 취소)</> },
            },
            {
              title: <>체험학습<br />시행</>,
            },
          ]}
        />
      </div>

      {/* 서브박스 - 텍스트형 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>서브박스 - 텍스트형</h4>
        <ResvPros
          items={[
            {
              title: <>체험학습 <br />프로그램 선택</>,
              sub: { type: 'text', text: '날짜 & 단체/개인' },
            },
          ]}
        />
      </div>

      {/* 서브박스 - 링크형 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>서브박스 - 링크형</h4>
        <ResvPros
          items={[
            {
              title: <>신청정보 입력 <br />참석자 명단 첨부</>,
              sub: { type: 'link', text: '참가자 양식 다운로드', onClick: () => {} },
            },
          ]}
        />
      </div>

      {/* 서브박스 - 없음 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>서브박스 - 없음</h4>
        <ResvPros
          items={[
            {
              title: <>체험학습<br />시행</>,
            },
          ]}
        />
      </div>

      {/* wide - 강조 단계 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>wide - 강조 단계</h4>
        <ResvPros
          items={[
            {
              title: <>체험학습 <br />예약 완료</>,
              wide: true,
              sub: { type: 'text', text: <>체험일 2개월 전 ~ <br />2주전 예약 가능</> },
            },
            {
              title: <>직통열차 승차권 결제<br />(마이페이지 확인)</>,
              sub: { type: 'text', text: <>체험일 10일 전까지 <br />결제완료 (이후 자동 취소)</> },
            },
          ]}
        />
      </div>
    </>
  );
}
export default GuideResvPros;
