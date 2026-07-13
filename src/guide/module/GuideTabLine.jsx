//탭 안 탭 (라인 스타일)
import TabLine from '@/components/module/TabLine';

function GuideTabLine() {
  return (
    <>
      <h3>Tab Line Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/module/TabLine.jsx</p>

      {/* 내부 탭 기본 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>기본</h4>
        <TabLine
          items={[
            { label: 'Inner Tab 01', content: 'Inner Contents 0-0' },
            { label: 'Inner Tab 02', content: 'Inner Contents 0-1' },
            { label: 'Inner Tab 03', content: 'Inner Contents 0-2' },
          ]}
        />
      </div>

      {/* 내부 탭 sticky */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Sticky</h4>
        <TabLine
          sticky
          items={[
            { label: 'Sticky Inner 01', content: 'Sticky Inner Contents 0-0' },
            { label: 'Sticky Inner 02', content: 'Sticky Inner Contents 0-1' },
            { label: 'Sticky Inner 03', content: 'Sticky Inner Contents 0-2' },
            { label: 'Sticky Inner 04', content: 'Sticky Inner Contents 0-3' },
            { label: 'Sticky Inner 05', content: 'Sticky Inner Contents 0-4' },
            { label: 'Sticky Inner 06', content: 'Sticky Inner Contents 0-5' },
            { label: 'Sticky Inner 07', content: 'Sticky Inner Contents 0-6' },
            { label: 'Sticky Inner 08', content: 'Sticky Inner Contents 0-7' },
            { label: 'Sticky Inner 09', content: 'Sticky Inner Contents 0-8' },
          ]}
        />
      </div>

      {/* 내부 탭 : 콘텐츠 영역 1개 (singleContent) */}
      <div style={{ marginBottom: '20px' }}>
        <h4>콘텐츠 영역 1개 (singleContent)</h4>
        <TabLine
          singleContent
          items={[
            { label: 'Inner Tab 01', content: 'Inner Contents 0-0' },
            { label: 'Inner Tab 02', content: 'Inner Contents 0-1' },
            { label: 'Inner Tab 03', content: 'Inner Contents 0-2' },
          ]}
        />
      </div>
    </>
  );
}
export default GuideTabLine;
