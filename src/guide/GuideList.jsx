import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styles from './GuideList.module.css';

// 가이드가 늘어나서 분야별로 묶어서 보여준다. 그룹을 추가/이동할 땐 이 배열만 수정하면 된다.
const guideGroups = [
  {
    title: '폼',
    items: [
      { path: 'button', label: 'Button Guide' },
      { path: 'dropdown', label: 'Dropdown Guide' },
      { path: 'input', label: 'Input Guide' },
      { path: 'check', label: 'Check Guide' },
      { path: 'select', label: 'Select Guide' },
      { path: 'file-attach', label: 'File Attach Guide' },
      { path: 'form-table', label: 'Form Table Guide' },
    ],
  },
  {
    title: '검색',
    items: [
      { path: 'meeting', label: 'Meeting Guide' },
    ],
  },
  {
    title: '공통',
    items: [
      { path: 'contents', label: 'Contents Guide' },
      { path: 'table', label: 'Table Guide' },
      { path: 'box', label: 'Ticket Box Guide' },
      { path: 'sub-info', label: 'Sub Info Guide' },
      { path: 'img-wrap', label: 'Img Wrap Guide' },
      { path: 'terms-agree', label: 'Terms Agree Guide' },
      { path: 'info-box', label: 'Info Box Guide' },
      { path: 'step-box', label: 'Step Box Guide' },
      { path: 'loca-tab', label: 'Loca Tab Guide' },
      { path: 'gray-box', label: 'Gray Box Guide' },
      { path: 'resv-pros', label: 'ResvPros Guide' },
      { path: 'step-info', label: 'StepInfo Guide' },
      { path: 'complete', label: 'Complete Guide' },
      { path: 'no-list', label: 'No List Guide' },
      { path: 'agree-pop', label: 'Agree Pop Guide' },
      { path: 'partner', label: 'Partner Guide' },
      { path: 'sub-btm', label: 'Sub Btm Guide' },
    ],
  },
  {
    title: '게시판',
    items: [
      { path: 'board', label: 'Board List Guide' },
      { path: 'board-view', label: 'Board View Guide' },
      { path: 'request-list', label: 'Request List Guide' },
      { path: 'board-card', label: 'Board Card Guide' },
    ],
  },
  {
    title: '열차예약',
    items: [
      { path: 'ticket-search', label: 'Ticket Search Guide' },
      { path: 'ticket-select', label: 'Ticket Select Guide' },
      { path: 'sta-select-pop', label: 'Station Select Pop Guide' },
      { path: 'calendar-pop', label: 'Calendar Pop Guide' },
      { path: 'seat-discount', label: 'Seat Discount Pop Guide' },
      { path: 'ticket-seat', label: 'Ticket Seat Pop Guide' },
      { path: 'ticket-pass', label: 'Ticket Pass Pop Guide' },
      { path: 'ticket-goods-list', label: 'Ticket Goods List Guide' },
      { path: 'ticket-goods', label: 'Ticket Goods Guide' },
      { path: 'ticket-discount', label: 'Ticket Discount Guide' },
      { path: 'ticket-info', label: 'Ticket Info Guide' },
      { path: 'ticket-price-info', label: 'Ticket Price Info Guide' },
      { path: 'ticket-view', label: 'Ticket View Guide' },
      { path: 'total-price-btm', label: 'Total Price Btm Guide' },
      { path: 'receipt', label: 'Receipt Guide' },
      { path: 'return', label: 'Return Guide' },
      { path: 'product', label: 'Product Guide' },
    ],
  },
  {
    title: '열차',
    items: [
      { path: 'schedule', label: 'Schedule Guide' },
      { path: 'mypage', label: 'Mypage Guide' },
      { path: 'pop-certi', label: 'Pop Certi Guide' },
    ],
  },
  {
    title: '회원',
    items: [
      { path: 'member-select', label: 'Member Select Guide' },
      { path: 'login', label: 'Login Guide' },
      { path: 'join', label: 'Join Guide' },
      { path: 'coupon', label: 'Coupon Guide' },
    ],
  },
  {
    title: '결제',
    items: [
      { path: 'pay-visa', label: 'Pay Visa Guide' },
      { path: 'pay-card', label: 'Pay Card Guide' },
    ],
  },
  {
    title: '소비자중심경영',
    items: [
      { path: 'customer', label: 'Customer Guide' },
    ],
  },
  {
    title: '고객불편접수',
    items: [
      { path: 'complain', label: 'Complain Guide' },
    ],
  },
  {
    title: '모듈',
    items: [
      { path: 'tab', label: 'Tab Guide' },
      { path: 'tab-line', label: 'Tab Line Guide' },
      { path: 'accordion', label: 'Accordion Guide' },
      { path: 'popup', label: 'Popup Guide' },
      { path: 'ticket-divide', label: 'Ticket Divide Guide' },
    ],
  },
  {
    title: '레이아웃',
    items: [
      { path: 'gnb', label: 'Gnb Guide' },
      { path: 'sub-top', label: 'SubTop Guide' },
      { path: 'footer', label: 'Footer Guide' },
    ],
  },
  {
    title: '스와이퍼',
    items: [
      { path: 'swiper', label: 'Swiper Guide' },
    ],
  },
  {
    title: '대시보드',
    items: [
      { path: 'dash-board', label: 'DashBoard Guide' },
    ],
  },
  {
    title: '캘린더',
    items: [
      { path: 'calender', label: 'Calender Guide' },
    ],
  },
];

function GuideList() {
  const location = useLocation();
  const [query, setQuery] = useState('');

  // 현재 주소가 속한 그룹은 처음부터 펼쳐진 상태로 시작한다.
  const [openGroups, setOpenGroups] = useState(() => {
    const initial = new Set();
    guideGroups.forEach((group) => {
      const isActiveGroup = group.items.some((item) => location.pathname.endsWith(`/${item.path}`));
      if (isActiveGroup) initial.add(group.title);
    });
    return initial;
  });

  const toggleGroup = (title) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  // 검색어는 메뉴명(label)과 컴포넌트 경로(path, jsx명과 대응) 양쪽에서 찾는다.
  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;
  const visibleGroups = isSearching
    ? guideGroups
        .map((group) => ({
          ...group,
          items: group.items.filter(
            (item) =>
              item.label.toLowerCase().includes(normalizedQuery) ||
              item.path.toLowerCase().includes(normalizedQuery)
          ),
        }))
        .filter((group) => group.items.length > 0)
    : guideGroups;

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.title}>Guide List</div>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="메뉴명 또는 컴포넌트명 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <nav className={styles.navList}>
          {visibleGroups.map((group) => {
            const isOpen = isSearching || openGroups.has(group.title);
            return (
              <div key={group.title} className={styles.group}>
                <button
                  type="button"
                  className={styles.groupTitle}
                  onClick={() => toggleGroup(group.title)}
                  aria-expanded={isOpen}
                >
                  {group.title}
                  <span className={`${styles.groupArrow} ${isOpen ? styles.groupArrowOpen : ''}`.trim()} />
                </button>

                {isOpen && (
                  <div className={styles.groupItems}>
                    {group.items.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          `${styles.navItem} ${isActive ? styles.active : ''}`.trim()
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {isSearching && visibleGroups.length === 0 && (
            <div className={styles.noResult}>검색 결과가 없습니다.</div>
          )}
        </nav>
      </aside>

      <section className={styles.content}>
        <Outlet />
      </section>
    </div>
  );
}

export default GuideList;
