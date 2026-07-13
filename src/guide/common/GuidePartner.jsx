import Partner from '@/components/common/contents/Partner';

// 가이드 : Partner
// 원본 퍼블리싱 파일: docs/html-src/html/common/comPartner.html (리스트형)

const samplePartners = [
  {
    id: 'cafeSky',
    title: '카페 드 스카이',
    benefitLabel: '혜택',
    benefitDesc: '음료 가격의 10% 할인 (세트메뉴, 푸드, MD 상품 제외)',
    image: '/images/common/logo_cafeSky.png',
    alt: '카페 드 스카이 로고',
  },
  {
    id: 'lounge',
    title: '더 라운지',
    benefitLabel: '혜택',
    benefitDesc: '인천국제공항라운지 43.3% 할인',
    image: '/images/common/logo_lounge.png',
    alt: '더 라운지 로고',
  },
];

function GuidePartner() {
  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>Partner Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/contents/Partner.jsx</p>
      </section>

      <section>
        <h4>제휴서비스 (리스트형)</h4>
        <Partner
          partners={samplePartners}
          onSelectPartner={(partner) => alert(`"${partner.title}" 선택`)}
          onConfirm={() => alert('확인 클릭')}
        />
      </section>
    </div>
  );
}

export default GuidePartner;
