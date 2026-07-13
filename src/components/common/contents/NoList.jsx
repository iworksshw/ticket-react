import styles from './NoList.module.scss';

// ui components : comNoList
// 원본 퍼블리싱 파일: docs/html-src/html/common/comNoList.html

/**
 * 리스트 내역 없음 안내 컴포넌트
 * @param {Array<node>} texts - 안내 문구 목록 (각 항목이 한 줄의 listText로 출력됨)
 * @param {'default'|'ticket'|'history'} variant - 영역별 스타일 (ticket: 승차권 영역, history: 이용내역 영역)
 * @param {string} className - 추가적인 커스텀 클래스
 */
const NoList = ({
  texts = [],
  variant = 'default',
  className = '',
}) => {
  const noListClass = `${styles.comNoList} ${variant !== 'default' ? styles[variant] : ''} ${className}`.trim();

  return (
    <div className={noListClass}>
      {texts.map((text, index) => (
        <p key={index} className={styles.listText}>{text}</p>
      ))}
    </div>
  );
};

export default NoList;
