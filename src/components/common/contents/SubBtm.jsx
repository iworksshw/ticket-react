import React from 'react';
import styles from './SubBtm.module.scss';

//UI Components : comSubBtm
/**
 * 담당부서 컴포넌트
 * @param {string[]} locations - 담당부서 목록
 * @param {string} phone - 연락처
 * @param {boolean} center - 하단 리스트 중앙 정렬 여부 (subCenterArea)
 */
const SubBtm = ({ locations = [], phone = '', center = false }) => {
  const areaClass = `${styles.subBtmArea} ${center ? styles.subCenterArea : ''}`.trim();

  return (
    <div className={styles.comSubBtm}>
      <div className={areaClass}>
        {locations && locations.length > 0 ? (
        <dl className={styles.manager}>
          <dt>담당부서</dt>
          <dd>
            <ul>
              {locations.map((location) => (
                <li key={location}>{location}</li>
              ))}
            </ul>
          </dd>
        </dl>
        ) : null}
        <ul className={styles.btmList}>
          <li className={styles.phone}>{phone}</li>
        </ul>
      </div>
    </div>
  );
};

export default SubBtm;
