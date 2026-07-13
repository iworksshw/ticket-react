import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Gnb.module.scss';
import Popup from '@/components/module/Popup';
import Button from '@/components/common/forms/Button';
import Select from '@/components/common/forms/Select';
import Dropdown from '@/components/common/forms/Dropdown';
import { navItems as defaultNavItems } from '@/data/navigation';
import { useAuth } from '@/contexts/AuthContext';

//UI Components : cptGnb

// 메뉴 검색 데모용 샘플 결과 (모두 "일반"으로 시작하는 키워드가 하이라이트됨)
const searchSuggestions = [
  '열차 소개', '열차 운임안내', '열차 승차권구입 안내', '열차 역정보', '열차 편의시설', '열차 실시간 열차정보',
];

// 개인정보 드롭다운(comMyDrop) 메뉴 목록. 첫 항목은 링크가 아닌 안내 텍스트.
const memberMenuItems = [
  { label: '나의 AREX' },
  { label: '체험학습 예약내역', href: '#' },
  { label: '회의실 예약내역', href: '#' },
  { label: '자전거 휴대승차 예약내역', href: '#' },
  { label: '나의 쿠폰함', href: '#' },
  { label: '장바구니', href: '#' },
  { label: '회원정보', href: '#' },
];

/**
 * 글로벌 내비게이션(GNB) 컴포넌트
 * @param {Array} navItems - 메뉴 데이터, 기본값 defaultNavItems
 *   - id, label, mainTit, subTit, sitemapOnly, children[{ label, wide, children:[{label}] }]
 * @param {string} variant - 로고 교체 ('' 기본 | 'express' 직통열차 CI | 'standard' 일반열차 CI)
 * @param {boolean} hasCartItems - 장바구니에 담긴 상품이 있는지 여부 (아이콘 우측 상단 점 표시)
 */
const Gnb = ({ navItems = defaultNavItems, variant = '', hasCartItems = true }) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const gnbAreaRef = useRef(null);
  const searchInputRef = useRef(null);
  const sitemapOpenBtnRef = useRef(null);
  const moOpenBtnRef = useRef(null);
  const titleRefs = useRef({});

  const [activeDepth1, setActiveDepth1] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sitemapOpen, setSitemapOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langPopupOpen, setLangPopupOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(navItems[0]?.id ?? '');
  const [lang, setLang] = useState('');
  const [currency, setCurrency] = useState('');

  // 데스크톱 상단 메가메뉴는 마이페이지 등 sitemapOnly 항목은 노출하지 않는다.
  const gnbMenuItems = navItems.filter((item) => !item.sitemapOnly);

  // 메가 메뉴 : 마우스오버/포커스로 열고, 영역을 벗어나면 전부 닫는다 (원본 common.js showMenu/hideAllMenus 동일 동작)
  const hideDepth2 = () => setActiveDepth1(null);
  const handleGnbAreaBlur = (e) => {
    if (!gnbAreaRef.current?.contains(e.relatedTarget)) {
      hideDepth2();
    }
  };

  // 사이트맵/모바일메뉴가 열려있는 동안 배경 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = sitemapOpen || mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sitemapOpen, mobileMenuOpen]);

  // 사이트맵이 열린 채로 모바일 크기까지 화면이 줄어들면 자동으로 닫는다
  useEffect(() => {
    if (!sitemapOpen) return undefined;
    const handleResize = () => {
      if (window.innerWidth <= 1279) setSitemapOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sitemapOpen]);

  const closeSitemap = () => {
    setSitemapOpen(false);
    sitemapOpenBtnRef.current?.focus();
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    moOpenBtnRef.current?.focus();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openSearch = () => {
    setSearchOpen(true);
    requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  // 모바일 전체메뉴 : naviItem 클릭 시 해당 섹션으로 스크롤 이동
  const scrollToSection = (id) => {
    titleRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
  };

  // 스크롤 위치에 따라 naviItem의 active 상태를 자동으로 갱신 (원본 IntersectionObserver 동일 옵션)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.sectionId;
            if (id) setActiveSection(id);
          }
        });
      },
      { root: null, rootMargin: '-210px 0px -50% 0px', threshold: 0.01 }
    );

    const targets = Object.values(titleRefs.current).filter(Boolean);
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navItems]);

  const gnbClass = [styles.cptGnb, variant && styles[variant], searchOpen && styles.active].filter(Boolean).join(' ');
  const gnbAreaClass = [styles.gnbArea, activeDepth1 !== null && styles.active].filter(Boolean).join(' ');

  return (
    <div className={gnbClass}>
      <div className={gnbAreaClass} ref={gnbAreaRef} onMouseLeave={hideDepth2} onBlur={handleGnbAreaBlur}>
        <div className={styles.gnbGroup}>
          {/* 로고 */}
          <div className={styles.logoBox}>
            <div className={styles.logo}>
              <a href="/">공항철도</a>
            </div>
            <div className={styles.logoSide}>
              <a href="/">롯데마트</a>
            </div>
          </div>

          <div className={styles.gnbBox}>
            {/* gnb 상단 */}
            <div className={styles.gnbTop}>
              <div className={styles.gnbTopArea}>
                <ul className={styles.depth1Group}>
                  {!isLoggedIn && (
                    <>
                      <li className={styles.depth1List}>
                        <a href="javascript:void(0)" className={styles.depth1Name} onClick={() => navigate('/tickets/login')}>로그인</a>
                      </li>
                      <li className={styles.depth1List}>
                        <a href="javascript:void(0)" className={styles.depth1Name} onClick={() => navigate('/auth/joinTermsPage')}>회원가입</a>
                      </li>
                    </>
                  )}
                  {isLoggedIn && (
                    <>
                      <li className={styles.depth1List}>
                        회원님 반갑습니다
                      </li>
                      <li className={styles.depth1List}>
                        <a href="javascript:void(0)" className={styles.depth1Name} onClick={handleLogout}>로그아웃</a>
                      </li>
                    </>
                  )}
                  <li className={styles.depth1List}>
                    <a href="javascript:void(0)" className={styles.depth1Name} target="_blank" rel="noreferrer" title="새 창 열림">
                      공항철도 홈페이지
                    </a>
                  </li>
                  <li className={`${styles.depth1List} ${styles.depth1Btn}`}>
                    <button type="button" className={styles.depth1Name} onClick={() => setLangPopupOpen(true)}>
                      <span className={styles.global} />
                      <span className="blind">언어 및 화폐 변경</span>
                      <span>KOR - KRW</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* gnb 하단 */}
            <div className={styles.gnbCont}>
              {/* 메뉴 (메가메뉴) */}
              <div className={styles.menuArea}>
                <ul className={styles.depth1Group}>
                  {gnbMenuItems.map((item, index) => (
                    <li
                      className={styles.depth1List}
                      key={item.id}
                      onMouseEnter={() => setActiveDepth1(index)}
                      onFocus={() => setActiveDepth1(index)}
                    >
                      <a href="javascript:void(0)" className={styles.depth1Name}>{item.label}</a>
                      <div className={`${styles.depth2Area} ${activeDepth1 === index ? styles.on : ''}`.trim()}>
                        <div className={styles.depth2Box}>
                          <div className={styles.depth2Tit}>
                            <p className={styles.mainTit}>{item.mainTit}</p>
                            <p className={styles.subTit}>{item.subTit}</p>
                          </div>
                          <ul className={styles.depth2Group} role="menu">
                            {item.children.map((depth2) => (
                              <li className={styles.depth2List} key={depth2.label}>
                                <a href="javascript:void(0)" className={styles.depth2Name}>{depth2.label}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 메뉴 검색 (데스크톱) */}
              <div className={`${styles.srchArea} ${searchOpen ? styles.active : ''}`.trim()}>
                <div className={styles.srchBox}>
                  <div className={styles.srchCont} role="search">
                    <label htmlFor="gnbSrchBox" className="blind">메뉴 검색</label>
                    <input id="gnbSrchBox" className={styles.srchInput} placeholder="메뉴 검색" ref={searchInputRef} />
                    <button className={styles.srchBtn} type="button" aria-label="검색 실행">
                      <img src="/images/common/ic_26_srchBtn_b.svg" alt="" />
                    </button>
                  </div>

                  <ul className={styles.srchList}>
                    {searchSuggestions.map((text) => (
                      <li className={styles.item} key={text}>
                        <a href="javascript:void(0)">
                          <span className={styles.highlight}>일반</span>
                          {text}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.srchClose}>
                    <button type="button" className="srchCloseBtn" onClick={() => setSearchOpen(false)}>
                      <img src="/images/common/ic_44_close_b.svg" alt="" />
                      <span className="blind">메뉴 검색 닫기</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 검색/장바구니/개인정보 */}
              <div className={styles.quickArea}>
                <button className={styles.srchBtn} type="button" onClick={openSearch}>
                  <img src="/images/common/ic_26_srch.svg" alt="" />
                  <span className="blind">메뉴검색 열기</span>
                </button>
                <button className={`${styles.cartBtn} ${hasCartItems ? styles.on : ''}`.trim()} type="button">
                  <img src="/images/common/ic_26_cart.svg" alt="" />
                  <span className="blind">장바구니</span>
                </button>

                <Dropdown
                  variant="comMyDrop"
                  triggerClassName="infoBtn"
                  trigger={
                    <>
                      <img src="/images/common/ic_26_info.svg" alt="" />
                      <span className="blind">개인정보</span>
                    </>
                  }
                  items={memberMenuItems}
                />
              </div>

              {/* 사이트맵 (PC) / 전체메뉴 열기 버튼 (모바일) */}
              <div className={styles.sitemapArea}>
                <button
                  className={styles.openBtn}
                  aria-expanded={sitemapOpen}
                  type="button"
                  ref={sitemapOpenBtnRef}
                  onClick={() => setSitemapOpen(true)}
                >
                  <img src="/images/common/ic_26_hamburger.svg" alt="pc 전체메뉴 열기" />
                </button>
                <button
                  className={styles.moOpenBtn}
                  aria-expanded={mobileMenuOpen}
                  type="button"
                  ref={moOpenBtnRef}
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <img src="/images/common/ic_26_hamburger.svg" alt="모바일 전체메뉴 열기" />
                </button>

                <div className={`${styles.sitemap} ${sitemapOpen ? styles.active : ''}`.trim()}>
                  <div className={styles.sitemapInner}>
                    <div className={styles.sitemapCont}>
                      <div className={styles.sitemapHead}>
                        <p className={styles.tit}>전체메뉴</p>
                      </div>
                      <nav aria-label="사이트맵 전체 메뉴">
                        <div className={styles.depth1Wrap}>
                          <ul className={styles.depth1Group}>
                            {navItems.map((item) => (
                              <li key={item.id}>
                                <div className={styles.depth1Name}>{item.label}</div>
                                <ul className={styles.depth2Group} role="menu">
                                  {item.children.map((depth2) => (
                                    <li
                                      className={`${styles.depth2List} ${depth2.wide ? styles.depth2ListInfo : ''}`.trim()}
                                      key={depth2.label}
                                    >
                                      <a href="javascript:void(0)" className={styles.depth2Name}>{depth2.label}</a>
                                      {depth2.children && (
                                        <ul className={styles.depth3Group} role="menu">
                                          {depth2.children.map((depth3) => (
                                            <li className={styles.depth3List} key={depth3.label}>
                                              <a href="javascript:void(0)" className={styles.depth3Name}>{depth3.label}</a>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </nav>
                      <div className={styles.sitemapFoot}>
                        <button className={styles.closeBtn} type="button" onClick={closeSitemap}>
                          <span className="blind">전체메뉴 닫기</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 모바일 전체메뉴 (오프캔버스) */}
              <div className={`${styles.moMenuArea} ${mobileMenuOpen ? styles.active : ''}`.trim()}>
                <div className={styles.moMenuBox}>
                  <div className={styles.topBox}>
                    {!isLoggedIn && (
                      <button type="button" className={styles.logOutBtn} onClick={() => navigate('/tickets/login')}>로그인</button>
                    )}
                    {isLoggedIn && (
                      <button type="button" className={styles.logOutBtn} onClick={handleLogout}>로그아웃</button>
                    )}
                    <div className={styles.topArea}>
                      <button className="infoBtn" type="button">
                        <img src="/images/common/ic_32_info_w.svg" alt="" />
                        <span className="blind">개인정보</span>
                      </button>
                      <button className={`${styles.cartBtn} ${hasCartItems ? styles.on : ''}`.trim()} type="button">
                        <img src="/images/common/ic_32_cart_w.svg" alt="" />
                        <span className="blind">장바구니</span>
                      </button>
                      <button className="globalBtn" type="button" onClick={() => setLangPopupOpen(true)}>
                        <img src="/images/common/ic_32_global.svg" alt="" />
                        <span className="blind">언어 설정</span>
                      </button>
                      <button className="MoCloseBtn" type="button" onClick={closeMobileMenu}>
                        <img src="/images/common/ic_32_moClose.svg" alt="" />
                        <span className="blind">모바일메뉴 닫기</span>
                      </button>
                    </div>
                  </div>

                  <div className={styles.topMenu} role="menu">
                    <div className={styles.topMenuArea}>
                      <p className={styles.list}>
                        <a href="javascript:void(0)">
                          <img src="/images/common/ic_24_ticket_cir.svg" alt="" />승차권 예약
                        </a>
                      </p>
                      <p className={styles.list}>
                        <a href="javascript:void(0)">
                          <img src="/images/common/ic_24_myticket_cir.svg" alt="" />나의 승차권
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className={styles.midBox}>
                    <div className={styles.srchBox}>
                      <div className={styles.srchCont} role="search">
                        <label htmlFor="gnbSrchBox2" className="blind">메뉴를 검색해보세요.</label>
                        <input id="gnbSrchBox2" className={styles.srchInput} placeholder="메뉴를 검색해보세요." />
                        <button className={styles.srchBtn} type="button" aria-label="검색 실행">
                          <img src="/images/common/ic_26_srchBtn_b.svg" alt="" />
                        </button>
                      </div>
                    </div>

                    <div className={styles.naviBox} role="navigation">
                      <div className={styles.naviArea}>
                        {navItems.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            className={`${styles.naviItem} ${activeSection === item.id ? styles.active : ''}`.trim()}
                            aria-pressed={activeSection === item.id}
                            onClick={() => scrollToSection(item.id)}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={styles.moMenuBody} role="menu">
                    {navItems.map((item) => (
                      <section id={item.id} className={styles.section} key={item.id}>
                        <h2
                          className={styles.title}
                          ref={(el) => {
                            if (el) el.dataset.sectionId = item.id;
                            titleRefs.current[item.id] = el;
                          }}
                        >
                          {item.label}
                        </h2>
                        <ul className={styles.depth1Group}>
                          {item.children.map((depth2) => (
                            <li className={styles.depth1List} key={depth2.label}>
                              <a href="javascript:void(0)" className={styles.depth1Name}>{depth2.label}</a>
                              {depth2.children && (
                                <ul className={`${styles.depth2Group} ${depth2.wide ? styles.depth2GroupInfo : ''}`.trim()}>
                                  {depth2.children.map((depth3) => (
                                    <li className={styles.depth2List} key={depth3.label}>
                                      <a href="javascript:void(0)" className={styles.depth2Name}>{depth3.label}</a>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 언어 및 화폐 선택 팝업 (module/Popup 재사용) */}
      <Popup
        isOpen={langPopupOpen}
        onClose={() => setLangPopupOpen(false)}
        size="tini"
        title="언어 및 화폐 선택"
        footer={
          <>
            <Button variant="dkLine" size="lg" onClick={() => setLangPopupOpen(false)}>취소</Button>
            <Button variant="blue" size="lg" onClick={() => setLangPopupOpen(false)}>확인</Button>
          </>
        }
      >
        <div className="comLog">
          <div className="fnCont">
            <div className="fnGroup">
              <div className="labelBox">
                <label htmlFor="gnbLang">언어</label>
              </div>
              <div className="frmGroup">
                <Select
                  id="gnbLang"
                  name="lang"
                  className="lg"
                  placeholder="언어"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  options={[{ label: '한국어', value: 'ko' }]}
                />
              </div>
            </div>
            <div className="fnGroup">
              <div className="labelBox">
                <label htmlFor="gnbMoney">화폐</label>
              </div>
              <div className="frmGroup">
                <Select
                  id="gnbMoney"
                  name="money"
                  className="lg"
                  placeholder="KRW"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  options={[{ label: 'KRW', value: 'krw' }]}
                />
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Gnb;
