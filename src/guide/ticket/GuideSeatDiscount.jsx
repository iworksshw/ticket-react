import SeatDiscount from '@/features/ticket/components/SeatDiscount';

// 가이드 : SeatDiscount
// 원본 퍼블리싱 파일: docs/html-src/html/common/comDiscount.html

/**
 * SeatDiscount 사용 가이드
 *
 * - carNum/seatNum, regularPrice/discountPrice/finalPrice를 그대로 전달하면
 *   "운임 - 할인 = 결제금액" 형태의 고정 레이아웃으로 렌더링한다.
 */
function GuideSeatDiscount() {
  return (
    <div style={{ padding: '32px' }}>
      <h3>SeatDiscount Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/ticket/components/SeatDiscount.jsx</p>
      <p style={{ margin: '8px 0 24px', color: '#666' }}>할인선택 - 좌석/요금 정보 컴포넌트</p>

      <SeatDiscount
        carNum="5호차"
        seatNum="5D"
        regularPrice="13,000원"
        discountPrice="3,500원"
        finalPrice="9,500원"
      />
    </div>
  );
}

export default GuideSeatDiscount;
