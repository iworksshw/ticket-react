import TotalPriceBtm from '@/features/ticket/components/TotalPriceBtm';

// 가이드 : TotalPriceBtm
// 원본 퍼블리싱 파일: docs/html-src/html/common/comTotalPriceBtm.html

const sampleItems = [
  { id: 'ticket', label: '승차권', amount: '0원' },
  { id: 'goods', label: '상품', amount: '-3,000원' },
  { id: 'fee', label: '변경 수수료', amount: 'US $1.81', wonText: '(₩2,000)' },
  { id: 'total', label: '총 결제 금액', amount: '-1,000원', highlight: true },
];

function GuideTotalPriceBtm() {
  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>TotalPriceBtm Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/ticket/components/TotalPriceBtm.jsx</p>
      </section>

      <section>
        <h4>콘텐츠 하단 총 결제금액</h4>
        <TotalPriceBtm items={sampleItems} />
      </section>
    </div>
  );
}

export default GuideTotalPriceBtm;
