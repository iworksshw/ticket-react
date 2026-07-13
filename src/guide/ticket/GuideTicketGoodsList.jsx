import { useState } from 'react';
import TicketGoodsList from '@/features/ticket/components/TicketGoodsList';

// TicketGoodsList 컴포넌트는 데이터를 내부에 갖고 있지 않으므로(=재사용 가능한 "뷰" 컴포넌트),
// 가이드 페이지처럼 "이 컴포넌트를 실제로 사용하는 쪽"에서 보여줄 데이터를 직접 준비해야 한다.
// 아래 sampleGoodsList는 원본 퍼블리싱 파일(comTicketGoodsList.html)에 있던 3개의 <li> 마크업을
// 그대로 데이터로 옮긴 것이다. html에서는 같은 마크업을 복붙해서 3번 반복했지만,
// React에서는 "마크업 1개 + 데이터 배열"로 표현해서 항목이 몇 개든 같은 코드로 그릴 수 있게 한다.
const sampleGoodsList = [
  {
    id: 'goods-1', // map()의 key로 사용되는 고유 식별자
    image: '/images/temp/temp_01_01_001.jpg',
    alt: '5,000원 충전된 교통카드 이미지',
    name: '5,000원 충전된 교통카드',
    oldPrice: '13,000원', // 할인 전 가격 (취소선 스타일)
    price: '9,500원', // 실제 판매가
    soldOut: true, // true면 가격 옆에 "품절" 뱃지가 추가로 표시됨
    //won: '₩13,000',
    badge: 'saleEnd', // TicketGoodsList 내부에서 styles['saleEnd']로 클래스를 동적 매핑
    badgeLabel: '기간할인종료', // 위 badge 클래스 안에 실제로 보일 문구
    date: '2023-12-30 까지',
    num: '재고 23개',
  },
  {
    id: 'goods-2',
    image: '/images/temp/temp_01_01_001.jpg',
    alt: '5,000원 충전된 교통카드 이미지',
    name: '5,000원 충전된 교통카드',
    oldPrice: '1.50 USD',
    price: '1.00 USD',
    soldOut: true,
    won: '₩13,000',
    badge: 'sale', // 첫 번째 항목과 다른 뱃지 종류('saleEnd' 대신 'sale')를 보여주기 위한 샘플
    badgeLabel: '기간할인',
    date: '2023-12-30 까지',
    num: '재고 23개',
  },
  {
    id: 'goods-3',
    image: '/images/temp/temp_01_01_001.jpg',
    alt: '5,000원 충전된 교통카드 이미지',
    name: '5,000원 충전된 교통카드',
    //oldPrice: '13,000원',
    price: '9,000원',
    soldOut: true,
    won: '₩13,000',
    //badge: 'sale',
    //badgeLabel: '기간할인',
    date: '2023-12-30 까지',
    num: '재고 23개',
  },
];

function GuideTicketGoodsList() {
  // 사용자가 상품을 클릭하면 TicketGoodsList가 onSelect 콜백으로 클릭된 goods 객체를 넘겨준다.
  // 그 값을 selected state에 저장해두면, 아래쪽에 "선택한 상품" 안내 문구를 렌더링할 수 있다.
  // 즉 데이터는 부모(이 가이드 컴포넌트)가 들고 있고, 자식(TicketGoodsList)은 그 데이터를 그리기만
  // 하는 "단방향 데이터 흐름"을 보여주는 예시이기도 하다.
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>Ticket Goods List Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/ticket/components/TicketGoodsList.jsx</p>
      </section>

      <section>
        <h4>추천상품목록</h4>
        {/* goodsList prop으로 위에서 만든 샘플 데이터를 그대로 전달한다.
            TicketGoodsList는 이 배열을 map()으로 돌며 li 3개를 렌더링한다. */}
        <TicketGoodsList goodsList={sampleGoodsList} onSelect={(goods) => setSelected(goods)} />

        {selected && (
          <p style={{ marginTop: '12px', color: '#1d4ed8' }}>
            선택한 상품: {selected.name} ({selected.price})
          </p>
        )}
      </section>
    </div>
  );
}

export default GuideTicketGoodsList;
