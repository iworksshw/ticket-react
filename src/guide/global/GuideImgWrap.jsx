//이미지 그룹 래퍼
import ImgWrap from '@/components/common/contents/ImgWrap';

const img1 = [{ srcPc: '/images/contents/cont_02_01_001.jpg', alt: '서울역 도심공항터미널 수화물 신청 이미지', caption: '이미지 캡션 1' }];

const img2 = [
  { srcPc: '/images/contents/cont_02_01_001.jpg', alt: '서울역 도심공항터미널 수화물 신청 이미지', caption: '이미지 캡션 1' },
  { srcPc: '/images/contents/cont_02_01_002.jpg', alt: '서울역 도심공항터미널 열차 내부 이미지', caption: '이미지 캡션 2' },
];

const img3 = [
  { srcPc: '/images/contents/cont_02_01_001.jpg', alt: '이미지1 설명', caption: '이미지 캡션 1' },
  { srcPc: '/images/contents/cont_02_01_002.jpg', alt: '이미지2 설명', caption: '이미지 캡션 2' },
  { srcPc: '/images/contents/cont_02_01_003.jpg', alt: '이미지3 설명', caption: '이미지 캡션 3' },
];

const img4 = [
  { srcPc: '/images/contents/cont_02_01_001.jpg', alt: '서울역 도심공항터미널 수화물 신청 이미지', caption: '이미지 캡션 1' },
  { srcPc: '/images/contents/cont_02_01_002.jpg', alt: '서울역 도심공항터미널 열차 내부 이미지', caption: '이미지 캡션 2' },
  { srcPc: '/images/contents/cont_02_01_003.jpg', alt: '열차 내부 객실 승무원 서비스 받는 이미지', caption: '이미지 캡션 3' },
  { srcPc: '/images/contents/cont_02_01_004.jpg', alt: '열차 내 화장실 이미지', caption: '이미지 캡션 4' },
];

const img5 = [
  ...img4,
  { srcPc: '/images/contents/cont_02_01_005.jpg', alt: '열차 내 키즈칸(6호차) 이미지', caption: '이미지 캡션 5' },
];

function GuideImgWrap() {
  return (
    <>
      <h3>ImgWrap Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/contents/ImgWrap.jsx</p>

      {/* 기본 1장 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>기본 (1장)</h4>
        <ImgWrap items={img1} />
      </div>

      {/* 2열 / 3열 / 4열 / 5열 그리드 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>2열 그리드</h4>
        <ImgWrap cols={2} items={img2} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h4>3열 그리드</h4>
        <ImgWrap cols={3} items={img3} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h4>4열 그리드</h4>
        <ImgWrap cols={4} items={img4} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h4>5열 그리드</h4>
        <ImgWrap cols={5} items={img5} />
      </div>

      {/* 테두리 옵션 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>테두리 없음 (noBdr)</h4>
        <ImgWrap cols={2} items={img2.map((item) => ({ ...item, noBdr: true }))} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h4>항상 테두리 (abBder)</h4>
        <ImgWrap cols={2} abBder items={img2} />
      </div>

      {/* PC/모바일 이미지 분리 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>PC/모바일 이미지 분리</h4>
        <ImgWrap
          items={[{
            srcPc: '/images/contents/cont_02_01_001.jpg',
            srcMo: '/images/contents/cont_02_01_001_mo.jpg',
            alt: '서울역 도심공항터미널 수화물 신청 이미지',
            caption: '이미지 캡션 1',
          }]}
        />
      </div>

      {/* 상단 타이틀 + 하단 불릿/텍스트 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>타이틀 + 하단 불릿/텍스트</h4>
        <ImgWrap
          imgTit="이용 안내"
          cols={2}
          items={img2}
          imgTxtList={[
            { text: '수화물은 1인당 2개까지 무료입니다.', caption: '초과 시 별도 요금이 부과됩니다.' },
            { text: '탑승 10분 전까지 수속을 완료해야 합니다.' },
          ]}
          imgTxtB="자세한 내용은 안내 데스크에 문의해주세요."
        />
      </div>
    </>
  );
}
export default GuideImgWrap;
