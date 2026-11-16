import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TicketDivide from '@/components/module/TicketDivide';
import TicketInfo from '@/features/ticket/components/TicketInfo';
import TicketPriceInfo from '@/features/ticket/components/TicketPriceInfo';
import PayVisa from '@/features/payment/components/PayVisa';
import PayCard from '@/features/payment/components/PayCard';

// docs/html-dist/html/menu01/page_01_01_04.html(해외통화 결제), page_01_01_05~07.html(신용카드/간편결제) 참고
// trainSelection 페이지의 "승차권 예약정보 확인" 팝업에서 결제수단을 선택하고 확인을 누르면
// 이 페이지로 이동하며, location.state로 예약 요약정보와 paymentType('overseas'|'krw')을 넘겨받는다.
// paymentType이 'overseas'면 해외통화 결제 카드(PayVisa), 'krw'면 신용카드/간편결제(PayCard)를 보여준다.

const DEFAULT_DATE = '2025-10-05';
const DEFAULT_TRAIN_NO = 'A1026';
const DEFAULT_STATIONS = [
  { name: '인천공항 1터미널', time: '(05:23)' },
  { name: '서울역', time: '(06:07)' },
];
const DEFAULT_HEADCOUNT = '어른 3명, 어린이 2명';
const DEFAULT_SEAT_SUMMARY = '5호차 (5D, 6A, 6B, 6C, 6D)';
const DEFAULT_FARE = '65,000원';
const DEFAULT_DISCOUNT = '-14,500원';
const DEFAULT_PRICE_LIST = [
  { id: 'fare', label: '승차권', price: '44,500원' },
  { id: 'goods', label: '상품', price: '25,000원', divLine: true },
  { id: 'total', label: '총 결제 금액', price: '69,500원', total: true },
];

function TicketPaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [paymentType, setPaymentType] = useState(state?.paymentType ?? 'krw');

  const infoItems = [
    [
      { tit: '탑승인원', desc: state?.headcountLabel ?? DEFAULT_HEADCOUNT },
      { tit: '열차좌석', desc: state?.seatSummary ?? DEFAULT_SEAT_SUMMARY },
    ],
    [
      { tit: '운임', desc: state?.fare ?? DEFAULT_FARE },
      { tit: '할인', desc: state?.discount ?? DEFAULT_DISCOUNT, colorBlue: true },
    ],
  ];

  // TicketPriceInfo가 쓰는 형태({label, price, won, total})를 TicketReserveCompletePage의
  // TicketInfo priceList 형태({tit, desc, won, total, colorBlue})로 옮겨 그대로 넘긴다.
  const completePriceList = (state?.priceList ?? DEFAULT_PRICE_LIST).map((item) => ({
    tit: item.label,
    desc: item.price,
    won: item.won,
    total: item.total,
    colorBlue: item.total,
  }));

  const handlePay = () => {
    navigate('/tickets/ticketComplete', {
      state: {
        date: state?.date ?? DEFAULT_DATE,
        trainNo: state?.trainNo ?? DEFAULT_TRAIN_NO,
        stations: state?.stations ?? DEFAULT_STATIONS,
        headcountLabel: state?.headcountLabel ?? DEFAULT_HEADCOUNT,
        seatSummary: state?.seatSummary ?? DEFAULT_SEAT_SUMMARY,
        priceList: completePriceList,
      },
    });
  };

  return (
    <TicketDivide
      left={
        <>
          <div className="pubTitH3">
            <h3>예약정보</h3>
          </div>

          <TicketInfo
            variant="view"
            style={{ marginTop: '30px'}}
            date={state?.date ?? DEFAULT_DATE}
            trainNo={state?.trainNo ?? DEFAULT_TRAIN_NO}
            stations={state?.stations ?? DEFAULT_STATIONS}
            infoItems={infoItems}
          />

          <div className="pubTitH3">
            <h3>{paymentType === 'overseas' ? '해외통화 결제 카드' : '결제 방법'}</h3>
          </div>

          {paymentType === 'overseas' ? (
            <PayVisa onPayChange={() => setPaymentType('krw')} />
          ) : (
            <PayCard />
          )}
        </>
      }
      right={
        <>
          <div className="pubTitH3">
            <h3>결제정보</h3>
          </div>

          <TicketPriceInfo
            priceList={state?.priceList ?? DEFAULT_PRICE_LIST}
            showCart={false}
            onPay={handlePay}
          />
        </>
      }
    />
  );
}

export default TicketPaymentPage;
