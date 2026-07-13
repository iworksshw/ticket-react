import React from 'react';
import styles from './Mypage.module.scss';

const STATE_LABELS = {
  cancel: '예약취소',
  confirmWait: '승인대기',
  payWait: '결제대기',
  payComplete: '결제완료',
};

//UI Components : comMypage
/**
 * 마이페이지 예약카드 컴포넌트
 * @param {Array} reservations - 예약 목록 [{ href, date, title, time, location, price, applyDate, reservNo, state }]
 *   state: 'cancel' | 'confirmWait' | 'payWait' | 'payComplete'
 */
const Mypage = ({ reservations = [] }) => {
  return (
    <div className={styles.comMypage}>
      <div className={styles.mypageWrap}>
        {reservations.map((item, idx) => (
          <div className={styles.mypageArea} key={idx}>
            <a href={item.href || '#'} className={styles.link}>
              <div className={styles.contBox}>
                <div className={styles.top}>
                  <div className={styles.dateBox}>
                    <p className={styles.dateTxt}>체험일</p>
                    <p className={styles.date}>{item.date}</p>
                  </div>
                </div>
                <div className={styles.middle}>
                  <div className={styles.txt}>{item.title} <span>{item.time}</span></div>
                </div>
                <div className={styles.base}>
                  <p className={styles.formerTxt}>위치 <span className={styles.latterTxt}>{item.location}</span></p>
                  <p className={styles.formerTxt}>이용료 <span className={styles.latterTxt}>{item.price}</span></p>
                  <p className={styles.formerTxt}>신청일 <span className={styles.latterTxt}>{item.applyDate}</span></p>
                  <p className={styles.formerTxt}>예약번호 <span className={styles.latterTxt}>{item.reservNo}</span></p>
                </div>
              </div>
              <div className={styles.stateBox}>
                <p className={`${styles.state} ${styles[item.state]}`.trim()}>{STATE_LABELS[item.state]}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mypage;
