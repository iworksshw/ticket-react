import TicketSearch from '@/features/ticket/components/TicketSearch';

function GuideTicketSearch() {
  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>Ticket Search Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/ticket/components/TicketSearch.jsx</p>
      </section>

      <section>
        <h4>티켓 검색</h4>
        {/* TicketSearch는 값/팝업 상태를 상위(TicketSearchPage)가 관리하는 controlled 컴포넌트라서
            여기서는 클릭 동작 없이 필드 모양만 보여준다. 실제 팝업 연동은 TicketSearchPage 참고. */}
        <TicketSearch />
      </section>
    </div>
  );
}

export default GuideTicketSearch;
