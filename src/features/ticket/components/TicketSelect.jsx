import Button from '@/components/common/forms/Button';
import styles from './TicketSelect.module.scss';

//ui components : comTicketSelect

// html 원본(comTicketSelect.html)의 샘플 데이터를 그대로 기본값으로 사용한다.
export const defaultTrains = [
  {
    id: 'A1026-0523',
    trainNo: 'A1026',
    departure: { time: '05:23', name: '인천공항 1터미널' },
    arrival: { time: '06:07', name: '서울역' },
    duration: '43분',
    soldOut: false,
    almostSoldOut: true,
  },
  {
    id: 'A1026-0558',
    trainNo: 'A1026',
    departure: { time: '05:58', name: '인천공항 1터미널' },
    arrival: { time: '06:41', name: '서울역' },
    duration: '43분',
    soldOut: true,
  },
  {
    id: 'A1026-0638',
    trainNo: 'A1026',
    departure: { time: '06:38', name: '인천공항 1터미널' },
    arrival: { time: '07:21', name: '서울역' },
    duration: '43분',
    soldOut: true,
  },
  {
    id: 'A1026-0713',
    trainNo: 'A1026',
    departure: { time: '07:13', name: '인천공항 1터미널' },
    arrival: { time: '07:57', name: '서울역' },
    duration: '43분',
    soldOut: false,
  },
];

function TicketSelect({ trains = defaultTrains, onReserve }) {
  return (
    <div className={styles.comTicketSelect}>
      <ul className={styles.ticketGroup}>
        {trains.map((train) => (
          <li key={train.id} className={styles.ticketItem}>
            <div className={styles.num}>
              <span>열차번호</span>
              <em>{train.trainNo}</em>
            </div>

            <div className={styles.stationInfo}>
              <div className={styles.station}>
                <span className={styles.time}>{train.departure.time}</span>
                <span className={styles.name}>{train.departure.name}</span>
              </div>
              <div className={styles.allTime}>{train.duration}</div>
              <div className={styles.station}>
                <span className={styles.time}>{train.arrival.time}</span>
                <span className={styles.name}>{train.arrival.name}</span>
              </div>
            </div>

            {/* 모바일에서만 보이는 출발-도착역 한 줄 요약 (PC에서는 stationInfo로 충분해서 숨김) */}
            <div className={styles.stationM}>
              <span className={styles.name}>{train.departure.name} - {train.arrival.name}</span>
            </div>

            <Button variant="dkBlue" disabled={train.soldOut} onClick={() => onReserve?.(train)}>
              {train.soldOut ? (
                '매진'
              ) : (
                <>
                  예약
                  {train.almostSoldOut && <span className={styles.inMsg}>매진임박</span>}
                </>
              )}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketSelect;
