import NoList from '@/components/common/contents/NoList';

// 가이드 : NoList
// 원본 퍼블리싱 파일: docs/html-src/html/common/comNoList.html

function GuideNoList() {
  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>NoList Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/contents/NoList.jsx</p>
      </section>

      <section>
        <h4>기본형</h4>
        <NoList
          texts={[
            '조회된 내역이 없습니다.',
          ]}
        />
      </section>

      <section>
        <h4>승차권 영역 (addClass: ticket)</h4>
        <NoList
          variant="ticket"
          texts={[
            '탑승이 예정된 고객님의 승차권 내역은 없습니다.',
            '열차 탑승이 완료된 승차권은 조회되지 않습니다.',
          ]}
        />
      </section>

      <section>
        <h4>이용내역 영역 (addClass: history)</h4>
        <NoList
          variant="history"
          texts={[
            '조회된 이용내역이 없습니다.',
          ]}
        />
      </section>
    </div>
  );
}

export default GuideNoList;
