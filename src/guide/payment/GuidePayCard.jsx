import PayCard from '@/features/payment/components/PayCard';

// 가이드 : PayCard
// 원본 퍼블리싱 파일: docs/html-src/html/common/comTicketPay.html

/**
 * PayCard 사용 가이드
 *
 * - 신용카드 / 간편결제 라디오를 눌러 .cont01 / .cont02 영역이 토글되는지 확인한다.
 * - 카드구분에서 "해외 발급카드"를 선택하면 카드비밀번호/카드종류/인증번호 행이 숨겨지는지 확인한다.
 * - 토글/입력 상태는 모두 PayCard 내부 state로 관리되는 자체완결형 컴포넌트라 별도 props 없이 바로 쓸 수 있다.
 */
function GuidePayCard() {
  return (
    <div style={{ padding: '32px' }}>
      <h3>PayCard Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/payment/components/PayCard.jsx</p>
      <p style={{ margin: '8px 0 24px', color: '#666' }}>결제 방법(신용카드 / 간편결제) 컴포넌트</p>

      <PayCard onAgreeChange={(checked) => console.log('개인정보 동의:', checked)} />
    </div>
  );
}

export default GuidePayCard;
