import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TicketDivide from '@/components/module/TicketDivide';
import TicketInfo from '@/features/ticket/components/TicketInfo';
import TicketDiscount from '@/features/ticket/components/TicketDiscount';
import TicketGoods from '@/features/ticket/components/TicketGoods';
import TicketGoodsList from '@/features/ticket/components/TicketGoodsList';
import TicketPriceInfo from '@/features/ticket/components/TicketPriceInfo';
import TicketSeatChangePage from '@/pages/tickets/TicketSeatChangePage';
import TicketDiscountPage from '@/pages/tickets/TicketDiscountPage';
import ProductDetailPage from '@/pages/tickets/ProductDetailPage';
import TicketReturnFeePage from '@/pages/tickets/TicketReturnFeePage';
import TicketChangeFeePage from '@/pages/tickets/TicketChangeFeePage';
import { useReservation } from '@/contexts/ReservationContext';
import { getSelectableSeatIds, parseSeatId } from '@/features/ticket/seatMap';
import { SEAT_FARE, ADULT_DISCOUNT_AMOUNT, CHILD_DISCOUNT_AMOUNT } from '@/features/ticket/discountRules';
import { parseWon } from '@/features/ticket/priceUtils';

// docs/html-dist/html/menu01/page_01_01_03.html 샘플 데이터
// (검색/예약 흐름을 거치지 않고 이 페이지에 바로 접근했을 때 보여줄 기본값)
const DEFAULT_DATE = '2025-10-05';
const DEFAULT_TRAIN_NO = 'A1026';
const DEFAULT_STATIONS = [
  { name: '인천공항 1터미널', time: '(05:23)' },
  { name: '서울역', time: '(06:07)' },
];
const DEFAULT_HEADCOUNT = '어른 3명, 어린이 2명';
const DEFAULT_PASSENGERS = { adult: 3, child: 2 }; // '어른 3명, 어린이 2명'

// 탑승인원(어른/어린이) 수만큼 1호차의 선택 가능한 좌석을 순서대로 배정한다. 어린이 인원 수만큼
// 앞에서부터 어린이할인이 기본 적용된 좌석이 되고, 나머지는 어른 좌석(기본 500원 할인)이 된다.
// 좌석변경 팝업에서 선택을 바꾸면 setTickets로 이 목록 자체가 교체된다.
function initializeTickets(passengers) {
  const total = passengers.adult + passengers.child;
  return getSelectableSeatIds(1)
    .slice(0, total)
    .map((seatId, index) => {
      const isChild = index < passengers.child;
      return {
        seatId,
        oldPrice: SEAT_FARE,
        passengerType: isChild ? 'child' : 'adult',
        discountLabel: isChild ? '어린이할인' : null,
        discountAmount: isChild ? CHILD_DISCOUNT_AMOUNT : ADULT_DISCOUNT_AMOUNT,
      };
    });
}

// 여러 호차에 걸쳐 좌석이 배정된 경우 "1호차 (1A, 4D), 2호차 (1A)"처럼 호차별로 묶어서 보여준다.
function formatSeatSummary(tickets) {
  const byCar = new Map();
  tickets.forEach((ticket) => {
    const parsed = parseSeatId(ticket.seatId);
    if (!parsed) return;
    if (!byCar.has(parsed.car)) byCar.set(parsed.car, []);
    byCar.get(parsed.car).push(parsed.label);
  });
  return Array.from(byCar.entries())
    .map(([car, labels]) => `${car}호차 (${labels.join(', ')})`)
    .join(', ');
}

function formatWon(amount) {
  return `${amount.toLocaleString()}원`;
}

const RECOMMEND_GOODS_LIST = [
  {
    id: 'recommend01',
    image: '/images/temp/temp_01_01_001.jpg',
    alt: '5,000원 충전된 교통카드 이미지',
    name: '5,000원 충전된 교통카드',
    oldPrice: '5,000원',
    price: '3,500원',
    badge: 'sale',
    badgeLabel: '기간할인',
    date: '2023-12-30 까지',
    num: '재고 23개',
  },
  {
    id: 'recommend02',
    image: '/images/temp/temp_01_01_001.jpg',
    alt: '10,000원 충전된 교통카드 이미지',
    name: '10,000원 충전된 교통카드',
    price: '10,000원',
    badge: 'saleEnd',
    badgeLabel: '기간할인종료',
  },
  {
    id: 'recommend03',
    image: '/images/temp/temp_01_01_001.jpg',
    alt: '15,000원 충전된 교통카드 이미지',
    name: '15,000원 충전된 교통카드',
    oldPrice: '15,000원',
    price: '10,000원',
    soldOut: true,
    badge: 'saleEnd',
    badgeLabel: '기간할인종료',
  },
];

function TrainSelectionPage() {
  const navigate = useNavigate();
  const { search, train } = useReservation();
  // 상품(장바구니)은 처음엔 비어있고, 추천상품 상세 팝업에서 담아야만 채워진다.
  // {id, name, unitPrice, count} 형태로 들고 있다가, 화면에 보여줄 때 count*unitPrice로 가격을 계산한다.
  const [cartGoods, setCartGoods] = useState([]);
  const [isSeatChangeOpen, setIsSeatChangeOpen] = useState(false);
  const [discountEditingSeatId, setDiscountEditingSeatId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isReturnFeeOpen, setIsReturnFeeOpen] = useState(false);
  const [isChangeFeeOpen, setIsChangeFeeOpen] = useState(false);

  const passengers = search?.passengers ?? DEFAULT_PASSENGERS;

  const [tickets, setTickets] = useState(() => initializeTickets(passengers));

  // 승차권(할인선택) 목록: 실제 배정된 좌석(tickets) 데이터를 그대로 화면에 반영한다.
  // 할인선택 기능이 아직 없어서 discountLabel은 항상 비어있고, discountAmount(500원)만큼
  // 자동으로 할인된 가격을 보여준다.
  const discountList = useMemo(
    () =>
      tickets.map((ticket) => {
        const parsed = parseSeatId(ticket.seatId);
        return {
          id: ticket.seatId,
          car: `${parsed.car}호차`,
          seat: parsed.label,
          discountLabel: ticket.discountLabel ?? undefined,
          oldPrice: formatWon(ticket.oldPrice),
          price: formatWon(ticket.oldPrice - ticket.discountAmount),
        };
      }),
    [tickets]
  );

  const discountSummary = {
    fare: formatWon(tickets.reduce((sum, t) => sum + t.oldPrice, 0)),
    discount: formatWon(-tickets.reduce((sum, t) => sum + t.discountAmount, 0)),
  };

  // 결제정보(우측 박스)는 승차권 결제액(운임-할인)과 상품 결제액을 실제 데이터로 계산한다.
  const ticketPayable = tickets.reduce((sum, t) => sum + (t.oldPrice - t.discountAmount), 0);
  const goodsPayable = cartGoods.reduce((sum, g) => sum + g.unitPrice * g.count, 0);
  const paymentPriceList = [
    { id: 'fare', label: '승차권', price: formatWon(ticketPayable) },
    { id: 'goods', label: '상품', price: formatWon(goodsPayable), divLine: true },
    { id: 'total', label: '총 결제 금액', price: formatWon(ticketPayable + goodsPayable), total: true },
  ];

  const stations = train
    ? [
        { name: train.departureName, time: `(${train.departureTime})` },
        { name: train.arrivalName, time: `(${train.arrivalTime})` },
      ]
    : DEFAULT_STATIONS;

  const infoItems = [
    [
      { tit: '탑승인원', desc: search?.headcountLabel || DEFAULT_HEADCOUNT },
      { tit: '열차좌석', desc: formatSeatSummary(tickets) },
    ],
  ];

  // 상품 목록에 보여줄 형태(가격 문자열 등)로 변환. 실제 수량/단가는 cartGoods에 있다.
  const goodsList = useMemo(
    () =>
      cartGoods.map((goods) => ({
        id: goods.id,
        name: goods.name,
        count: goods.count,
        price: formatWon(goods.unitPrice * goods.count),
      })),
    [cartGoods]
  );

  const goodsTotal =
    cartGoods.length > 0
      ? { price: formatWon(cartGoods.reduce((sum, g) => sum + g.unitPrice * g.count, 0)) }
      : undefined;

  const handleGoodsCountChange = (id, value) => {
    setCartGoods((prev) => prev.map((goods) => (goods.id === id ? { ...goods, count: value } : goods)));
  };

  const handleGoodsRemove = (id) => {
    setCartGoods((prev) => prev.filter((goods) => goods.id !== id));
  };

  // 추천상품 상세 팝업에서 "담기"를 눌렀을 때: 이미 담긴 상품이면 수량만 더하고, 처음 담는
  // 상품이면 새 줄을 추가한다.
  const handleAddProduct = (product, quantity) => {
    setCartGoods((prev) => {
      const existing = prev.find((g) => g.id === product.id);
      if (existing) {
        return prev.map((g) => (g.id === product.id ? { ...g, count: g.count + quantity } : g));
      }
      return [...prev, { id: product.id, name: product.name, unitPrice: parseWon(product.price), count: quantity }];
    });
  };

  const discountEditingTicket = tickets.find((t) => t.seatId === discountEditingSeatId) ?? null;

  const handleDiscountConfirm = (update) => {
    setTickets((prev) =>
      prev.map((t) => (t.seatId === discountEditingSeatId ? { ...t, ...update } : t))
    );
  };

  return (
    <>
      <TicketDivide
        left={
          <>
            <div className="pubTitH3">
              <h3>예약정보</h3>
              <div className="alignR">
                <button type="button" className="train" onClick={() => navigate('/tickets/ticketSearch')}>열차변경</button>
              </div>
            </div>

            <TicketInfo
              variant="view"
              date={search?.dateOnlyLabel || DEFAULT_DATE}
              trainNo={train?.trainNo || DEFAULT_TRAIN_NO}
              stations={stations}
              infoItems={infoItems}
            />

            <div className="pubTitH3">
              <h3>승차권</h3>
              <div className="alignR">
                <button type="button" className="change" onClick={() => setIsSeatChangeOpen(true)}>좌석변경</button>
              </div>
            </div>

            <TicketDiscount
              discountList={discountList}
              summary={discountSummary}
              onSelect={(item) => setDiscountEditingSeatId(item.id)}
            />

            <div className="pubTitH3">
              <h3>상품</h3>
            </div>

            <TicketGoods
              goodsList={goodsList}
              total={goodsTotal}
              onCountChange={handleGoodsCountChange}
              onRemove={handleGoodsRemove}
            />

            <div className="pubTitH3">
              <h3>추천상품</h3>
            </div>

            <TicketGoodsList goodsList={RECOMMEND_GOODS_LIST} onSelect={setSelectedProduct} />

            {/* comTicketBox: docs/html-src/html/common/comTicketBox.html 마크업 그대로 (src/styles/etc/_box.scss 전역 클래스 사용, 별도 컴포넌트 없음) */}
            <div className="comTicketBox">
              <div className="boxArea">
                <div className="boxHeader"><h4>이용안내</h4></div>
                <div className="boxTitle">승차권예약</div>
                <ul className="boxList">
                  <li className="item">승차권은 <em>열차 출발 5분 전까지 구매</em>할 수 있습니다.</li>
                  <li className="item"><em>인쇄한 승차권 또는 모바일 QR승차권</em>을 소지하여야 직통열차를 탑승할 수 있습니다.</li>
                  <li className="item">직통열차 여객은 안전한 열차이용을 위하여 <em>출발시각 3분 전까지 직통열차 승강장에 도착</em>하여야 합니다.</li>
                  <li className="item">자세한 내용은 당사 여객운송약관을 참고하시기 바랍니다.</li>
                </ul>
                <div className="boxTitle">승차권 반환/변경</div>
                <ul className="boxList">
                  <li className="item">승차권 변경은 3회까지만 가능하며, 1회 변경에 한하여 수수료를 면제합니다.(변경 수수료는 열차 출발 당일 2회 이상 변경하는 경우에 한하여 발생)</li>
                  <li className="item">승차권 확인번호(숫자 6자리) 분실 시 이메일로 전송된 승차권 예약내역의 변경링크를 통해 승차권 확인번호를 변경할 수 있습니다.</li>
                  <li className="item">
                    <a href="#" className="line" onClick={(e) => { e.preventDefault(); setIsReturnFeeOpen(true); }}>
                      승차권 반환(환불) 수수료 정책
                    </a>
                  </li>
                  <li className="item">
                    <a href="#" className="line" onClick={(e) => { e.preventDefault(); setIsChangeFeeOpen(true); }}>
                      승차권 변경 수수료 정책
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </>
        }
        right={
          <>
            <div className="pubTitH3">
              <h3>결제정보</h3>
            </div>

            <TicketPriceInfo priceList={paymentPriceList} />
          </>
        }
      />

      <TicketSeatChangePage
        isOpen={isSeatChangeOpen}
        onClose={() => setIsSeatChangeOpen(false)}
        tickets={tickets}
        onConfirm={setTickets}
      />

      <TicketDiscountPage
        isOpen={discountEditingSeatId != null}
        onClose={() => setDiscountEditingSeatId(null)}
        ticket={discountEditingTicket}
        onConfirm={handleDiscountConfirm}
      />

      <ProductDetailPage
        isOpen={selectedProduct != null}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
        onAdd={handleAddProduct}
      />

      <TicketReturnFeePage isOpen={isReturnFeeOpen} onClose={() => setIsReturnFeeOpen(false)} />
      <TicketChangeFeePage isOpen={isChangeFeeOpen} onClose={() => setIsChangeFeeOpen(false)} />
    </>
  );
}

export default TrainSelectionPage;
