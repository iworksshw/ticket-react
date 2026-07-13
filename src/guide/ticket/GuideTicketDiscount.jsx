import { useState } from 'react';
import TicketDiscount from '@/features/ticket/components/TicketDiscount';

// TicketDiscount는 데이터를 내부에 갖고 있지 않은 "뷰" 컴포넌트라서, 가이드 페이지처럼
// 실제로 사용하는 쪽에서 보여줄 데이터를 직접 준비해야 한다.
// 아래 sampleDiscountList는 원본 퍼블리싱 파일(comTicketDiscount.html)에 있던 5개의
// <li class="discItem"> 마크업을 그대로 데이터로 옮긴 것이다. html에서는 같은 마크업을
// 5번 복붙했지만, React에서는 "마크업 1개 + 데이터 배열"로 표현해서 좌석 개수가 달라져도
// 코드를 고칠 필요가 없게 만든다.
const sampleDiscountList = [
  // discountLabel이 없는 항목 = 할인 없는 일반 좌석. TicketDiscount 내부에서
  // item.discountLabel이 falsy(undefined)이면 파란 뱃지를 그리지 않는다.
  { id: 'seat-5d', car: '5호차', seat: '5D', oldPrice: '13,000원', price: '12,500원' },
  {
    id: 'seat-6a',
    car: '5호차',
    seat: '6A',
    discountLabel: '어린이할인', // 있으면 좌석번호 옆에 파란색 할인 뱃지가 추가로 표시됨
    oldPrice: '13,000원',
    price: '9,500원',
  },
  {
    id: 'seat-6b',
    car: '5호차',
    seat: '6B',
    discountLabel: '어린이할인',
    oldPrice: '13,000원',
    price: '9,500원',
  },
  {
    id: 'seat-6c',
    car: '5호차',
    seat: '6C',
    discountLabel: '경로할인', // 할인 종류가 달라도 같은 구조(discountLabel 텍스트)로 표현 가능
    oldPrice: '13,000원',
    price: '9,500원',
  },
  {
    id: 'seat-6d',
    car: '5호차',
    seat: '6D',
    discountLabel: '국가유공자할인',
    oldPrice: '13,000원',
    price: '9,500원',
  },
];

// 하단 "운임/할인" 요약 영역에 쓰이는 데이터. TicketDiscount는 summary가 없으면(undefined)
// 이 영역 자체를 그리지 않으므로, 필요한 화면에서만 넘기면 된다.
const sampleSummary = {
  fare: '65,000원', // 총 운임
  discount: '-14,500원', // 총 할인 (컴포넌트 내부에서 .bold + .colorBlue로 굵은 파란 글씨 처리됨)
};

function GuideTicketDiscount() {
  // 사용자가 "할인선택" 버튼을 누르면 TicketDiscount가 onSelect 콜백으로 클릭된 item 객체를
  // 그대로 넘겨준다. 그 값을 selected state에 저장해서 아래쪽에 "선택한 좌석" 문구로 보여준다.
  // 즉 데이터(state)는 부모인 이 가이드 컴포넌트가 들고 있고, 자식(TicketDiscount)은
  // 받은 데이터를 그리고 클릭 이벤트만 위로 알려주는 "단방향 데이터 흐름" 예시다.
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>Ticket Discount Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/ticket/components/TicketDiscount.jsx</p>
      </section>

      <section>
        <h4>티켓 할인</h4>
        {/* discountList, summary를 prop으로 그대로 전달한다.
            TicketDiscount는 discountList를 map()으로 돌며 좌석 5개를 렌더링하고,
            summary가 있으니 하단 운임/할인 요약 영역도 함께 그린다. */}
        <TicketDiscount
          discountList={sampleDiscountList}
          summary={sampleSummary}
          onSelect={(item) => setSelected(item)}
        />

        {selected && (
          <p style={{ marginTop: '12px', color: '#1d4ed8' }}>
            선택한 좌석: {selected.car} {selected.seat} ({selected.price})
          </p>
        )}
      </section>
    </div>
  );
}

export default GuideTicketDiscount;
