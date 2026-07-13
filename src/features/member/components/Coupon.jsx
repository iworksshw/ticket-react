import React from 'react';
import styles from './Coupon.module.scss';

//UI Components : comCoupon
/**
 * 나의 쿠폰함 컴포넌트
 * @param {Array} coupons - 쿠폰 목록
 *   - badgeType {string} 'new' | 'gift'
 *   - title {string} 쿠폰명
 *   - amount {string} 할인 금액 텍스트 (예: 'US $7.56', '10,000원')
 *   - wonAmount {string} [선택] 원화 환산 텍스트 (예: '₩10,000')
 *   - validUntil {string} 유효기간
 *   - sender {string} [선택] 보낸사람 정보 (badgeType이 gift일 때)
 */
const Coupon = ({ coupons = [] }) => {
  return (
    <div className={styles.comCoupon}>
      {coupons.map((coupon, idx) => {
        const isGift = coupon.badgeType === 'gift';

        return (
          <div className={styles.couponBox} key={`${coupon.title}-${idx}`}>
            <div className={styles.imgWrap}>
              <span className={styles.img} aria-hidden="true"></span>
              <span className="blind">쿠폰 arex</span>
            </div>
            <div className={styles.txt}>
              <p className={styles.tit}>
                {coupon.title}
                <i className={isGift ? styles.gift : styles.new}>{isGift ? '선물' : 'NEW'}</i>
              </p>
              <p className={styles.discount}>
                {coupon.amount}{' '}
                {coupon.wonAmount && <span className={styles.won}>({coupon.wonAmount})</span>} 할인
              </p>
              <div className={styles.date}>
                <p className={styles.dateTxt}>
                  유효기간 <span className={styles.dateNum}>{coupon.validUntil} 까지</span>
                </p>
                {isGift && coupon.sender && (
                  <p className={styles.dateTxt}>
                    보낸사람 <span className={styles.dateNum}>{coupon.sender}</span>
                  </p>
                )}
              </div>
            </div>
            {/* imgCoupon : 쿠폰 아이콘 / blueTxt : 블루 컬러 텍스트, imgGift : 받은 선물 아이콘 / darkTxt : 받은 선물 텍스트 */}
            {isGift ? (
              <button type="button" className={styles.present} disabled>
                <span className={styles.imgGift}></span>
                <span className={styles.darkTxt}>받은선물</span>
              </button>
            ) : (
              <button type="button" className={styles.present}>
                <span className={styles.imgCoupon}></span>
                <span className={styles.blueTxt}>쿠폰선물</span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Coupon;
