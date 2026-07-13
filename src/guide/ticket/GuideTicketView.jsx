import TicketView from '@/features/ticket/components/TicketView';

// 가이드 : TicketView
// 원본 퍼블리싱 파일: docs/html-src/html/common/comTicketView.html
// swiper는 모바일(1279px 이하)에서만 동작하며, 그 외 너비에서는 세로 목록으로 보여준다.
// 화면 너비를 1279px 이하로 줄여서 swiper 슬라이드 동작을 확인할 수 있다.

const sampleTickets = [
  {
    id: 'ticket01',
    departDate: '2025-12-12',
    title: '직통열차 승차권',
    titleEng: '(Express Ticket)',
    logo: '/images/common/logo_160_arex.svg',
    moDate: '2025-10-05',
    moTrainNo: 'A1026',
    departStation: '서울역',
    departStationEng: 'Seoul Station',
    departTime: '07:30',
    arriveStation: "인천공항1터미널",
    arriveStationEng: "Incheon Int'l Airport Terminal 1",
    arriveTime: '08:14',
    qrImage: '/images/common/qrSample.png',
    printed: true,
    qrNum: '910907-251027-00032-91',
    car: '2호차',
    seat: '8A',
    category: '어른 (Adult)',
    direction: '순방향 (Forward)',
    trainNo: 'A1010',
    footNotice: (
      <>
        열차 출발시각 <span>3분 전</span> 까지 <br />승강장에 도착하셔야 합니다.
      </>
    ),
    footNoticeEng: 'Arrive at the platform at least 3 minutes before departure time.',
  },
  {
    id: 'ticket02',
    departDate: '2025-12-12',
    title: '직통열차 승차권',
    titleEng: '(Express Ticket)',
    logo: '/images/common/logo_160_arex.svg',
    moDate: '2025-10-05',
    moTrainNo: 'A1028',
    departStation: '인천공항1터미널',
    departStationEng: "Incheon Int'l Airport Terminal 1",
    departTime: '09:00',
    arriveStation: '서울역',
    arriveStationEng: 'Seoul Station',
    arriveTime: '09:43',
    qrImage: '/images/common/qrSample.png',
    printed: false,
    qrNum: '910907-251027-00032-92',
    car: '3호차',
    seat: '12C',
    category: '어른 (Adult)',
    direction: '역방향 (Backward)',
    trainNo: 'A1012',
    footNotice: (
      <>
        열차 출발시각 <span>3분 전</span> 까지 <br />승강장에 도착하셔야 합니다.
      </>
    ),
    footNoticeEng: 'Arrive at the platform at least 3 minutes before departure time.',
  },
];

function GuideTicketView() {
  return (
    <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'minmax(0, 1fr)' }}>
      <section>
        <h3>TicketView Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/ticket/components/TicketView.jsx</p>
      </section>

      <section>
        <h4>승차권 상세 (2매)</h4>
        <TicketView tickets={sampleTickets} />
      </section>
    </div>
  );
}

export default GuideTicketView;
