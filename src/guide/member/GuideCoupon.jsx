//쿠폰함
import Coupon from '@/features/member/components/Coupon';

const sampleCoupons = [
  {
    badgeType: 'new',
    title: '2025년 도심공항터미널 우수 이용고객 리워드',
    amount: 'US $7.56',
    wonAmount: '₩10,000',
    validUntil: '2025-11-01',
  },
  {
    badgeType: 'gift',
    title: '2025년 도심공항터미널 우수 이용고객 리워드',
    amount: '10,000원',
    validUntil: '2025-11-01',
    sender: 'email_id@domain.co.kr / 2026-11-01',
  },
];

function GuideCoupon() {
  return (
    <>
      <h3>Coupon Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/member/components/Coupon.jsx</p>

      {/* 나의 쿠폰함 : 보유쿠폰 / 선물로 받은 쿠폰 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>나의 쿠폰함</h4>
        <Coupon coupons={sampleCoupons} />
      </div>
    </>
  );
}
export default GuideCoupon;
