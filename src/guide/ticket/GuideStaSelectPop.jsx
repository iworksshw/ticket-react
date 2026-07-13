import { useState } from 'react';
import StaSelectPop from '@/features/ticket/components/StaSelectPop';

// 가이드 : StaSelectPop
// 원본 퍼블리싱 파일: docs/html-src/html/common/comStaSelect.html

// 라디오로 보여줄 역/터미널 목록
const stations = [
  { id: 'rdo001', label: '서울역' },
  { id: 'rdo002', label: '인천공항 1터미널' },
  { id: 'rdo003', label: '인천공항 2터미널', disabled: true },
];

// 터미널별로 항공사 로고를 보여주는 박스. stationId는 클릭 시 선택될 라디오 id
const terminals = [
  {
    id: 'tml001',
    stationId: 'rdo002',
    title: '인천공항 1터미널',
    airlines: [
      { id: 'air001', name: '아시아나항공', image: '/images/temp/test01.png', alt: '아시아나항공 로고' },
      { id: 'air002', name: '제주항공', image: '/images/temp/test02.png', alt: '제주항공 로고' },
      { id: 'air003', name: '티웨이항공', image: '/images/temp/test03.png', alt: '티웨이항공 로고' },
    ],
  },
  {
    id: 'tml002',
    stationId: 'rdo003',
    title: '인천공항 2터미널',
    airlines: [
      { id: 'air004', name: '이스타항공', image: '/images/temp/test04.png', alt: '이스타항공 로고' },
      { id: 'air005', name: '아시아나항공', image: '/images/temp/test05.png', alt: '아시아나항공 로고' },
    ],
  },
];

/**
 * StaSelectPop 사용 가이드
 *
 * - stations: 상단 라디오 목록. disabled를 주면 선택 불가 상태(스크린샷 ※ disabled 스타일)로 보인다.
 * - terminals: 하단 항공사 로고 박스. 박스를 클릭하면 stationId에 해당하는 라디오가 선택된다.
 * - selectedStation / onSelectStation으로 라디오와 항공사 박스 클릭을 한 state로 동기화한다.
 */
function GuideStaSelectPop() {
  const [selectedStation, setSelectedStation] = useState('rdo001');

  return (
    <div style={{ padding: '32px' }}>
      <h3>StaSelectPop Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/ticket/components/StaSelectPop.jsx</p>
      <p style={{ margin: '8px 0 24px', color: '#666' }}>
        현재 선택된 역: <b>{selectedStation}</b>
      </p>

      <StaSelectPop
        stations={stations}
        terminals={terminals}
        selectedStation={selectedStation}
        onSelectStation={setSelectedStation}
      />
    </div>
  );
}

export default GuideStaSelectPop;
