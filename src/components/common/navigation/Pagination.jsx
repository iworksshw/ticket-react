import React from 'react';
import styles from './Pagination.module.scss';

//ui components : comPaging
/**
 * 공통 페이지네이션 컴포넌트
 * @param {number} currentPage - 현재 페이지 번호
 * @param {number} totalPages - 전체 페이지 수
 * @param {function} onPageChange - 페이지 이동 시 호출되는 콜백 (이동할 페이지 번호 전달)
 * @param {number} pcPageRange - PC에서 노출할 페이지 번호 개수
 * @param {number} moPageRange - 모바일에서 노출할 페이지 번호 개수
 * @param {function} getPageHref - 페이지 번호를 받아 실제 이동 주소(href)를 반환하는 함수 (접근성용)
 * @param {string} className - 추가적인 커스텀 클래스
 */
const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  pcPageRange = 10,
  moPageRange = 5,
  getPageHref = () => '#',
  className = "",
}) => {
  // 현재 페이지를 중심으로 화면에 보여줄 페이지 번호 목록을 계산한다.
  // 예: currentPage=5, rangeSize=10 이면 1~10 범위를 보여주고,
  //     currentPage=25, rangeSize=10 이면 21~30처럼 currentPage가 가운데쯔음 오도록 슬라이딩한다.
  const getPageRange = (rangeSize) => {
    const half = Math.floor(rangeSize / 2); // 범위의 절반 (currentPage 기준 좌측에 둘 개수)
    let start = Math.max(1, currentPage - half); // 1보다 작아지지 않게 시작점 보정
    let end = start + rangeSize - 1;

    // 끝 번호가 전체 페이지 수를 넘으면, 끝을 totalPages로 고정하고
    // 시작점을 다시 계산해서 항상 rangeSize개를 보여주도록 한다(마지막 페이지 근처일 때).
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - rangeSize + 1);
    }

    const pages = [];
    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }
    return pages; // 예: [21, 22, 23, ..., 30]
  };

  // 첫/이전/숫자/다음/마지막 클릭 시 실행. 범위를 벗어나면 이동을 막고,
  // 정상 범위면 기본 이동(새로고침)을 막은 뒤 onPageChange로 위임한다.
  const handlePageClick = (event, page) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      event.preventDefault();
      return;
    }
    if (onPageChange) {
      event.preventDefault();
      onPageChange(page);
    }
  };

  // PC용/모바일용 페이지네이션을 그리는 공통 함수.
  // rangeSize: 한 번에 보여줄 페이지 번호 개수 (PC=10, 모바일=5 기본값)
  // viewClass: 'forPc' | 'forMo' - CSS 미디어쿼리로 PC/모바일에서 하나만 보이도록 처리됨
  const renderPaging = (rangeSize, viewClass) => (
    <div className={`${styles.comPaging} ${styles[viewClass]} ${className}`.trim()}>
      {/* 첫 페이지로 이동 - href는 접근성을 위해 실제 이동 주소를 받는다 */}
      <a className={styles.start} href={getPageHref(1)} onClick={(event) => handlePageClick(event, 1)}>첫페이지로 이동</a>
      {/* 이전 페이지로 이동 (현재 페이지 - 1) */}
      <a className={styles.prev} href={getPageHref(currentPage - 1)} onClick={(event) => handlePageClick(event, currentPage - 1)}>이전 페이지로 이동</a>

      {/* 페이지 번호 목록 - getPageRange로 계산된 번호만큼 <li>를 생성 */}
      <ul className={styles.numList}>
        {getPageRange(rangeSize).map((page) => (
          // 현재 페이지와 같은 번호에만 'on' 클래스를 붙여 활성 표시
          <li key={page} className={page === currentPage ? styles.on : ''}>
            <a href={getPageHref(page)} onClick={(event) => handlePageClick(event, page)}>{page}</a>
          </li>
        ))}
      </ul>

      {/* 다음 페이지로 이동 (현재 페이지 + 1) */}
      <a className={styles.next} href={getPageHref(currentPage + 1)} onClick={(event) => handlePageClick(event, currentPage + 1)}>다음 페이지로 이동</a>
      {/* 마지막 페이지로 이동 */}
      <a className={styles.end} href={getPageHref(totalPages)} onClick={(event) => handlePageClick(event, totalPages)}>마지막 페이지로 이동</a>
    </div>
  );

  // 같은 데이터로 PC 버전(forPc)과 모바일 버전(forMo)을 둘 다 렌더링한다.
  // 화면에는 항상 두 블록이 같이 출력되지만, scss(@include media)에서
  // 화면 너비에 따라 하나만 display:block, 나머지는 display:none 처리되어
  // 실제로는 한 가지 버전만 보이게 된다.
  return (
    <>
      {renderPaging(pcPageRange, 'forPc')}
      {renderPaging(moPageRange, 'forMo')}
    </>
  );
};

export default Pagination;
