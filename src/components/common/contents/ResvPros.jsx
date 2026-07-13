import React from 'react';
import styles from './ResvPros.module.scss';

//UI Components : comResvPros
/**
 * 체험학습 예약 절차 컴포넌트
 * @param {Array} items - 절차 목록 [{ title, wide, sub: { type: 'text'|'link', text, onClick } }]
 * @param {string} className - 추가적인 커스텀 클래스
 */
const ResvPros = ({ items = [], className = '' }) => {
  return (
    <div className={`${styles.comResvPros} ${className}`.trim()}>
      <div className={styles.inner}>
        <ul>
          {items.map((item, idx) => (
            <li className={`${item.wide ? styles.wide : ''}`.trim()} key={idx}>
              <div className={styles.txtBox}>
                <p>{item.title}</p>
              </div>
              {item.sub && (
                <div className={styles.subBox}>
                  {item.sub.type === 'link' ? (
                    <a href="javascript:void(0)" onClick={item.sub.onClick}>{item.sub.text}</a>
                  ) : (
                    <span>{item.sub.text}</span>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResvPros;
