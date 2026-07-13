// 좌석변경 팝업(TicketSeatChangePage)과 승차권 예약 화면(TrainSelectionPage)이 함께 쓰는
// 가상 좌석배치도 데이터. docs/html-dist/html/menu01/page_01_01_03_pop05.html 참고.
// 퍼블리싱에는 1호차 배치도만 있어서, 2~6호차는 1호차와 동일한 구조(D/C/B/A 4개열 x 13열,
// 1~7열 역방향 + 8~13열 순방향)로 만들었다. 4,5,6호차는 좌석 전부 선택할 수 없다.
export const ROW_LETTERS = ['D', 'C', 'B', 'A'];
// 탭 옆 숫자(잔여좌석)는 퍼블리싱 원본 값을 그대로 사용한다.
export const CAR_AVAILABLE_COUNTS = { 1: 17, 2: 9, 3: 0, 4: 32, 5: 20, 6: 17 };
// 1호차에서 이미 예약되어 선택할 수 없는 좌석(html 원본 그대로: 2D, 3D)
export const CAR_RESERVED_LABELS = { 1: ['2D', '3D'] };
// 4,5,6호차는 좌석 전부 선택불가
export const FULLY_DISABLED_CARS = [4, 5, 6];

const SEAT_ID_RE = /^c(\d+)-(\d+)([A-D])(re)?$/;

export function seatId(carNo, col, letter) {
  return col <= 7 ? `c${carNo}-${col}${letter}re` : `c${carNo}-${col}${letter}`;
}

// 'c1-5Are' -> { car: 1, col: 5, letter: 'A', label: '5A' }
export function parseSeatId(id) {
  const m = SEAT_ID_RE.exec(id);
  if (!m) return null;
  const [, car, col, letter] = m;
  return { car: Number(car), col: Number(col), letter, label: `${col}${letter}` };
}

export function buildCarRows(carNo, selectedIds) {
  const reservedLabels = CAR_RESERVED_LABELS[carNo] ?? [];
  const allDisabled = FULLY_DISABLED_CARS.includes(carNo);

  return ROW_LETTERS.map((letter, rowIdx) => {
    const seats = [];

    seats.push(
      rowIdx === 0
        ? { id: `c${carNo}-unselRe`, direction: 're', unselectable: true }
        : { id: `c${carNo}-empty${letter}1`, empty: true }
    );

    for (let col = 1; col <= 7; col++) {
      const label = `${col}${letter}`;
      const id = seatId(carNo, col, letter);
      seats.push({
        id,
        label,
        direction: 're',
        disabled: allDisabled || reservedLabels.includes(label),
        checked: selectedIds.has(id),
      });
    }

    for (let col = 8; col <= 13; col++) {
      const label = `${col}${letter}`;
      const id = seatId(carNo, col, letter);
      seats.push({
        id,
        label,
        direction: 'fo',
        disabled: allDisabled || reservedLabels.includes(label),
        checked: selectedIds.has(id),
      });
    }

    seats.push(
      rowIdx === 3
        ? { id: `c${carNo}-unselFo`, direction: 'fo', unselectable: true }
        : { id: `c${carNo}-empty${letter}2`, empty: true }
    );

    return { seats, aisleAfter: rowIdx === 1 };
  });
}

// 자동배정 시 우선순위를 매기는 순서: 1A,1B,1C,1D,2A,2B,2C,2D... (열 번호 먼저, 그 안에서 A->D)
const ASSIGNMENT_LETTERS = ['A', 'B', 'C', 'D'];

// 특정 호차에서 선택 가능한(이미 예약되지 않고, 완전 선택불가 호차도 아닌) 좌석 id를
// 자동배정 우선순위 순서(1A,1B,1C,1D,2A,2B,2C,2D...)로 반환한다.
export function getSelectableSeatIds(carNo) {
  if (FULLY_DISABLED_CARS.includes(carNo)) return [];
  const reservedLabels = CAR_RESERVED_LABELS[carNo] ?? [];
  const ids = [];
  for (let col = 1; col <= 13; col++) {
    ASSIGNMENT_LETTERS.forEach((letter) => {
      const label = `${col}${letter}`;
      if (reservedLabels.includes(label)) return;
      ids.push(seatId(carNo, col, letter));
    });
  }
  return ids;
}
