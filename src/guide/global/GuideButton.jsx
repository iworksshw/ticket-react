//버튼
import ButtonGroup from '@/components/common/forms/ButtonGroup';
import Button from '@/components/common/forms/Button';

function GuideButton() {
  return (
    <>
      <h3>Button Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/forms/ButtonGroup.jsx, src/components/common/forms/Button.jsx</p>
      
      {/* 버튼 기본/색깔/크기 + 옵션 - Large */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Large Size</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button variant="blue" size="lg">기본,파랑,Large</Button>
          <Button variant="blue" size="lg" disabled>기본,파랑,Large</Button>
          <Button variant="dkLine" size="lg">기본,검은라인,Large</Button>
          <Button variant="dkLine" size="lg" disabled>기본,검은라인,Large</Button>
          <Button variant="gLine" size="lg">기본,회색라인,Large</Button>
          <Button variant="gLine" size="lg" disabled>기본,회색라인,Large</Button>
        </div>
      </div>

      {/* 버튼 기본/색깔/크기 + 옵션 - Medium */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Medium Size</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button variant="blue" size="md">기본,파랑,Medium</Button>
          <Button variant="blue" size="md" disabled>기본,파랑,Medium</Button>
          <Button variant="dkLine" size="md">기본,검은라인,Medium</Button>
          <Button variant="dkLine" size="md" disabled>기본,검은라인,Medium</Button>
          <Button variant="gLine" size="md">기본,회색라인,Medium</Button>
          <Button variant="gLine" size="md" disabled>기본,회색라인,Medium</Button>
        </div>
      </div>

      {/* 버튼 기본/색깔/크기 + 옵션 - Small */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Small Size</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button variant="blue" size="sm">기본,파랑,small</Button>
          <Button variant="blue" size="sm" disabled>기본,파랑,small</Button>
          <Button variant="dkLine" size="sm">기본,검은라인,small</Button>
          <Button variant="dkLine" size="sm" disabled>기본,검은라인,small</Button>
          <Button variant="gLine" size="sm">기본,회색라인,small</Button>
          <Button variant="gLine" size="sm" disabled>기본,회색라인,small</Button>
        </div>
      </div>

      {/* 버튼 정렬 - Left, Center, Right */}
      <div style={{ marginBottom: '20px', marginTop: '30px' }}>
        <h4>Button Groups - Multi-align</h4>
        <ButtonGroup align="alignL">
          <Button variant="dkLine" size="lg">미리보기</Button>
          <Button variant="blue" size="lg">서명하기</Button>
          <Button variant="gLine" size="lg">취소</Button>
        </ButtonGroup>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <ButtonGroup align="alignC">
          <Button variant="blue" size="lg">저장</Button>
          <Button variant="dkLine" size="lg">승인하기</Button>
        </ButtonGroup>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <ButtonGroup align="alignR">
          <Button variant="dkLine" size="lg">미리보기</Button>
          <Button variant="gLine" size="lg">취소</Button>
          <Button variant="blue" size="lg">저장</Button>
        </ButtonGroup>
      </div>

      {/* 버튼 정렬 - Left & Center */}
      <div style={{ marginBottom: '20px', marginTop: '30px' }}>
        <h4>Button Groups - Left & Center</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <p>Left Aligned:</p>
            <ButtonGroup align="alignL">
              <Button variant="dkLine" size="lg">미리보기</Button>
              <Button variant="blue" size="lg">서명하기</Button>
              <Button variant="gLine" size="lg">취소</Button>
            </ButtonGroup>
          </div>
          <div>
            <p>Center Aligned:</p>
            <ButtonGroup align="alignC">
              <Button variant="blue" size="lg">저장</Button>
              <Button variant="dkLine" size="lg">승인하기</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>

      {/* 버튼 정렬 - Left & Right */}
      <div style={{ marginBottom: '20px', marginTop: '30px' }}>
        <h4>Button Groups - Left & Right</h4>
        <ButtonGroup>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="dkLine" size="lg">미리보기</Button>
              <Button variant="blue" size="lg">서명하기</Button>
              <Button variant="gLine" size="lg">취소</Button>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="dkLine" size="lg">미리보기</Button>
              <Button variant="gLine" size="lg">취소</Button>
              <Button variant="blue" size="lg">저장</Button>
            </div>
          </div>
        </ButtonGroup>
      </div>

      {/* 고정 크기 버튼 - CTA (XL) */}
      <div style={{ marginBottom: '20px', marginTop: '30px' }}>
        <h4>CTA Button - Extra Large</h4>
        <ButtonGroup align="alignC" isCta>
          <Button variant="dkLine" size="xl">미리보기</Button>
          <Button variant="blue" size="xl">서명하기</Button>
          <Button variant="gLine" size="xl">취소</Button>
        </ButtonGroup>
      </div>

      {/* 모바일 반응형 버튼 그룹 */}
      <div style={{ marginBottom: '20px', marginTop: '30px' }}>
        <h4>Mobile Responsive Button Groups</h4>
        <div style={{ marginBottom: '15px' }}>
          <p>2-2 cols on mobile:</p>
          <ButtonGroup align="alignC" isCta moCols="2-2">
            <Button variant="dkLine" size="xl">미리보기</Button>
            <Button variant="blue" size="xl">서명하기</Button>
            <Button variant="gLine" size="xl">취소</Button>
          </ButtonGroup>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <p>2-1 cols on mobile:</p>
          <ButtonGroup align="alignC" isCta moCols="2-1">
            <Button variant="dkLine" size="xl">미리보기</Button>
            <Button variant="blue" size="xl">서명하기</Button>
            <Button variant="gLine" size="xl">취소</Button>
          </ButtonGroup>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <p>1-2 cols on mobile:</p>
          <ButtonGroup align="alignC" isCta moCols="1-2">
            <Button variant="dkLine" size="xl">미리보기</Button>
            <Button variant="blue" size="xl">서명하기</Button>
            <Button variant="gLine" size="xl">취소</Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
}
export default GuideButton;