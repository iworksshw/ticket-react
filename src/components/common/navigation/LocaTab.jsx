import React from 'react';
import styles from './LocaTab.module.scss';

//UI Components : comLocaTab
/**
 * 역 위치 탭 (역간 이동) 컴포넌트
 * @param {string} stnNum - 현재 역 번호 (예: A05)
 * @param {string} stnNm - 현재 역 이름 (예: 김포공항)
 * @param {function} onPresentClick - 현재 역(present) 클릭 핸들러
 * @param {Object} prev - 이전 역 정보 { label, onClick }
 * @param {Object} next - 다음 역 정보 { label, onClick }
 * @param {string} className - 추가적인 커스텀 클래스
 */
const LocaTab = ({ stnNum, stnNm, onPresentClick, prev, next, className = '' }) => {
  const linkClass = `${styles.stnLink} ${!next ? styles.jsStart : ''} ${!prev ? styles.jsEnd : ''}`.trim();

  return (
    <div className={`${styles.comLocaTab} ${className}`.trim()}>
      <div className={styles.present}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPresentClick?.();
          }}
        >
          <span className={styles.stnNum}>{stnNum}</span>
          <span className={styles.stnNm}>{stnNm}</span>
        </a>
      </div>
      <div className={linkClass}>
        {prev && (
          <a
            href="#"
            className={styles.prev}
            onClick={(e) => {
              e.preventDefault();
              prev.onClick?.();
            }}
          >
            {prev.label}
          </a>
        )}
        {next && (
          <a
            href="#"
            className={styles.next}
            onClick={(e) => {
              e.preventDefault();
              next.onClick?.();
            }}
          >
            {next.label}
          </a>
        )}
      </div>
    </div>
  );
};

export default LocaTab;
