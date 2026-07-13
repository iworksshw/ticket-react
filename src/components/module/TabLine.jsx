import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import styles from './TabLine.module.scss';

//UI Components : tabInTab
// 원본 퍼블리싱 파일: docs/html-src/html/module/modTabInTab.html
/**
 * 탭 안 탭(라인 스타일) 컴포넌트
 * @param {Array} items - 내부 탭 목록
 *   - label {string} 탭 이름
 *   - content {ReactNode} 탭 콘텐츠
 * @param {boolean} sticky - 스크롤 시 탭 메뉴 상단 고정 여부
 * @param {number} defaultIndex - 최초 선택 탭 인덱스
 * @param {boolean} singleContent - true면 콘텐츠 영역을 1개만 두고 그 안의 내용만 교체, false면 탭 수만큼 콘텐츠 영역을 만들고 on 클래스로 제어
 */
const TabLine = ({ items = [], sticky = false, defaultIndex = 0, singleContent = false }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const activeItem = items[activeIndex];

  const wrapClass = `${styles.tabInTab} ${sticky ? styles.sticky : ''}`.trim();

  return (
    <div className={styles.modTab}>
      <div className={wrapClass}>
        <Swiper
          modules={[FreeMode]}
          className={styles.inTabSwiper}
          wrapperClass={styles.inTabMenu}
          slidesPerView="auto"
          freeMode
        >
          {items.map((item, index) => {
            const isOn = index === activeIndex;
            const nameClass = `${styles.inTabName} ${isOn ? styles.on : ''}`.trim();

            return (
              <SwiperSlide
                className={styles.inTabItem}
                style={{ width: 'auto', flexShrink: 0 }}
                key={item.label}
              >
                {/* button 대신 div[role=button] 사용: 슬라이드 안에 실제 <button>이 있으면
                    스와이퍼가 그 지점에서 시작하는 드래그를 인식하지 못해 스와이프가 막힌다. */}
                <div
                  role="button"
                  tabIndex={0}
                  className={nameClass}
                  title={isOn ? '선택 된 내부탭' : '내부탭'}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveIndex(index);
                    }
                  }}
                >
                  {item.label}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className={styles.inTabContainer}>
          {singleContent ? (
            <div className={`${styles.inTabCont} ${styles.on}`}>{activeItem && activeItem.content}</div>
          ) : (
            items.map((item, index) => (
              <div
                className={`${styles.inTabCont} ${index === activeIndex ? styles.on : ''}`.trim()}
                key={item.label}
              >
                {item.content}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TabLine;
