import TicketPriceInfo from '@/features/ticket/components/TicketPriceInfo';

// 가이드 : TicketPriceInfo
// 원본 퍼블리싱 파일: docs/html-src/html/common/comTicketPriceInfo.html

// 가격 항목 목록. total은 마지막 행에만 줘야 위 항목과의 사이에 점선 구분선이 생긴다.
const priceList = [
  { id: 'fare', label: '승차권', price: '44,500원' },
  { id: 'goods', label: '상품', price: '25,000원', divLine: true },
  { id: 'sum', label: '총 결제 금액', price: '69,500원', total: true },
];

/**
 * TicketPriceInfo 사용 가이드
 *
 * - priceList: dl.info 행을 순서대로 그린다. divLine/total 플래그로 원본 html의 구분선/합계 스타일을 적용한다.
 * - cartLabel/payLabel, onCart/onPay로 하단 CTA 버튼 텍스트와 클릭 핸들러를 지정한다.
 */
function GuideTicketPriceInfo() {
  return (
    <div style={{ padding: '32px' }}>
      <h3>TicketPriceInfo Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/ticket/components/TicketPriceInfo.jsx</p>
      <p style={{ margin: '8px 0 24px', color: '#666' }}>승차권 결제정보 + CTA 버튼 컴포넌트</p>

      <TicketPriceInfo
        priceList={priceList}
        onCart={() => alert('장바구니')}
        onPay={() => alert('결제하기')}
      />
    </div>
  );
}

export default GuideTicketPriceInfo;
