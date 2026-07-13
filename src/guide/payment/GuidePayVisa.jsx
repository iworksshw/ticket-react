import PayVisa from '@/features/payment/components/PayVisa';

// 가이드 : PayVisa
// 원본 퍼블리싱 파일: docs/html-src/html/common/comPay.html

/**
 * PayVisa 사용 가이드
 *
 * - cards를 생략하면 기본값(visa/master)으로 렌더링된다. visa는 scss에서 회색 처리(.item.visa img)된다.
 * - onPayChange로 하단 "원화(KRW) 결제로 전환" 링크 클릭을 처리한다.
 */
function GuidePayVisa() {
  return (
    <div style={{ padding: '32px' }}>
      <h3>PayVisa Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/payment/components/PayVisa.jsx</p>
      <p style={{ margin: '8px 0 24px', color: '#666' }}>해외통화 결제 카드 컴포넌트</p>

      <PayVisa onPayChange={() => alert('원화(KRW) 결제로 전환')} />
    </div>
  );
}

export default GuidePayVisa;
