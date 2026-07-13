//열차 시각표
import Schedule from '@/features/train/components/Schedule';

// 방면1(blue): 서울(일반열차) / 방면2(green): 디지털미디어시티(일반열차) / 방면3(red): 직통열차
// rows.items는 분(分) 오름차순으로 미리 정렬해서 전달한다.
const makeDirections = (prefix) => [
  { id: `${prefix}01`, color: 'blue', label: <><span>서울</span>(일반열차)</> },
  { id: `${prefix}02`, color: 'green', label: <><span>디지털미디어시티</span>(일반열차)</> },
  { id: `${prefix}03`, color: 'red', label: '직통열차' },
];

const sampleRows = [
  {
    hour: 5,
    items: [
      { value: '15', color: 'green' },
      { value: '24', color: 'blue' },
      { value: '27', color: 'green' },
      { value: '31', color: 'blue' },
      { value: '40', color: 'green' },
      { value: '54', color: 'blue' },
    ],
  },
  {
    hour: 6,
    items: [
      { value: '05', color: 'green' },
      { value: '07', color: 'blue' },
      { value: '14', color: 'green' },
      { value: '16', color: 'blue' },
      { value: '28', color: 'green' },
      { value: '30', color: 'blue' },
      { value: '38', color: 'green' },
      { value: '40', color: 'blue' },
      { value: '58', color: 'red' },
    ],
  },
  {
    hour: 7,
    items: [
      { value: '05', color: 'green' },
      { value: '07', color: 'blue' },
      { value: '14', color: 'green' },
      { value: '16', color: 'blue' },
      { value: '28', color: 'green' },
      { value: '38', color: 'green' },
      { value: '40', color: 'blue' },
      { value: '50', color: 'blue' },
    ],
  },
  {
    hour: 8,
    items: [
      { value: '58', color: 'red' },
    ],
  },
];

function GuideSchedule() {
  return (
    <>
      <h3>Schedule Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/train/components/Schedule.jsx</p>

      {/* 한쪽 방면만 있는 경우 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>서울역 방면 (단일)</h4>
        <Schedule
          right={{
            stnName: '서울역',
            caption: '열차시각표(평일)_서울역 방면',
            directions: makeDirections('L'),
            rows: sampleRows,
          }}
        />
      </div>

      {/* 좌/우 방면 모두 있는 경우 (좌우 체크박스 상태는 서로 독립) */}
      <div style={{ marginBottom: '20px' }}>
        <h4>좌우 방면 동시 표시</h4>
        <Schedule
          left={{
            stnName: '서울역',
            caption: '열차시각표(평일)_서울역 방면',
            directions: makeDirections('L'),
            rows: sampleRows,
          }}
          right={{
            stnName: '인천공항2터미널',
            caption: '열차시각표(평일)_인천공항2터미널 방면',
            directions: makeDirections('R'),
            rows: sampleRows,
          }}
          onSchedClick={() => alert('전체열차 시간표')}
          onPrintClick={() => alert('프린트')}
        />
      </div>
    </>
  );
}
export default GuideSchedule;
