import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './TicketView.module.scss';

// ui components : comTicketView
// 원본 퍼블리싱 파일: docs/html-src/html/common/comTicketView.html
//
// scss의 ticketWrap은 'pcs'(1279px) 분기를 기준으로 데스크탑=세로 목록(flex-flow:column),
// 모바일=swiper 가로 슬라이드(flex-flow:unset, swiper.css의 row 레이아웃)로 완전히 다른 레이아웃을 쓴다.
// swiper.css가 주는 flex-direction:row는 모듈 scss 클래스보다 우선순위가 높아 CSS만으로는
// 데스크탑에서 되돌릴 수 없으므로, 모바일 너비일 때만 실제로 Swiper를 마운트한다(=모바일 전용 동작).
const MOBILE_QUERY = '(max-width: 1279px)';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const handleChange = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
}

/**
 * 승차권 상세 컴포넌트
 *
 * 모바일(1279px 이하)에서는 swiper로 한 장씩 넘겨보고, 그 외 너비에서는 세로로 나열된 목록으로 보여준다.
 *
 * @param {Array} tickets - 승차권 목록.
 *   [{ id, departDate, title, titleEng, logo,
 *      moDate, moTrainNo,
 *      departStation, departStationEng, departTime,
 *      arriveStation, arriveStationEng, arriveTime,
 *      qrImage, printed, qrNum,
 *      car, seat, category, direction, trainNo,
 *      footNotice, footNoticeEng }]
 */
function TicketView({ tickets = [] }) {
  const isMobile = useIsMobile();
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // scss의 .arrBox/.swiper-pagination 스타일은 .ticBox .ticPage 아래로 중첩되어 있어,
  // 페이지네이션 영역을 슬라이드 밖으로 빼면 스타일이 전혀 매칭되지 않는다. 그래서 원본 마크업처럼
  // 슬라이드(ticPage)마다 그려주고, 모든 버튼이 같은 swiperRef를 조작하게 해서 한 벌처럼 동작시킨다.
  const renderTicketContent = (ticket, index) => (
    <>
      <p className={styles.pageCnt}>
        <span className="current">{index + 1}</span>/
        <span className="total">{tickets.length}</span>
      </p>
      <div className={styles.ticPage}>
        <div className={styles.ticHead}>
          <p className={styles.dateInfo}>
            출발일 (Date of Departure)
            <span>{ticket.departDate}</span>
          </p>
          <p className={styles.title}>
            {ticket.title}<br />
            <span>{ticket.titleEng}</span>
          </p>
          <p className={styles.logo}>
            <img src={ticket.logo} alt="" />
          </p>
        </div>
        <div className={styles.ticBody}>
          <div className={styles.infoTop}>
            <div className={styles.trainInfo}>
              <div className={styles.moInfo}>
                <span>{ticket.moDate}</span>
                <span>{ticket.moTrainNo}</span>
              </div>
              <div className={styles.depart}>
                <span className={styles.forMo}>
                  <span className={styles.stn}>{ticket.departStation}</span>
                  <span className={styles.stnEng}>{ticket.departStationEng}</span>
                </span>
                <span className={styles.time}>{ticket.departTime}</span>
              </div>
              <div className={styles.arrow}><span className="blind">화살표</span></div>
              <div className={styles.destination}>
                <span className={styles.forMo}>
                  <span className={styles.stn}>{ticket.arriveStation}</span>
                  <span className={styles.stnEng}>{ticket.arriveStationEng}</span>
                </span>
                <span className={styles.time}>{ticket.arriveTime}</span>
              </div>
            </div>
            <div className={styles.qrBox}>
              <div className={styles.qrArea}>
                <img src={ticket.qrImage} alt="" />
                {ticket.printed && (
                  <div className={styles.printed}><span>인쇄완료</span></div>
                )}
              </div>
              <span className={styles.qrNum}>{ticket.qrNum}</span>
            </div>
          </div>
          <div className={styles.infoBot}>
            <p className={styles.carNSeat}>
              <span className={styles.hglt}>{ticket.car}</span>
              <span className={`${styles.space} ${styles.slash}`}>(Car)</span>
              <span className={styles.hglt}>{ticket.seat}</span>
              <span className={styles.space}>(Seats)</span>
            </p>
            <p className={styles.cate}>
              <span className={styles.ctSlash}>{ticket.category}</span>
              <span>{ticket.direction}</span>
            </p>
            <p className={styles.train}>
              <span>열차번호(Train No.)</span>
              <span className={styles.carNum}>{ticket.trainNo}</span>
            </p>
          </div>
        </div>

        {isMobile && (
          <div className="ticPagination">
            <div className={styles.arrBox}>
              <a
                href="#"
                className={`btnArrow ${styles.prev}`}
                onClick={(e) => { e.preventDefault(); swiperRef.current?.slidePrev(); }}
              >
                <span className="blind">이전슬라이드</span>
              </a>
              <div className="swiper-pagination">
                <span className="swiper-pagination-current">{activeIndex + 1}</span>/
                <span className="swiper-pagination-total">{tickets.length}</span>
              </div>
              <a
                href="#"
                className={`btnArrow ${styles.next}`}
                onClick={(e) => { e.preventDefault(); swiperRef.current?.slideNext(); }}
              >
                <span className="blind">다음슬라이드</span>
              </a>
            </div>
          </div>
        )}

        <div className={styles.ticFoot}>
          <p className="text">
            {ticket.footNotice}
            <span className={styles.eng}>{ticket.footNoticeEng}</span>
          </p>
        </div>
      </div>
    </>
  );

  if (!isMobile) {
    return (
      <div className={styles.comTicketView}>
        <div className={styles.ticketCov}>
          <div className={styles.ticketWrap}>
            {tickets.map((ticket, index) => (
              <div className={styles.ticBox} key={ticket.id}>
                {renderTicketContent(ticket, index)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.comTicketView}>
      <Swiper
        className={styles.ticketCov}
        wrapperClass={styles.ticketWrap}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {tickets.map((ticket, index) => (
          <SwiperSlide className={styles.ticBox} key={ticket.id}>
            {renderTicketContent(ticket, index)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TicketView;
