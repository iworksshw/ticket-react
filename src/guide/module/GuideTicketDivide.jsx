//승차권 분할 레이아웃
import TicketDivide from '@/components/module/TicketDivide';
import TicketInfo from '@/features/ticket/components/TicketInfo';
import PayVisa from '@/features/payment/components/PayVisa';
import TicketPriceInfo from '@/features/ticket/components/TicketPriceInfo';

// TicketDivide는 좌(예약/결제정보) · 우(결제금액) 2단 분할 레이아웃(divideGroup까지)만 담당한다.
// divideGroup 안쪽(예약정보, 해외통화 결제 카드, 결제정보)은 다른 컴포넌트들이 들어오는 영역이라
// 컴포넌트 자체는 내용을 모르고, left/right prop으로 여기(가이드)에서 직접 채워 넣는다.

const sampleStations = [
  { name: '인천공항 1터미널', time: '(05:23)' },
  { name: '서울역', time: '(06:07)' },
];

const priceList = [
  { id: 'fare', label: '승차권', price: '44,500원' },
  { id: 'goods', label: '상품', price: '25,000원', divLine: true },
  { id: 'sum', label: '총 결제 금액', price: '69,500원', total: true },
];

function GuideTicketDivide() {
  return (
    <>
      <h3>Ticket Divide Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/module/TicketDivide.jsx, src/features/ticket/components/TicketInfo.jsx, src/features/payment/components/PayVisa.jsx, src/features/ticket/components/TicketPriceInfo.jsx</p>

      {/* 승차권 분할 레이아웃 (좌 : 예약/결제정보, 우 : 결제금액) */}
      <div style={{ marginBottom: '20px' }}>
        <h4>2단 분할 레이아웃 (좌 : 예약정보 + 해외통화 결제 카드 / 우 : 결제정보)</h4>
        <TicketDivide
          left={
            <>
              <div className="pubTitH3">
                <h3>예약정보</h3>
              </div>

              <TicketInfo
                variant="view"
                date="2025-10-05"
                trainNo="A1026"
                stations={sampleStations}
                infoItems={[
                  [
                    { tit: '탑승인원', desc: '어른 3명, 어린이 2명' },
                    { tit: '열차좌석', desc: '5호차 (5D, 6A, 6B, 6C, 6D)' },
                  ],
                  [
                    { tit: '운임', desc: '65,000원' },
                    { tit: '할인', desc: '-14,500원', colorBlue: true },
                  ],
                ]}
              />

              <div className="pubTitH3">
                <h3>해외통화 결제 카드</h3>
              </div>

              <PayVisa />
            </>
          }
          right={
            <>
              <div className="pubTitH3">
                <h3>결제정보</h3>
              </div>

              <TicketPriceInfo priceList={priceList} />
            </>
          }
        />
      </div>
    </>
  );
}
export default GuideTicketDivide;
