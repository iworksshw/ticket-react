import React from 'react';
import styles from './Receipt.module.scss';

//UI Components : comReceipt
/**
 * 영수증 상단 컴포넌트
 * @param {string} logoSrc - 로고 이미지 경로
 * @param {string} logoAlt - 로고 이미지 alt 텍스트
 * @param {string} title - 타이틀 (예: 영수증)
 * @param {string} subTitle - 타이틀 옆 강조 텍스트 (예: (반환))
 * @param {string} num - 열차 번호 (예: A1035)
 * @param {string} info - 경로 정보 (예: 서울역(10:30) → 인천공항2터미널(11:10))
 * @param {string} seat - 좌석 수 텍스트 (예: (3석))
 * @param {Array} list - 승인 정보 목록 [{ dt, dd }]
 * @param {string} totalLabel - 총 결제 금액 라벨
 * @param {string} totalValue - 총 결제 금액 값
 * @param {string[]} comments - 하단 안내 문구 목록
 */
const Receipt = ({
  logoSrc = '/images/common/logo_160_arex.svg',
  logoAlt = 'arex 로고',
  title = '영수증',
  subTitle = '(반환)',
  num,
  info,
  seat,
  list = [],
  totalLabel = '총 결제 금액',
  totalValue,
  comments = [],
}) => {
  return (
    <div className={styles.comReceipt}>
      <div className={styles.receiptBox}>
        <p className={styles.logoImg}><img src={logoSrc} alt={logoAlt} /></p>
        <p className={styles.txt}>{title} {subTitle && <em>{subTitle}</em>}</p>
      </div>
      <div className={styles.receiptBox}>
        <p className={styles.num}>{num}</p>
        <p className={styles.info}>{info} {seat && <span className={styles.seat}>{seat}</span>}</p>
      </div>
      <dl className={styles.receiptListGroup}>
        {list.map((item) => (
          <div className={styles.item} key={item.dt}>
            <dl className={styles.receiptList}>
              <dt>{item.dt}</dt>
              <dd>{item.dd}</dd>
            </dl>
          </div>
        ))}
      </dl>
      <dl className={styles.receiptTotal}>
        <dt>{totalLabel}</dt>
        <dd>{totalValue}</dd>
      </dl>
      <div className={styles.receiptCmt}>
        {comments.map((comment) => (
          <p key={comment}>{comment}</p>
        ))}
      </div>
    </div>
  );
};

export default Receipt;
