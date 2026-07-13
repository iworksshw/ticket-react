// 사이트 전체 내비게이션 트리 (Gnb 메가메뉴/사이트맵/모바일메뉴, SubTop 브레드크럼이 이 데이터 하나를 공유한다)
// - path : 실제 라우트가 연결된 항목에만 지정한다. 아직 페이지가 없는 항목은 path를 넣지 않는다.
// - altPaths : 같은 메뉴(브레드크럼)를 공유하지만 별도 메뉴 항목으로 노출되지는 않는 부가 페이지 경로들
//   (예: 승차권 예약 안의 회원/비회원 선택 페이지)
// - mainTit/subTit : 데스크톱 메가메뉴(depth2Area)에만 사용
// - children(depth2)의 children(depth3) : 사이트맵 · 모바일메뉴 · SubTop 브레드크럼에서만 펼쳐짐 (메가메뉴는 depth2까지만 노출)
// - wide : "역 정보"처럼 depth3 항목이 많아 2단 컬럼 레이아웃이 필요한 depth2 항목 표시
// - sitemapOnly : 데스크톱 상단 메가메뉴에는 없고, 사이트맵 · 모바일메뉴에만 존재하는 항목(마이페이지)
export const navItems = [
  {
    id: 'tickets',
    label: '승차권',
    mainTit: '승차권',
    subTit: '승차권을 예매하고 편리하게 이용하세요.',
    children: [
      { label: '승차권 예약', path: '/tickets/ticketSearch', altPaths: ['/tickets/ticketAuth', '/tickets/trainSelection'] },
      { label: '승차권 확인', children: [{ label: '유효승차권' }, { label: '제휴서비스' }] },
      { label: '승차권 변경/반환', children: [{ label: '승차권 반환' }, { label: '승차권 변경' }] },
      { label: '이용내역/영수증조회', children: [{ label: '구매이력' }, { label: '상품구매내역' }] },
    ],
  },
  {
    id: 'express',
    label: '직통열차',
    mainTit: '직통열차',
    subTit: '도심과 공항을 가장 빠르고 쾌적하게 이용해 보세요.',
    children: [
      { label: '직통열차 소개' },
      { label: '직통열차 시각표', children: [{ label: '직통열차 시각표(평일)' }, { label: '직통열차 시각표(휴일)' }] },
      { label: '직통열차 운임안내' },
      {
        label: '직통열차 이용안내',
        children: [
          { label: '승차권 구입안내' },
          { label: '온라인 승차권 구입' },
          { label: '발매기 승차권 구입' },
          { label: '역 이동 동선안내' },
          { label: '승차권확인/열차탑승' },
          { label: '승차권 재발행' },
          { label: '승차권·상품 변경' },
          { label: '승차권 반환' },
          { label: '상품 결제취소' },
          { label: '상품 반품' },
          { label: '영수증 발행' },
        ],
      },
      {
        label: '도심공항터미널',
        children: [{ label: '도심공항터미널 이용안내' }, { label: '도심공항터미널 이용절차' }, { label: '항공보안 자율신고제도' }],
      },
      { label: '제휴호텔' },
      { label: '제휴카드' },
    ],
  },
  {
    id: 'regular',
    label: '일반열차',
    mainTit: '일반열차',
    subTit: '수도권 어디서나 인천공항까지 편하게 이용해 보세요.',
    children: [
      { label: '일반열차 소개' },
      { label: '일반열차 운임안내' },
      { label: '일반열차 승차권구입 안내' },
      {
        label: '역 정보',
        wide: true,
        children: [
          { label: '서울역' }, { label: '공덕' }, { label: '홍대입구' }, { label: '디지털미디어시티' },
          { label: '마곡나루' }, { label: '김포공항' }, { label: '계양' }, { label: '검암' },
          { label: '청라국제도시' }, { label: '영종' }, { label: '운서' }, { label: '공항화물청사' },
          { label: '인천공항1터미널' }, { label: '인천공항2터미널' },
        ],
      },
      {
        label: '역 편의시설',
        wide: true,
        children: [{ label: '편의시설 설치현황' }, { label: '배려시설 현황' }, { label: '전동휠체어 승차위치' }],
      },
      { label: '역 구내매장' },
      { label: '실시간 열차정보' },
      { label: '구글 스트리트뷰' },
    ],
  },
  {
    id: 'service',
    label: '고객서비스',
    mainTit: '고객서비스',
    subTit: '고객을 위한 모든 서비스, 지금 바로 이용하세요.',
    children: [
      { label: '체험학습', children: [{ label: '이용안내' }, { label: '프로그램' }, { label: '예약하기' }] },
      { label: '회의실', children: [{ label: '이용안내' }, { label: '위치확인' }, { label: '예약하기' }] },
      { label: '자전거 휴대승차', children: [{ label: '이용안내' }, { label: '예약하기' }] },
      { label: '유실물센터' },
      { label: '간편지연증명서' },
      { label: '행사신청' },
      { label: '광고문의' },
      { label: 'SCAT Reward 프로그램' },
      { label: '마케팅 제휴신청' },
      {
        label: '소비자중심경영',
        children: [{ label: '고객 서비스 헌장' }, { label: 'CCM 개요' }, { label: 'CCM 인증현황' }, { label: 'CCM 주요활동' }],
      },
    ],
  },
  {
    id: 'center',
    label: '고객센터',
    mainTit: '고객센터',
    subTit: '더 나은 서비스를 위해 고객님의 목소리에 귀 기울입니다.',
    children: [
      { label: '공지사항' },
      { label: '냉난방간편접수' },
      { label: '고객의 소리' },
      { label: 'VOC' },
      { label: '자주하는 질문(FAQ)' },
    ],
  },
  {
    id: 'mypage',
    label: '마이페이지',
    sitemapOnly: true,
    children: [
      { label: '나의 AREX' },
      { label: '체험학습 예약내역' },
      { label: '회의실 예약내역' },
      { label: '자전거 휴대승차 예약내역' },
      { label: '나의 쿠폰함' },
      { label: '장바구니' },
      { label: '회원정보' },
    ],
  },
];

/**
 * 현재 경로(pathname)를 기준으로 navItems 트리에서 활성화된 뎁스 체인을 찾는다.
 * depth1 -> depth2 -> depth3 순으로 path가 일치하는 노드를 찾고, 일치한 뎁스까지만 반환한다.
 * (하위메뉴가 없거나 아직 path가 없는 경우 그 뎁스에서 끊긴다)
 * @param {string} pathname - 현재 위치 (예: '/tickets')
 * @param {Array} items - 탐색할 트리, 기본값 navItems
 * @returns {Array<{ label: string, items: Array<{ label: string, href: string }> }>}
 *   SubTop의 crumbs prop 형태로 바로 사용 가능
 */
export function getBreadcrumbCrumbs(pathname, items = navItems) {
  for (const depth1 of items) {
    if (matchesPath(depth1, pathname)) {
      return [toCrumb(depth1, items)];
    }
    for (const depth2 of depth1.children ?? []) {
      if (matchesPath(depth2, pathname)) {
        return [toCrumb(depth1, items), toCrumb(depth2, depth1.children)];
      }
      for (const depth3 of depth2.children ?? []) {
        if (matchesPath(depth3, pathname)) {
          return [toCrumb(depth1, items), toCrumb(depth2, depth1.children), toCrumb(depth3, depth2.children)];
        }
      }
    }
  }
  return [];
}

function matchesPath(node, pathname) {
  return node.path === pathname || (node.altPaths ?? []).includes(pathname);
}

function toCrumb(node, siblings) {
  return {
    label: node.label,
    items: siblings.map((sibling) => ({ label: sibling.label, href: sibling.path ?? 'javascript:void(0)' })),
  };
}
