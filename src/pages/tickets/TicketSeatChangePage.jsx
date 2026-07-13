import { useCallback, useMemo, useState } from 'react';
import Popup from '@/components/module/Popup';
import Tab from '@/components/module/Tab';
import Button from '@/components/common/forms/Button';
import TicketSeat from '@/features/ticket/components/TicketSeat';
import { CAR_AVAILABLE_COUNTS, buildCarRows, parseSeatId } from '@/features/ticket/seatMap';
import { SEAT_FARE, ADULT_DISCOUNT_AMOUNT } from '@/features/ticket/discountRules';

/**
 * 좌석변경 팝업 (trainSelection 페이지의 "좌석변경" 버튼에서 연다)
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {Array<{ seatId: string }>} tickets - 현재 예약되어 있는 좌석(승차권) 목록. 팝업을 열 때
 *   이 좌석들이 선택된 상태로 보인다.
 * @param {function} onConfirm - 확인 버튼 클릭 시 (newTickets)를 인자로 호출. newTickets는 tickets와
 *   같은 형태(seatId 포함)이며, 기존에 있던 좌석은 discountLabel/discountAmount 등 기존 데이터를 유지한다.
 */
function TicketSeatChangePage({ isOpen, onClose, tickets, onConfirm }) {
  const totalSeats = tickets.length;
  const [selectedIds, setSelectedIds] = useState(() => new Set(tickets.map((t) => t.seatId)));
  // 팝업이 새로 열릴 때(닫힘->열림)마다 현재 예약된 좌석으로 선택상태를 다시 맞춘다
  // (취소 후 재오픈 대비). 렌더링 중 상태를 맞추는 React 공식 패턴이라 useEffect를 쓰지 않는다.
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setSelectedIds(new Set(tickets.map((t) => t.seatId)));
    }
  }

  // 알럿(부수효과)은 setState 업데이터 함수 밖에서 처리한다. 현재 화면에 보이는
  // selectedIds를 기준으로 판단하므로 "이미 선택된 좌석 해제"와 "새 좌석 선택"이 섞이지 않는다.
  const toggleSeat = useCallback(
    (id) => {
      if (selectedIds.has(id)) {
        setSelectedIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        return;
      }
      if (selectedIds.size >= totalSeats) {
        alert(`최대 예약수는 ${totalSeats}입니다`);
        return;
      }
      setSelectedIds((prev) => new Set(prev).add(id));
    },
    [selectedIds, totalSeats]
  );

  const carTabs = useMemo(
    () =>
      Object.keys(CAR_AVAILABLE_COUNTS).map((carNoStr) => {
        const carNo = Number(carNoStr);
        const rows = buildCarRows(carNo, selectedIds);
        return {
          label: `${carNo}호차`,
          num: CAR_AVAILABLE_COUNTS[carNo],
          content: <TicketSeat variant="map" rows={rows} onToggleSeat={toggleSeat} />,
        };
      }),
    [selectedIds, toggleSeat]
  );

  const checkedSeats = Array.from(selectedIds).map((id) => parseSeatId(id)?.label ?? id);

  const handleConfirm = () => {
    const newTickets = Array.from(selectedIds).map((seatId) => {
      const existing = tickets.find((t) => t.seatId === seatId);
      return (
        existing ?? {
          seatId,
          oldPrice: SEAT_FARE,
          passengerType: 'adult',
          discountLabel: null,
          discountAmount: ADULT_DISCOUNT_AMOUNT,
        }
      );
    });
    onConfirm(newTickets);
    onClose();
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title="좌석변경"
      footer={
        <>
          <Button variant="dkLine" size="lg" onClick={onClose}>취소</Button>
          <Button variant="blue" size="lg" onClick={handleConfirm}>확인</Button>
        </>
      }
    >
      <Tab tabs={carTabs} />

      <TicketSeat
        variant="summary"
        checkedCount={selectedIds.size}
        totalCount={totalSeats}
        checkedSeats={checkedSeats}
      />
    </Popup>
  );
}

export default TicketSeatChangePage;
