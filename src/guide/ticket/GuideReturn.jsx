import { useState } from 'react';
import Return from '@/features/ticket/components/Return';

// html 원본(comReturn.html)에 있던 <li class="item"> 마크업을 데이터로 옮긴 것.
const sampleGoodsList = [
  {
    id: 'goods-1',
    name: '5,000원 충전된 교통카드 / 옵션1, 옵션2',
    count: 0,
    price: '10000원',
  },
];

function GuideReturn() {
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
    <>
      <h3>Return Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/ticket/components/Return.jsx</p>

      {/* 상품 반품 + 내부 TicketGoods */}
      <div style={{ marginBottom: '20px' }}>
        <h4>상품 반품</h4>
        <Return
          goodsList={goodsList}
          onCountChange={handleCountChange}
          onRemove={handleRemove}
        />
      </div>

      {/* 상품없음 상태 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>상품없음</h4>
        <Return goodsList={[]} />
      </div>
    </>
  );
}
export default GuideReturn;
