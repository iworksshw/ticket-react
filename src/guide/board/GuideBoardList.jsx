import { useState } from 'react';
import GroupTop from '@/features/board/components/GroupTop';
import BoardList from '@/features/board/components/BoardList';
import Pagination from '@/components/common/navigation/Pagination';

// BoardList는 컬럼을 하드코딩하지 않고 이 설정 배열을 받아서 표를 그린다.
// 게시판마다 보여줄 컬럼이 다르면 이 배열만 바꿔서 재사용할 수 있다.
// key는 sampleItems의 필드명과 매칭되고, width는 <col style={{width}}>에 그대로 사용됨.
const noticeColumns = [
  { label: '번호', width: '9%', key: 'bdType' },
  { label: '제목', width: '', key: 'bdTitle' }, // 너비 미지정 시 auto
  { label: '작성자', width: '15%', key: 'author' },
  { label: '등록일', width: '12%', key: 'date' },
  { label: '조회수', width: '10%', key: 'view' },
];

// 페이지네이션 동작을 확인하기 위한 가짜 데이터 400건.
// Array.from으로 400개를 만들고, 번호(no)는 400부터 1까지 내려가도록 채운다
// (최신 글이 위로 오는 일반적인 게시판 정렬을 흉내냄).
const sampleItems = Array.from({ length: 400 }, (_, index) => {
  const no = 400 - index;
  return {
    bdType: no,
    bdTitle: `샘플 게시글 제목 ${no}`,
    author: '관리자',
    date: '25.09.02',
    view: 12334,
    // 게시판 데이터에는 보통 상세 페이지로 이동할 링크(또는 게시글 id)가 함께 내려온다.
    // BoardList는 이 값을 item.href로 받아 실제 <a href>에 사용한다.
    href: `/board/${no}`,
  };
});

// 한 페이지에 보여줄 게시글 수. totalPages, 페이지별 슬라이싱 계산에 공통으로 사용.
const ITEMS_PER_PAGE = 10;

function GuideBoardList() {
  // GroupTop은 검색 분류/검색어를 직접 들고 있지 않는 controlled 컴포넌트라서
  // 이 화면(부모)에서 값을 state로 관리하고 props로 내려준다.
  const [searchType, setSearchType] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  // 현재 보고 있는 페이지 번호. Pagination에서 번호를 클릭하면 onPageChange로
  // 이 state가 바뀌고, 그에 따라 아래 pagedItems가 다시 계산된다.
  const [currentPage, setCurrentPage] = useState(1);

  // 전체 페이지 수 = 전체 게시글 수 / 페이지당 개수 (올림 처리).
  // 예: 400건 / 10개 = 40페이지
  const totalPages = Math.ceil(sampleItems.length / ITEMS_PER_PAGE);

  // 실제 서비스에서는 여기서 API 호출 등을 수행한다. 가이드 페이지라 콘솔 출력만 함.
  const handleSearch = (type, keyword) => {
    console.log('search', type, keyword);
  };

  const handleItemClick = (item) => {
    console.log('item click', item);
  };

  // currentPage에 맞는 10건만 잘라낸다.
  // 예: currentPage=3 이면 (3-1)*10=20번째부터 30번째 앞까지 → 21~30번째 항목.
  const pagedItems = sampleItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  // BoardList는 각 행의 클릭 핸들러를 item.onClick으로 기대하므로,
  // 화면에 보여줄 페이지 분량(pagedItems)에만 onClick을 붙여서 items를 만든다.
  const items = pagedItems.map((item) => ({ ...item, onClick: handleItemClick }));

  return (
    <div>
      <h3>Board List Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/board/components/GroupTop.jsx, src/features/board/components/BoardList.jsx, src/components/common/navigation/Pagination.jsx</p>

      {/* 검색 영역 + 전체 건수 표시 (total은 페이지가 아닌 전체 게시글 수) */}
      <GroupTop
        total={sampleItems.length}
        searchType={searchType}
        searchKeyword={searchKeyword}
        onSearchTypeChange={setSearchType}
        onSearchKeywordChange={setSearchKeyword}
        onSearch={handleSearch}
      />

      {/* 현재 페이지의 10건만 표로 렌더링 */}
      <BoardList columns={noticeColumns} items={items} />

      {/* currentPage/totalPages를 기준으로 페이지 번호를 그리고,
          번호 클릭 시 onPageChange(setCurrentPage)로 currentPage를 갱신 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default GuideBoardList;
