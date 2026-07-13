import styles from './Complete.module.scss';

// ui components : comComplete
// 원본 퍼블리싱 파일: docs/html-src/html/common/comComplete.html

/**
 * 예약 완료 안내 컴포넌트
 * @param {node} title - 완료 안내 제목
 * @param {node} desc - 완료 안내 설명
 * @param {boolean} chkIco - 완료 아이콘 노출 여부
 * @param {string} className - 추가적인 커스텀 클래스
 */
const Complete = ({
  title,
  desc,
  chkIco = true,
  className = '',
}) => {
  const completeClass = `${styles.comComplete} ${chkIco ? styles.chkIco : ''} ${className}`.trim();

  return (
    <div className={completeClass}>
      <div className={styles.completeTxt}>
        <p className={styles.title}>{title}</p>
        {desc && <p className={styles.desc}>{desc}</p>}
      </div>
    </div>
  );
};

export default Complete;
