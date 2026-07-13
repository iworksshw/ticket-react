//회색 정보 박스
import GrayBox from '@/components/common/contents/GrayBox';

function GuideGrayBox() {
  return (
    <>
      <h3>GrayBox Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/contents/GrayBox.jsx</p>

      {/* 텍스트 + 이미지 좌우 정렬 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>텍스트 + 이미지</h4>
        <GrayBox
          title="소제목"
          subTitle="부제목"
          lines={[
            { num: '01.', text: '안내 텍스트 1' },
            { num: '02.', text: '안내 텍스트 2' },
            { num: '03.', text: '안내 텍스트 3' },
          ]}
          referText="※ 참고 텍스트는 "
          referHighlight="강조 키워드"
          referAfter="로 표기됩니다"
          imgSrc="/images/contents/cont_03_04_13_10.png"
          imgAlt="참고 이미지"
        />
      </div>

      {/* 단순 메시지형 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>단순 메시지형</h4>
        <GrayBox message="예약이 취소되었습니다." />
      </div>

      {/* 일반 텍스트(desc) + 세로 이미지 목록(imgList) */}
      <div style={{ marginBottom: '20px' }}>
        <h4>desc + imgList (본문 아래 이미지 세로 나열)</h4>
        <GrayBox
          title="칸번호는 어디에 있나요?"
          desc="출입문 및 객실안내 표기시 화면 우측 상단 혹은 열차와 열차 사이의 통로 위쪽을 확인해주세요."
          imgList={[
            { src: '/images/contents/cont05_02_001.png', alt: '객차번호 안내 이미지 01' },
            { src: '/images/contents/cont05_02_002.png', alt: '객차번호 안내 이미지 02' },
          ]}
        />
      </div>
    </>
  );
}
export default GuideGrayBox;
