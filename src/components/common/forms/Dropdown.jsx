import { useEffect, useId, useRef, useState } from 'react';

//UI Components : comDropdown

const DROPDOWN_OPEN_EVENT = 'comDropdown:open';

/**
 * 공용 드롭다운 컴포넌트 (gnb 개인정보 메뉴 / breadcrumb 위치 이동 메뉴 등에서 공용으로 사용)
 * @param {ReactNode} trigger - 드롭다운을 여는 버튼 내부 콘텐츠 (텍스트 또는 아이콘+blind 텍스트)
 * @param {Array} items - 메뉴 목록
 *   - label {ReactNode} 항목 텍스트
 *   - href {string} [선택] 지정하면 링크(a)로, 없으면 텍스트만 있는 항목(li)으로 렌더링
 *   - onClick {function} [선택]
 * @param {string} variant - 스타일 변형 ('' 기본 | 'comDropdownLocn' 위치이동형 | 'comMyDrop' 회원 정보형)
 * @param {string} triggerClassName - 트리거 버튼에 추가할 클래스 (예: gnb의 infoBtn)
 */
const Dropdown = ({ trigger, items = [], variant = '', triggerClassName = '' }) => {
  const id = useId();
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);

  // 바깥 클릭 시 닫힘 + 다른 Dropdown이 열리면 자신은 닫힘 (원본 common.js initDropdowns 동일 동작)
  useEffect(() => {
    if (!open) return undefined;

    const handleOutsideClick = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const handleOtherDropdownOpen = (e) => {
      if (e.detail !== id) setOpen(false);
    };

    document.addEventListener('click', handleOutsideClick);
    window.addEventListener(DROPDOWN_OPEN_EVENT, handleOtherDropdownOpen);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      window.removeEventListener(DROPDOWN_OPEN_EVENT, handleOtherDropdownOpen);
    };
  }, [open, id]);

  const handleToggle = (e) => {
    e.stopPropagation();
    setOpen((prev) => {
      const next = !prev;
      if (next) window.dispatchEvent(new CustomEvent(DROPDOWN_OPEN_EVENT, { detail: id }));
      return next;
    });
  };

  // 메뉴의 마지막 "포커스 가능한" 항목에서 Tab으로 빠져나가면 닫힘
  const lastFocusableIndex = items.reduce((acc, item, index) => (item.href ? index : acc), -1);
  const handleLastItemKeyDown = (e) => {
    if (e.key === 'Tab' && !e.shiftKey) setOpen(false);
  };

  const rootClass = `comDropdown ${variant}`.trim();
  const triggerClass = `btnDrop ${triggerClassName} ${open ? 'open' : ''}`.trim();

  return (
    <div className={rootClass} ref={rootRef}>
      <div className="dropArea">
        <button
          type="button"
          className={triggerClass}
          title={open ? '닫힘' : '열림'}
          aria-expanded={open}
          onClick={handleToggle}
        >
          {trigger}
        </button>
        <ul className={`dropMenu ${open ? 'on' : ''}`.trim()}>
          {items.map((item, index) => (
            <li key={item.label}>
              {item.href ? (
                <a
                  href={item.href}
                  onClick={item.onClick}
                  onKeyDown={index === lastFocusableIndex ? handleLastItemKeyDown : undefined}
                >
                  {item.label}
                </a>
              ) : (
                item.label
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
