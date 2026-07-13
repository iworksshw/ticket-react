import React from 'react';
import styles from './StepInfo.module.scss';

//UI Components : comStepInfo
/**
 * 신청절차 컴포넌트
 * @param {Array} items - 절차 목록 [{ step, title, desc, icon }] icon: icon001~icon014
 * @param {string} className - 추가적인 커스텀 클래스
 */
const StepInfo = ({ items = [], className = '' }) => {
  return (
    <div className={`${styles.comStepInfo} ${className}`.trim()}>
      <ul className={styles.stepList}>
        {items.map((item, idx) => (
          <li className={`${styles.stepItem} ${styles[item.icon] || ''}`.trim()} key={idx}>
            <i className={styles.eyebrow}>{item.step}</i>
            <em className={styles.tit}>{item.title}</em>
            {item.desc && <span className={styles.desc}>{item.desc}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepInfo;
