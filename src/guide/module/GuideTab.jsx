//탭
import Tab from '@/components/module/Tab';
import TabLine from '@/components/module/TabLine';

function GuideTab() {
  return (
    <>
      <h3>Tab Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/module/Tab.jsx, src/components/module/TabLine.jsx</p>

      {/* 탭 : 2개 (half - 각 50%) */}
      <div style={{ marginBottom: '20px' }}>
        <h4>2개 탭 (half)</h4>
        <Tab
          variant="half"
          tabs={[
            { label: 'Tab Name 01', content: 'Contents Area 0-0' },
            { label: 'Tab Name 02', content: 'Contents Area 0-1' },
          ]}
        />
      </div>

      {/* 탭 : 3개 이상 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>3개 이상</h4>
        <Tab
          tabs={[
            { label: 'Tab Name 01', content: 'Contents Area 0-0' },
            { label: 'Tab 02', content: 'Contents Area 0-1' },
            { label: 'Tab 03', content: 'Contents Area 0-2' },
            { label: 'Tab 04', content: 'Contents Area 0-3' },
            { label: 'Tab 05', content: 'Contents Area 0-4' },
          ]}
        />
      </div>

      {/* 탭 : 숫자 뱃지(.num) / 비활성화(disabled) */}
      <div style={{ marginBottom: '20px' }}>
        <h4>숫자 뱃지 / 비활성화</h4>
        <Tab
          tabs={[
            { label: 'Tab Name 01', num: 123, content: 'Contents Area 0-0' },
            { label: 'Tab 02', num: 45, content: 'Contents Area 0-1' },
            { label: 'Tab 03', num: 0, content: 'Contents Area 0-2' },
            { label: 'Tab 04', disabled: true, content: 'Contents Area 0-3' },
          ]}
        />
      </div>

      {/* 탭 : 콘텐츠 영역 1개 (singleContent) */}
      <div style={{ marginBottom: '20px' }}>
        <h4>콘텐츠 영역 1개 (singleContent)</h4>
        <Tab
          singleContent
          tabs={[
            { label: 'Tab Name 01', content: 'Contents Area 0-0' },
            { label: 'Tab 02', content: 'Contents Area 0-1' },
            { label: 'Tab 03', content: 'Contents Area 0-2' },
          ]}
        />
      </div>
      {/* 탭 안에 탭 라인(TabLine) 넣기 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>탭 안에 탭 라인 (TabLine)</h4>
        <Tab
          tabs={[
            {
              label: 'Tab 01',
              content: (
                <>
                  <TabLine
                    items={[{ label: 'Inner Tab 01' }, { label: 'Inner Tab 02' }, { label: 'Inner Tab 03' }]}
                  />
                  <TabLine
                    sticky
                    items={[
                      { label: 'Sticky Inner 01' },
                      { label: 'Sticky Inner 02' },
                      { label: 'Sticky Inner 03' },
                      { label: 'Sticky Inner 04' },
                      { label: 'Sticky Inner 05' },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Tab 02',
              content: (
                <TabLine
                  items={[{ label: 'Inner Tab 01' }, { label: 'Inner Tab 02' }, { label: 'Inner Tab 03' }]}
                />
              ),
            },
            { label: 'Tab 03', content: 'Contents Area 0-2' },
          ]}
        />
      </div>
    </>
  );
}
export default GuideTab;
