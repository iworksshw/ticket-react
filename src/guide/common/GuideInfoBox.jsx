//정보 박스
import InfoBox from '@/components/common/contents/InfoBox';

function GuideInfoBox() {
  return (
    <>
      <h3>InfoBox Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/contents/InfoBox.jsx</p>

      {/* 기본형 (아이콘 있는 유형) */}
      <div style={{ marginBottom: '20px' }}>
        <h4>기본형 (icon001)</h4>
        <InfoBox
          icon="icon001"
          title="정보 제목"
          desc="정보 설명 텍스트가 들어갑니다."
        />
      </div>

      {/* 이미지 포함형 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>이미지 포함형</h4>
        <InfoBox
          imgSrc="/images/contents/cont_03_04_08_01.jpg"
          imgAlt="정보 이미지"
          title="정보 제목"
          textList={[
            { label: '항목명', content: '항목 내용' },
            { label: '항목명', content: '항목 내용' },
          ]}
        />
      </div>
    </>
  );
}
export default GuideInfoBox;
