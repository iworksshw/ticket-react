import Meeting from '@/components/common/search/Meeting';

// 가이드 : Meeting
// 원본 퍼블리싱 파일: docs/html-src/html/common/comMeeting.html

function GuideMeeting() {
  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>Meeting Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/search/Meeting.jsx</p>
      </section>

      <section>
        <h4>이력조회검색바</h4>
        <Meeting onSearch={(params) => alert(`조회: ${JSON.stringify(params)}`)} />
      </section>
    </div>
  );
}

export default GuideMeeting;
