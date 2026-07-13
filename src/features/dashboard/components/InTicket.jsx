import TicketInfo from '@/features/ticket/components/TicketInfo';

//UI Components : boardingArea (탑승예정 승차권)
/**
 * 탑승예정 승차권 영역 (마이페이지 대시보드)
 * 스와이퍼는 추후 적용 예정이라 지금은 승차권 1건만 정적으로 보여준다.
 * @param {object} styles - 상위 DashBoard.module.scss에서 내려받는 스타일 객체
 * @param {object} ticket - { date, trainNo, stations, headCount } 탑승예정 승차권 정보
 * @param {number} current - 페이지네이션 현재 번호
 * @param {number} total - 페이지네이션 전체 개수
 * @param {Array} links - [{ type:'vaild'|'change'|'check', label, href, onClick }] 하단 링크 목록
 */
function InTicket({
  styles,
  ticket = {},
  current = 1,
  total = 1,
  links = [
    { type: 'vaild', label: '유효승차권', href: '#' },
    { type: 'change', label: '승차권 변경/반환', href: '#' },
    { type: 'check', label: '이용내역·영수증조회', href: '#' },
  ],
}) {
  return (
    <div className={styles.boardingArea}>
      <p className={`${styles.tit} ${styles.ticketTit}`}>나의 승차권정보</p>
      <p className={styles.expectTicket}>탑승예정 승차권</p>
      <div className={styles.mypageSlide}>
        <TicketInfo
          variant="view"
          date={ticket.date}
          trainNo={ticket.trainNo}
          stations={ticket.stations}
          infoItems={[[{ tit: '탑승인원', desc: ticket.headCount }]]}
        />
        <div className={styles.arrowBox}>
          <button type="button" className={`${styles.btnArrow} ${styles.prev}`}>
            <span className="blind">이전 승차권</span>
          </button>
          <button type="button" className={`${styles.btnArrow} ${styles.next}`}>
            <span className="blind">다음 승차권</span>
          </button>
        </div>
        <div className={styles['swiper-pagination']}>
          <span className={styles['swiper-pagination-current']}>{current}</span> /{' '}
          <span className={styles['swiper-pagination-total']}>{total}</span>
        </div>
      </div>
      <div className={styles.ticketList}>
        {links.map((link) => (
          <p key={link.label} className={styles[link.type]}>
            <a href={link.href || '#'} onClick={link.onClick}>{link.label}</a>
          </p>
        ))}
      </div>
    </div>
  );
}

export default InTicket;
