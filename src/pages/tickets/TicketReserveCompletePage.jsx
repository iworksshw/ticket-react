import { useLocation } from 'react-router-dom';
import Complete from '@/components/common/contents/Complete';
import TicketInfo from '@/features/ticket/components/TicketInfo';
import ButtonGroup from '@/components/common/forms/ButtonGroup';
import Button from '@/components/common/forms/Button';

// docs/html-dist/html/menu01/page_01_01_08.html(승차권 예약완료) 참고
// ticketPayment 페이지에서 결제하기를 누르면 이 화면으로 넘어오며, location.state로
// 예약 상세정보(TicketPaymentPage와 동일한 형태)를 넘겨받는다. state가 없으면(직접 접근)
// html 샘플 데이터를 기본값으로 보여준다.

const DEFAULT_DATE = '2025-10-05';
const DEFAULT_TRAIN_NO = 'A1026';
const DEFAULT_STATIONS = [
  { name: '인천공항 1터미널', time: '(05:23)' },
  { name: '서울역', time: '(06:07)' },
];
const DEFAULT_RESERVATION_NO = '2508188599045';
const DEFAULT_HEADCOUNT = '어른 3명, 어린이 2명';
const DEFAULT_SEAT_SUMMARY = (
  <>
    5호차 (5D, 6A, 6B, 6C, 6D)
    <br />4호차 (8D, 9A)
  </>
);
const DEFAULT_GOODS_SUMMARY = (
  <>
    5,000원 충전된 교통카드 / <span className="colorBlue">옵션1, 옵션2</span> (1개)
    <br />10,000원 충전된 교통카드 / <span className="colorBlue">옵션1, 옵션2</span> (1개)
  </>
);
const DEFAULT_PRICE_LIST = [
  { tit: '승차권', desc: '50,500원', won: '(₩50,500)' },
  { tit: '상품', desc: '20,000원', won: '(₩20,000)' },
  { tit: '총 결제 금액', desc: '75,500원', won: '(₩75,500)', total: true, colorBlue: true },
];

function TicketReserveCompletePage() {
  const { state } = useLocation();

  const infoItems = [
    [
      { tit: '예약번호', desc: state?.reservationNo ?? DEFAULT_RESERVATION_NO },
      { tit: '탑승인원', desc: state?.headcountLabel ?? DEFAULT_HEADCOUNT },
      { tit: '열차좌석', desc: state?.seatSummary ?? DEFAULT_SEAT_SUMMARY },
    ],
    [
      { tit: '상품', desc: state?.goodsSummary ?? DEFAULT_GOODS_SUMMARY },
    ],
  ];

  return (
    <div className="cptTicket">
      <div className="ticketArea">

        <Complete
          title="승차권 예약이 완료되었습니다."
          desc={
            <>
              <em>'인쇄한 승차권'</em> 또는 <em>'모바일QR승차권'</em>을 사용하여 직통열차를 탑승할 수 있습니다.
            </>
          }
        />

        <TicketInfo
          variant="view"
          style={{ marginTop: '30px' }}
          date={state?.date ?? DEFAULT_DATE}
          trainNo={state?.trainNo ?? DEFAULT_TRAIN_NO}
          stations={state?.stations ?? DEFAULT_STATIONS}
          infoItems={infoItems}
          priceList={state?.priceList ?? DEFAULT_PRICE_LIST}
        />

        <ButtonGroup isCta>
          <Button variant="blue" size="lg" onClick={() => alert('승차권을 확인합니다')}>승차권 보기</Button>
          <Button variant="dkLine" size="lg" onClick={() => alert('나의 승차권 내역으로 이동합니다')}>나의 승차권 조회</Button>
        </ButtonGroup>

        {/* comTicketBox: docs/html-src/html/common/comTicketBox.html 마크업 그대로 (src/styles/etc/_box.scss 전역 클래스 사용, 별도 컴포넌트 없음) */}
        <div className="comTicketBox">
          <div className="boxArea">
            <div className="boxHeader"><h4>이용안내</h4></div>
            <ul className="boxList">
              <li className="item">승차권은 <em>열차 출발 5분 전까지 구매</em>할 수 있습니다.</li>
              <li className="item"><em>인쇄한 승차권 또는 모바일 QR승차권</em>을 소지하여야 직통열차를 탑승할 수 있습니다.</li>
              <li className="item">직통열차 여객은 안전한 열차이용을 위하여 <em>출발시각 3분 전까지 직통열차 승강장에 도착</em>하여야 합니다.</li>
              <li className="item">자세한 내용은 당사 여객운송약관을 참고하시기 바랍니다.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TicketReserveCompletePage;
