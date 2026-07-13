import React, { useEffect, useRef, useState } from 'react';
import styles from './Popup.module.scss';

//UI Components : modPopup
/**
 * 팝업(모달) 컴포넌트
 * @param {boolean} isOpen - 팝업 열림 여부
 * @param {function} onClose - 닫기 버튼 클릭 시 호출되는 함수
 * @param {string} size - 팝업 크기 (tini | sm | md | lg | xl), 기본값 md
 * @param {boolean} fullCase - PC 사이즈에서 풀스크린으로 표시할지 여부
 * @param {boolean} gall - 갤러리형 팝업 여부 (콘텐츠 영역 여백 제거)
 * @param {ReactNode} title - 팝업 타이틀
 * @param {ReactNode} footer - 팝업 하단 버튼 영역 (없으면 렌더링하지 않음)
 * @param {string} width - popupArea 너비를 개별 지정할 때 사용 (선택)
 * @param {string} height - popupArea 높이를 개별 지정할 때 사용 (선택)
 * @param {ReactNode} children - 팝업 콘텐츠 영역
 */
const Popup = ({
  isOpen = false,
  onClose,
  size = 'md',
  fullCase = false,
  gall = false,
  title,
  footer,
  width,
  height,
  children,
}) => {
  const closeButtonRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  // 원본 vanilla 버전(openPopup/closePopup)과 동일한 포커스 이동 동작.
  // 열릴 때: 열기 직전 포커스를 기억해두고, 닫기 버튼으로 포커스를 옮긴다.
  // 닫힐 때: 기억해둔 요소(팝업을 연 버튼 등)로 포커스를 되돌린다.
  useEffect(() => {
    if (isOpen) {
      lastFocusedRef.current = document.activeElement;
      closeButtonRef.current?.focus();
    } else if (lastFocusedRef.current) {
      lastFocusedRef.current.focus();
      lastFocusedRef.current = null;
    }
  }, [isOpen]);

  // 콘텐츠 영역 스크롤 시 타이틀 하단에 그림자 표시 (원본: scroll 이벤트로 popTitle에 shadow 클래스 토글)
  const handleScroll = (e) => {
    setScrolled(e.currentTarget.scrollTop >= 1);
  };

  const popupClass = [
    styles.modPopup,
    styles[size],
    fullCase && styles.fullCase,
    gall && styles.gall,
    isOpen && styles.on,
  ]
    .filter(Boolean)
    .join(' ');

  const areaStyle = {};
  if (width) areaStyle.width = width;
  if (height) areaStyle.height = height;

  const titleClass = `${styles.popTitle} ${scrolled ? styles.shadow : ''}`.trim();

  return (
    <div className={popupClass}>
      <div className={styles.popupDim}>딤영역</div>
      <div className={styles.popupArea} style={areaStyle}>
        <div className={styles.popupInMotion}>
          <div className={styles.popupContainer}>
            <div className={styles.popupContArea}>
              <button type="button" className={styles.btnPopClose} ref={closeButtonRef} onClick={onClose}>
                닫기
              </button>

              {title && <div className={titleClass}>{title}</div>}

              <div className={styles.popCont} onScroll={handleScroll}>
                {children}
              </div>

              {footer && (
                <div className={styles.popBtm}>
                  <div className={styles.alignC}>
                    <div className={styles.cta}>{footer}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
