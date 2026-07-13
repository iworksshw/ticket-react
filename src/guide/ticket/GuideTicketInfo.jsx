import { useState } from 'react';
import TicketInfo from '@/features/ticket/components/TicketInfo';
import TicketDiscount from '@/features/ticket/components/TicketDiscount';
import TicketGoodsList from '@/features/ticket/components/TicketGoodsList';

// 공통 출발/도착역 정보. 여러 예시에서 그대로 재사용한다.
const sampleStations = [
  { name: '인천공항 1터미널', time: '(05:23)' },
  { name: '서울역', time: '(06:07)' },
];

// 좌석 할인 분석표(.cancelPrice) 샘플. TicketDiscount에 variant="cancelPrice"로 넘기면
// 운임/할인/결제 3줄 표만 보여준다(버튼 없음). comTicketInfo.html 안에 들어가는 형태다.
const sampleCancelPriceList = [
  {
    id: 'seat-5d',
    car: '5호차',
    seat: '5D',
    fare: { price: '13,000원' },
    discount: { price: '500원' },
    payment: { price: '12,500원' },
  },
  {
    id: 'seat-6a',
    car: '5호차',
    seat: '6A',
    discountLabel: '어린이할인',
    fare: { price: '13,000원' },
    discount: { price: '500원' },
    payment: { price: '12,500원' },
  },
];

// 티켓정보 안에 들어가는 상품 목록(.itemBox) 샘플. TicketGoodsList에 variant="itemBox"로 넘기면
// 클릭 불가능한 정보 표시형 카드(결제완료/취소 뱃지 + 가격/수량 행)로 그려진다.
const sampleItemBoxGoods = [
  {
    id: 'goods-1',
    image: '/images/temp/temp_01_01_001.jpg',
    alt: '5,000원 충전된 교통카드 이미지',
    name: '5,000원 충전된 교통카드',
    optionLabel: '옵션1, 옵션2',
    eyebrow: { type: 'complete', label: '결제완료' },
    infoRows: [
      { label: '가격', value: '25,000원' },
      { label: '수량', value: '1개' },
    ],
  },
  {
    id: 'goods-2',
    image: '/images/temp/temp_01_01_001.jpg',
    alt: '5,000원 충전된 교통카드 이미지',
    name: '5,000원 충전된 교통카드',
    optionLabel: '옵션1, 옵션2',
    eyebrow: { type: 'cancel', label: '결제취소' },
    infoRows: [
      { label: '가격', value: '25,000원' },
      { label: '수량', value: '1개' },
    ],
  },
];

// 예시 2에서 쓰는 티켓(승차일) 목록. 라디오는 "같은 name을 공유하는 것들 중 하나만 선택"이라는
// 의미라서, 여러 티켓이 같은 날짜 선택 그룹에 속한다면 id는 각자 다르게, name은 전부 동일하게
// 줘야 한다. 그래서 상태도 "어떤 티켓이 펼쳐져 있는가"를 티켓마다 따로 두지 않고, 그룹 전체에서
// 딱 하나의 selectedTicketId만 들고 있는다(아코디언처럼 한 번에 하나만 펼쳐짐).
const TICKET_RADIO_GROUP = 'ticketDate';
const tickets = [
  { id: 'rdo001', date: '2025-10-06' },
  { id: 'rdo002', date: '2025-10-07' },
];

function GuideTicketInfo() {
  const [selectedTicketId, setSelectedTicketId] = useState('rdo001');
  const [isTicketSelected, setIsTicketSelected] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState(['seat-6a']);

  const toggleSeat = (id) => {
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((seatId) => seatId !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>Ticket Info Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/ticket/components/TicketInfo.jsx, src/features/ticket/components/TicketDiscount.jsx, src/features/ticket/components/TicketGoodsList.jsx</p>
        <p style={{ color: '#666' }}>
          TicketInfo는 상단 정보(infoTop)와 기본 정보 행(infoItems), 가격 요약(priceList)만
          담당한다. 좌석 할인표나 상품 목록처럼 화면마다 달라지는 영역은 children으로 그대로
          끼워 넣으면 된다.
        </p>
      </section>

      <section>
        <h4>1. 기본 형태 (variant=&quot;&quot;, infoItems만)</h4>
        <TicketInfo
          variant=""
          date="2025-10-05"
          trainNo="A1026"
          stations={sampleStations}
          infoItems={[
            [
              { tit: '탑승인원', desc: '어른 3명, 어린이 2명' },
              { tit: '열차좌석', desc: '5호차 (5D, 6A, 6B, 6C, 6D)' },
            ],
            [
              { tit: '탑승인원', desc: '어른 3명, 어린이 2명' },
              { tit: '열차좌석', desc: '5호차 (5D, 6A, 6B, 6C, 6D)', colorBlue: true },
            ],
          ]}
        />
      </section>

      <section>
        <h4>2. 티켓 형태 (variant=&quot;view&quot;, infoItems만)</h4>
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
          ]}
          priceList={[
            { tit: '승차권', desc: '50,500원', won: '(₩50,500)' },
            { tit: '상품', desc: '20,000원', won: '(₩20,000)' },
            { tit: '총 결제 금액', desc: '75,500원', won: '(₩75,500)', total: true },
          ]}
        />
      </section>

      <section>
        <h4>3. 라디오로 승차일 선택 + 상세/간략보기 토글 (variant=&quot;list&quot;)</h4>
        <p style={{ color: '#666', marginBottom: '8px' }}>
          두 카드가 같은 name(라디오 그룹)을 공유해서, 라디오 본연의 의미대로 "여러 승차일 중
          하나만 선택"된다. 선택된 카드만 펼쳐지고(상세보기) 나머지는 자동으로 접힌다(간략보기) —
          isOpen을 카드마다 따로 두지 않고, "지금 선택된 티켓 id" 하나만 상태로 관리한 결과다.
        </p>
        {tickets.map((ticket) => {
          const isOpen = selectedTicketId === ticket.id;
          return (
            <TicketInfo
              key={ticket.id}
              variant="list"
              dateSelect={{
                type: 'radio',
                id: ticket.id,
                name: TICKET_RADIO_GROUP,
                label: `승차일 ${ticket.date}`,
              }}
              statusList={[{ type: 'goods', label: '상품' }]}
              stations={sampleStations}
              detailToggle={{ isOpen, onToggle: () => setSelectedTicketId(ticket.id) }}
              infoItems={[
                [
                  { tit: '예약번호', desc: '2508188599045' },
                  { tit: '탑승인원', desc: '어른 3명, 어린이 2명' },
                ],
              ]}
              priceListVariant="type02"
              priceList={[
                { tit: '승차권', desc: '50,500원', won: '(₩50,500)' },
                { tit: '상품', desc: '20,000원', won: '(₩20,000)' },
                { tit: '총 결제 금액', desc: '75,500원', won: '(₩75,500)', total: true },
              ]}
            />
          );
        })}
      </section>

      <section>
        <h4>4. TicketDiscount + TicketGoodsList를 children으로 끼워 넣기</h4>
        <p style={{ color: '#666', marginBottom: '8px' }}>
          TicketInfo는 좌석 할인표/상품 목록을 모른다. 그냥 children으로 받은 걸 그대로 그릴 뿐이다.
        </p>
        <TicketInfo
          variant="list"
          date="2025-10-05"
          stations={sampleStations}
          priceListVariant="minus"
          priceListInBottom
          priceList={[
            { tit: '결제 합계', desc: '52,000원', won: '(₩52,000)' },
            { tit: '반환수수료', desc: '3,000원', won: '(₩3,000)' },
            { tit: '총 반환금액', desc: '49,000원', won: '(₩49,000)', total: true },
          ]}
        >
          <TicketDiscount discountList={sampleCancelPriceList} variant="cancelPrice" />
          <TicketGoodsList goodsList={sampleItemBoxGoods} variant="itemBox" />
        </TicketInfo>
      </section>

      <section>
        <h4>4. 체크박스로 좌석 선택 (selectable)</h4>
        <TicketInfo variant="list" date="2025-10-06" stations={sampleStations}>
          <TicketDiscount
            discountList={sampleCancelPriceList}
            variant="cancelPrice"
            selectable
            selectedSeats={selectedSeats}
            onToggleSeat={toggleSeat}
          />
          <TicketGoodsList goodsList={sampleItemBoxGoods} variant="itemBox" half />
        </TicketInfo>
        <p style={{ marginTop: '12px', color: '#1d4ed8' }}>
          선택된 좌석: {selectedSeats.join(', ') || '없음'}
        </p>
      </section>

      <section>
        <h4>5. 체크박스로 승차권 자체를 선택 (환불 등 일괄 처리용)</h4>
        <TicketInfo
          variant="list"
          dateSelect={{
            type: 'checkbox',
            id: 'chk001',
            name: 'chk001',
            label: '승차일 2025-10-06',
            checked: isTicketSelected,
            onChange: () => setIsTicketSelected((prev) => !prev),
          }}
          stations={sampleStations}
          infoItems={[
            [
              { tit: '열차번호', desc: 'A1026' },
              { tit: '탑승인원', desc: '어른 3명, 어린이 2명' },
            ],
          ]}
        />
        <p style={{ marginTop: '12px', color: '#1d4ed8' }}>
          승차권 선택됨: {isTicketSelected ? '예' : '아니오'}
        </p>
      </section>
    </div>
  );
}

export default GuideTicketInfo;
