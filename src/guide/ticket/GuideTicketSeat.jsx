import { useState } from 'react';
import TicketSeat from '@/features/ticket/components/TicketSeat';

// 가이드 : TicketSeat
// 원본 퍼블리싱 파일: docs/html-src/html/common/comSeat.html

// 좌석 배치도 데이터(re=역방향, fo=순방향). 체크 상태는 가이드에서 selected로 별도 관리한다.
const seatLayout = [
  {
    seats: [
      { id: 'unselRe1', direction: 're', unselectable: true },
      { id: '1Dre', label: '1D', direction: 're' },
      { id: '2Dre', label: '2D', direction: 're', disabled: true },
      { id: '3Dre', label: '3D', direction: 're', disabled: true },
      { id: '4Dre', label: '4D', direction: 're' },
      { id: '5Dre', label: '5D', direction: 're' },
      { id: '6Dre', label: '6D', direction: 're' },
      { id: '7Dre', label: '7D', direction: 're' },
      { id: '8D', label: '8D', direction: 'fo' },
      { id: '9D', label: '9D', direction: 'fo' },
      { id: '10D', label: '10D', direction: 'fo' },
      { id: '11D', label: '11D', direction: 'fo' },
      { id: '12D', label: '12D', direction: 'fo' },
      { id: '13D', label: '13D', direction: 'fo' },
      { id: 'emptyD', empty: true },
    ],
  },
  {
    aisleAfter: true,
    seats: [
      { id: 'emptyC1', empty: true },
      { id: '1Cre', label: '1C', direction: 're' },
      { id: '2Cre', label: '2C', direction: 're' },
      { id: '3Cre', label: '3C', direction: 're' },
      { id: '4Cre', label: '4C', direction: 're' },
      { id: '5Cre', label: '5C', direction: 're' },
      { id: '6Cre', label: '6C', direction: 're' },
      { id: '7Cre', label: '7C', direction: 're' },
      { id: '8C', label: '8C', direction: 'fo' },
      { id: '9C', label: '9C', direction: 'fo' },
      { id: '10C', label: '10C', direction: 'fo' },
      { id: '11C', label: '11C', direction: 'fo' },
      { id: '12C', label: '12C', direction: 'fo' },
      { id: '13C', label: '13C', direction: 'fo' },
      { id: 'emptyC2', empty: true },
    ],
  },
  {
    seats: [
      { id: 'emptyB1', empty: true },
      { id: '1Bre', label: '1B', direction: 're' },
      { id: '2Bre', label: '2B', direction: 're' },
      { id: '3Bre', label: '3B', direction: 're' },
      { id: '4Bre', label: '4B', direction: 're' },
      { id: '5Bre', label: '5B', direction: 're' },
      { id: '6Bre', label: '6B', direction: 're' },
      { id: '7Bre', label: '7B', direction: 're' },
      { id: '8B', label: '8B', direction: 'fo' },
      { id: '9B', label: '9B', direction: 'fo' },
      { id: '10B', label: '10B', direction: 'fo' },
      { id: '11B', label: '11B', direction: 'fo' },
      { id: '12B', label: '12B', direction: 'fo' },
      { id: '13B', label: '13B', direction: 'fo' },
      { id: 'emptyB2', empty: true },
    ],
  },
  {
    seats: [
      { id: 'emptyA1', empty: true },
      { id: '1Are', label: '1A', direction: 're' },
      { id: '2Are', label: '2A', direction: 're' },
      { id: '3Are', label: '3A', direction: 're' },
      { id: '4Are', label: '4A', direction: 're' },
      { id: '5Are', label: '5A', direction: 're' },
      { id: '6Are', label: '6A', direction: 're' },
      { id: '7Are', label: '7A', direction: 're' },
      { id: '8A', label: '8A', direction: 'fo' },
      { id: '9A', label: '9A', direction: 'fo' },
      { id: '10A', label: '10A', direction: 'fo' },
      { id: '11A', label: '11A', direction: 'fo' },
      { id: '12A', label: '12A', direction: 'fo' },
      { id: '13A', label: '13A', direction: 'fo' },
      { id: 'unselFo1', direction: 'fo', unselectable: true },
    ],
  },
];

const SELECTABLE_SEATS = seatLayout
  .flatMap((row) => row.seats)
  .filter((seat) => !seat.empty && !seat.unselectable && !seat.disabled);

/**
 * TicketSeat 사용 가이드
 *
 * - variant='map': rows에 좌석 배치 데이터를 넣고, onToggleSeat로 좌석 체크 상태를 직접 관리한다.
 * - variant='summary': map에서 선택한 좌석 개수/라벨을 그대로 보여준다.
 */
function GuideTicketSeat() {
  const [selected, setSelected] = useState({ '5Are': '5A', '6Bre': '6B' });

  const toggleSeat = (id) => {
    setSelected((prev) => {
      if (!prev[id]) {
        const seat = SELECTABLE_SEATS.find((s) => s.id === id);
        return { ...prev, [id]: seat?.label };
      }
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const rows = seatLayout.map((row) => ({
    ...row,
    seats: row.seats.map((seat) =>
      seat.empty || seat.unselectable ? seat : { ...seat, checked: Boolean(selected[seat.id]) }
    ),
  }));

  return (
    <div style={{ padding: '32px' }}>
      <h3>TicketSeat Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/ticket/components/TicketSeat.jsx</p>
      <p style={{ margin: '8px 0 24px', color: '#666' }}>좌석변경 배치도 + 선택좌석 요약 바</p>

      <TicketSeat variant="map" rows={rows} onToggleSeat={toggleSeat} />

      <div style={{ marginTop: '24px' }}>
        <TicketSeat
          variant="summary"
          checkedCount={Object.keys(selected).length}
          totalCount={SELECTABLE_SEATS.length}
          checkedSeats={Object.values(selected)}
        />
      </div>
    </div>
  );
}

export default GuideTicketSeat;
