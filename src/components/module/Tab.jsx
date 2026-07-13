import React, { useState } from 'react';
import styles from './Tab.module.scss';

//UI Components : modTab
/**
 * 탭 메뉴 컴포넌트
 * @param {Array} tabs - 탭 목록
 *   - label {string} 탭 이름
 *   - num {string|number} [선택] 탭 옆 숫자 뱃지
 *   - disabled {boolean} [선택] 비활성화 여부
 *   - content {ReactNode} 탭 콘텐츠
 * @param {string} variant - tabMenu 레이아웃 옵션 (예: 'half')
 * @param {number} defaultIndex - 최초 선택 탭 인덱스
 * @param {boolean} singleContent - true면 콘텐츠 영역을 1개만 두고 그 안의 내용만 교체, false면 탭 수만큼 콘텐츠 영역을 만들고 on 클래스로 제어
 */
const Tab = ({ tabs = [], variant = '', defaultIndex = 0, singleContent = false }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const activeTab = tabs[activeIndex];

  const menuClass = `${styles.tabMenu} ${variant ? styles[variant] : ''}`.trim();

  return (
    <div className={styles.modTab}>
      <div className={styles.tabSwiper}>
        <ul className={menuClass}>
          {tabs.map((tab, index) => {
            const isOn = index === activeIndex;
            const tabNameClass = `${styles.tabName} ${isOn ? styles.on : ''}`.trim();
            const title = tab.disabled ? '탭메뉴 비활성' : isOn ? '선택 된 탭메뉴' : '탭메뉴';

            return (
              <li className={styles.tabItem} key={`${tab.label}-${index}`}>
                <button
                  type="button"
                  className={tabNameClass}
                  title={title}
                  disabled={tab.disabled}
                  onClick={() => setActiveIndex(index)}
                >
                  {tab.label} {tab.num !== undefined && <span className={styles.num}>{tab.num}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.tabContainer}>
        {singleContent ? (
          <div className={`${styles.tabCont} ${styles.on}`}>{activeTab && activeTab.content}</div>
        ) : (
          tabs.map((tab, index) => (
            <div
              className={`${styles.tabCont} ${index === activeIndex ? styles.on : ''}`.trim()}
              key={`${tab.label}-${index}`}
            >
              {tab.content}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tab;
