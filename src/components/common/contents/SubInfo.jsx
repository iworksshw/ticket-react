import React from 'react';
import styles from './SubInfo.module.scss';

//UI Components : comSubInfo
/**
 * 서브 정보 텍스트 컴포넌트
 * @param {React.ReactNode} children - 안내 텍스트 (강조는 <em>으로 감싸서 전달)
 * @param {Array} descList - 하단 불릿 목록 [{ text, highlight, caption }]
 * @param {boolean} lg - 큰 사이즈(comSubInfoLg) 적용 여부
 * @param {string} className - 추가적인 커스텀 클래스
 */
const SubInfo = ({ children, descList = [], lg = false, className = '' }) => {
  const boxClass = `${styles.comSubInfo} ${lg ? styles.comSubInfoLg : ''} ${className}`.trim();

  return (
    <div className={boxClass}>
      <div className={styles.infoText}>{children}</div>

      {descList.length > 0 && (
        <ul className={styles.descList}>
          {descList.map((item) => (
            <li className={styles.descItem} key={item.text}>
              {item.text}
              {item.highlight && <em className={styles.blue}>{item.highlight}</em>}
              {item.caption && (
                <p className={`pubCaption ${styles.pubCaption}`}>{item.caption}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubInfo;
