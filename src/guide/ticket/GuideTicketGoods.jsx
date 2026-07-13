import { useState } from 'react';
import TicketGoods from '@/features/ticket/components/TicketGoods';

// html 원본(comTicketGoods.html)에 있던 2개의 <li class="item"> 마크업을 데이터로 옮긴 것.
const sampleGoodsList = [
  {
    id: 'goods-1',
    name: '5,000원 충전된 교통카드',
    count: 0,
    price: '10000원',
  },
  {
    id: 'goods-2',
    name: '10,000원 충전된 교통카드',
    count: 1,
    oldPrice: '10000원',
    price: '10000원',
    won: '(₩12,500)',
  },
];

const sampleTotal = {
  oldPrice: '25,000원',
  price: '25,000원',
  won: '(₩12,500)',
};

function GuideTicketGoods() {
  const [goodsList, setGoodsList] = useState(sampleGoodsList);

  const handleCountChange = (id, value) => {
    setGoodsList((prev) =>
      prev.map((goods) => (goods.id === id ? { ...goods, count: value } : goods))
    );
  };

  const handleRemove = (id) => {
    setGoodsList((prev) => prev.filter((goods) => goods.id !== id));
  };

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>Ticket Goods Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/ticket/components/TicketGoods.jsx</p>
      </section>

      <section>
        <h4>(티켓) 상품</h4>
        <TicketGoods
          goodsList={goodsList}
          total={goodsList.length > 0 ? sampleTotal : undefined}
          onCountChange={handleCountChange}
          onRemove={handleRemove}
        />
      </section>

      <section>
        <h4>상품없음</h4>
        <TicketGoods goodsList={[]} />
      </section>
    </div>
  );
}

export default GuideTicketGoods;
