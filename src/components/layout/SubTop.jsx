import styles from './SubTop.module.scss';
import Dropdown from '@/components/common/forms/Dropdown';

//UI Components : cptSubTop
/**
 * 서브 페이지 상단(브레드크럼 + 타이틀) 컴포넌트
 * @param {ReactNode} title - 서브 타이틀(h1)
 * @param {string} homeHref - 홈 링크 주소, 기본값 '/'
 * @param {Array} crumbs - 브레드크럼 항목 목록 (홈 다음에 이어지는 depth들)
 *   - label {string} 현재 위치로 표시될 트리거 텍스트
 *   - items {Array} 드롭다운으로 펼쳐지는 이동 가능한 목록 [{ label, href, onClick }]
 */
const SubTop = ({ title, homeHref = '/', crumbs = [] }) => {
  return (
    <div className={styles.cptSubTop}>
      <div className={styles.subTopArea}>
        <div className={styles.comBreadCrumb}>
          <div className={styles.bcArea}>
            <ul className={styles.bcList}>
              <li className={styles.bcItem}>
                <a href={homeHref}>홈</a>
              </li>
              {crumbs.map((crumb) => (
                <li className={styles.bcItem} key={crumb.label}>
                  <Dropdown variant="comDropdownLocn" trigger={crumb.label} items={crumb.items} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.comSubTitle}>
          <div className={styles.subTitleArea}>
            <h1>{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubTop;
