import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TicketSearch from '@/features/ticket/components/TicketSearch';
import TicketSelect, { defaultTrains } from '@/features/ticket/components/TicketSelect';
import StaSelectPop from '@/features/ticket/components/StaSelectPop';
import CalendarPop from '@/features/ticket/components/CalendarPop';
import TicketPass from '@/features/ticket/components/TicketPass';
import Popup from '@/components/module/Popup';
import Button from '@/components/common/forms/Button';
import { useReservation } from '@/contexts/ReservationContext';

// docs/html-dist/html/menu01/page_01_01_01_pop01.html(역 선택) 샘플 데이터
const STATIONS = [
  { id: 'seoul', label: '서울역' },
  { id: 't1', label: '인천공항 1터미널' },
  { id: 't2', label: '인천공항 2터미널' },
];

const AIRLINE_NAMES = ['아시아나항공', '제주항공', '티웨이항공', '이스타항공'];

function buildAirlines(terminalId, count = 12) {
  return Array.from({ length: count }, (_, i) => {
    const name = AIRLINE_NAMES[i % AIRLINE_NAMES.length];
    const imageIndex = (i % 5) + 1;
    return {
      id: `${terminalId}-airline-${i}`,
      name,
      image: `/images/temp/test0${imageIndex}.png`,
      alt: `${name} 로고`,
    };
  });
}

const TERMINALS = [
  { id: 't1', stationId: 't1', title: '인천공항 1터미널', airlines: buildAirlines('t1') },
  { id: 't2', stationId: 't2', title: '인천공항 2터미널', airlines: buildAirlines('t2') },
];

function formatDateLabel(date, hour) {
  if (!date) return '';
  const dateText = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  return hour ? `${dateText} ${String(hour).padStart(2, '0')}시` : dateText;
}

function formatHeadcountLabel({ adult, child }) {
  const total = adult + child;
  return total ? `어른 ${adult}명, 어린이 ${child}명` : '';
}

// 날짜는 저장소(localStorage)에 문자열로만 남길 수 있어서, Date 객체 대신 'YYYY-MM-DD' 문자열로
// 저장하고 화면 복원 시에만 Date로 되돌린다.
function toISODate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function fromISODate(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function TicketSearchPage() {
  const navigate = useNavigate();
  const { search, setSearch, setTrain } = useReservation();
  // 열차변경 등으로 이 페이지에 돌아왔을 때 이전에 검색했던 조건을 그대로 복원한다.
  const [departure, setDeparture] = useState(
    () => STATIONS.find((s) => s.id === search?.departureId) ?? null
  );
  const [arrival, setArrival] = useState(
    () => STATIONS.find((s) => s.id === search?.arrivalId) ?? null
  );
  const [selectedDate, setSelectedDate] = useState(() =>
    search?.dateISO ? fromISODate(search.dateISO) : null
  );
  const [selectedTime, setSelectedTime] = useState(() => search?.hour ?? null);
  const [passengers, setPassengers] = useState(() => search?.passengers ?? { adult: 0, child: 0 });
  const [activePopup, setActivePopup] = useState(null); // null | 'departure' | 'arrival' | 'date' | 'passenger'
  const [searched, setSearched] = useState(() => Boolean(search));

  const closePopup = () => setActivePopup(null);

  const handleSwap = () => {
    setDeparture(arrival);
    setArrival(departure);
  };

  const handleSelectStation = (stationId) => {
    const station = STATIONS.find((s) => s.id === stationId);
    if (activePopup === 'arrival') setArrival(station);
    else setDeparture(station);
  };

  const isSearchDisabled = !departure || !arrival || !selectedDate || passengers.adult + passengers.child === 0;

  const handleSearch = () => {
    if (isSearchDisabled) return;
    setSearched(true);
    setSearch({
      departureId: departure.id,
      departureLabel: departure.label,
      arrivalId: arrival.id,
      arrivalLabel: arrival.label,
      dateISO: toISODate(selectedDate),
      hour: selectedTime,
      dateLabel: formatDateLabel(selectedDate, selectedTime),
      dateOnlyLabel: formatDateLabel(selectedDate),
      headcountLabel: formatHeadcountLabel(passengers),
      passengers,
    });
  };

  // 검색결과 목록에는 조회한 출발역/도착역 이름이 보여야 하므로, 샘플 시간표(defaultTrains)의
  // 시간 정보는 그대로 두고 역 이름만 검색조건으로 덮어써서 TicketSelect에 넘긴다.
  const trains = useMemo(
    () =>
      defaultTrains.map((t) => ({
        ...t,
        departure: { ...t.departure, name: departure?.label ?? t.departure.name },
        arrival: { ...t.arrival, name: arrival?.label ?? t.arrival.name },
      })),
    [departure, arrival]
  );

  const handleReserve = (train) => {
    setTrain({
      trainNo: train.trainNo,
      departureTime: train.departure.time,
      departureName: train.departure.name,
      arrivalTime: train.arrival.time,
      arrivalName: train.arrival.name,
    });
    navigate('/tickets/trainSelection');
  };

  return (
    <div className="cptTicket">
      <div className="ticketArea">

        {/* 티켓 검색 */}
        <TicketSearch
          departureLabel={departure?.label ?? ''}
          arrivalLabel={arrival?.label ?? ''}
          dateLabel={formatDateLabel(selectedDate, selectedTime)}
          headcountLabel={formatHeadcountLabel(passengers)}
          onOpenDeparture={() => setActivePopup('departure')}
          onOpenArrival={() => { if (departure) setActivePopup('arrival'); }}
          onOpenDate={() => setActivePopup('date')}
          onOpenPassenger={() => setActivePopup('passenger')}
          onSwap={handleSwap}
          onSearch={handleSearch}
          searchDisabled={isSearchDisabled}
          arrivalDisabled={!departure}
        />

        {/* 열차 조회 결과 (조회 전에는 표시하지 않음) */}
        {searched && <TicketSelect trains={trains} onReserve={handleReserve} />}

        {/* comTicketBox: docs/html-src/html/common/comTicketBox.html 마크업 그대로 (src/styles/etc/_box.scss 전역 클래스 사용, 별도 컴포넌트 없음) */}
        <div className="comTicketBox">
          <div className="boxArea">
            <div className="boxHeader"><h4>이용안내</h4></div>
            <div className="boxTitle">승차권예약</div>
            <ul className="boxList">
              <li className="item">승차권 예약은 <em>출발 20분 전까지 가능</em>하며, <em>예약 후 20분 이내 결제</em>가 필요합니다. (최대 60일 이내 예약 가능)</li>
              <li className="item">어른, 어린이를 포함하여 총 12명까지 예약이 가능합니다.</li>
              <li className="item">유아가 1인을 초과하거나 좌석이 필요한 경우 어린이로 승차권 구매하셔야 합니다.</li>
              <li className="item"><em>휠체어 좌석은 현장구매</em>만 가능합니다.</li>
            </ul>
            <div className="boxTitle">열차 탑승</div>
            <ul className="boxList">
              <li className="item">직통열차 출발 30분 전부터 게이트 진입이 가능하며, <em>출발시각 3분 전까지</em> 직통열차 승강장에 도착하셔야 합니다.</li>
            </ul>
          </div>
        </div>

      </div>

      {/* 출발역/도착역 선택 팝업 (comStaSelect) */}
      <Popup
        isOpen={activePopup === 'departure' || activePopup === 'arrival'}
        onClose={closePopup}
        size="md"
        title="열차역 선택"
        footer={
          <>
            <Button variant="dkLine" size="lg" onClick={closePopup}>취소</Button>
            <Button variant="blue" size="lg" onClick={closePopup}>확인</Button>
          </>
        }
      >
        <StaSelectPop
          stations={STATIONS}
          selectedStation={activePopup === 'arrival' ? arrival?.id : departure?.id}
          onSelectStation={handleSelectStation}
          terminals={TERMINALS}
          disabledStationIds={
            activePopup === 'arrival' && departure
              ? [departure.id]
              : activePopup === 'departure' && arrival
                ? [arrival.id]
                : []
          }
        />
      </Popup>

      {/* 열차시간 선택 팝업 (comCalendarMin) */}
      <Popup
        isOpen={activePopup === 'date'}
        onClose={closePopup}
        size="md"
        title="열차시간 선택"
        footer={
          <>
            <Button variant="dkLine" size="lg" onClick={closePopup}>취소</Button>
            <Button variant="blue" size="lg" onClick={closePopup}>확인</Button>
          </>
        }
      >
        <CalendarPop onSelectDate={setSelectedDate} onSelectTime={setSelectedTime} />
      </Popup>

      {/* 탑승인원 선택 팝업 (comTicketPass) */}
      <Popup
        isOpen={activePopup === 'passenger'}
        onClose={closePopup}
        size="md"
        title="탑승인원 선택"
        footer={
          <>
            <Button variant="dkLine" size="lg" onClick={closePopup}>취소</Button>
            <Button variant="blue" size="lg" onClick={closePopup}>확인</Button>
          </>
        }
      >
        <TicketPass onChange={setPassengers} />

        <div className="comTicketBox type02">
          <div className="boxArea">
            <ul className="boxList">
              <li className="item">예약인원은 어른, 어린이를 포함하여 <em>총 12명</em>까지 선택 가능합니다.</li>
              <li className="item">어린이는 탑승일 기준 만 6세 ~ 만 12세까지 입니다.</li>
              <li className="item">보호자 1인이 동반하는 유아가 1인을 초과하거나 좌석이 필요한 경우 어린이로 승차권을 구매하셔야 합니다.</li>
              <li className="item">휠체어 좌석은 현장구매만 가능합니다.</li>
            </ul>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default TicketSearchPage;
