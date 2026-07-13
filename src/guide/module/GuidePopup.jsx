//팝업
import { Fragment, useState } from 'react';
import Popup from '@/components/module/Popup';
import Button from '@/components/common/forms/Button';

// 팝업 내부 스크롤 데모용 샘플 콘텐츠.
// 원본 html은 "Popup Contents Area" 줄을 반복해서 스크롤이 생기도록 채워둔 것이므로,
// 동일한 목적(스크롤 + 타이틀 그림자 데모)을 위해 배열로 짧게 생성해서 재사용한다.
const renderSampleContent = () => (
  <>
    {Array.from({ length: 6 }).map((_, i) => (
      <Fragment key={i}>
        Popup Contents Area
        <br />
      </Fragment>
    ))}
    <a href="#">Contents Link</a>
    <br />
    {Array.from({ length: 14 }).map((_, i) => (
      <Fragment key={`b-${i}`}>
        Popup Contents Area
        <br />
      </Fragment>
    ))}
    Popup Contents Area
  </>
);

// 팝업 하단 버튼 영역도 반복 사용되므로 함수로 분리
const renderSampleFooter = () => (
  <>
    <Button variant="gLine" size="lg">
      취소
    </Button>
    <Button variant="blue" size="lg">
      쿠폰번호 등록
    </Button>
  </>
);

function GuidePopup() {
  // 팝업은 각자 독립된 open 상태가 필요하므로, 데모별로 useState를 따로 둔다.
  // (크기별 5종 + fullCase + gall = 총 7개 데모)
  const [openTini, setOpenTini] = useState(false);
  const [openSm, setOpenSm] = useState(false);
  const [openMd, setOpenMd] = useState(false);
  const [openLg, setOpenLg] = useState(false);
  const [openXl, setOpenXl] = useState(false);
  const [openFullCase, setOpenFullCase] = useState(false);
  const [openGall, setOpenGall] = useState(false);

  return (
    <>
      <h3>Popup Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/module/Popup.jsx, src/components/common/forms/Button.jsx</p>

      {/*
        팝업 크기 종류 (Popup.module.scss 기준 5종)
        - tini : max-width 400px
        - sm   : max-width 580px
        - md   : max-width 700px (기본값)
        - lg   : max-width 1000px
        - xl   : max-width 1200px
        size prop만 바꿔주면 되고, 열림/닫힘은 isOpen + onClose로 부모(여기서는 가이드)가 제어한다.
      */}
      <div style={{ marginBottom: '20px' }}>
        <h4>크기 종류 (size)</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button variant="dkLine" size="md" onClick={() => setOpenTini(true)}>
            tini (400px)
          </Button>
          <Button variant="dkLine" size="md" onClick={() => setOpenSm(true)}>
            sm (580px)
          </Button>
          <Button variant="dkLine" size="md" onClick={() => setOpenMd(true)}>
            md (700px, 기본값)
          </Button>
          <Button variant="dkLine" size="md" onClick={() => setOpenLg(true)}>
            lg (1000px)
          </Button>
          <Button variant="dkLine" size="md" onClick={() => setOpenXl(true)}>
            xl (1200px)
          </Button>
        </div>

        <Popup
          isOpen={openTini}
          onClose={() => setOpenTini(false)}
          size="tini"
          title="Title"
          footer={renderSampleFooter()}
        >
          {renderSampleContent()}
        </Popup>

        <Popup
          isOpen={openSm}
          onClose={() => setOpenSm(false)}
          size="sm"
          title="Title"
          footer={renderSampleFooter()}
        >
          {renderSampleContent()}
        </Popup>

        <Popup
          isOpen={openMd}
          onClose={() => setOpenMd(false)}
          size="md"
          title="Title"
          footer={renderSampleFooter()}
        >
          {renderSampleContent()}
        </Popup>

        <Popup
          isOpen={openLg}
          onClose={() => setOpenLg(false)}
          size="lg"
          title="Title"
          footer={renderSampleFooter()}
        >
          {renderSampleContent()}
        </Popup>

        <Popup
          isOpen={openXl}
          onClose={() => setOpenXl(false)}
          size="xl"
          title="Title"
          footer={renderSampleFooter()}
        >
          {renderSampleContent()}
        </Popup>
      </div>

      {/* fullCase : PC(pcs 이상)에서 풀스크린으로 표시되는 팝업 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>fullCase (풀스크린)</h4>
        <Button variant="dkLine" size="md" onClick={() => setOpenFullCase(true)}>
          fullCase 팝업 열기
        </Button>

        <Popup
          isOpen={openFullCase}
          onClose={() => setOpenFullCase(false)}
          size="md"
          fullCase
          title="Title"
          footer={renderSampleFooter()}
        >
          {renderSampleContent()}
        </Popup>
      </div>

      {/* gall : 콘텐츠 영역 여백을 없앤 갤러리형 팝업 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>gall (갤러리형, 여백 없음)</h4>
        <Button variant="dkLine" size="md" onClick={() => setOpenGall(true)}>
          gall 팝업 열기
        </Button>

        <Popup isOpen={openGall} onClose={() => setOpenGall(false)} gall title="Title">
          {renderSampleContent()}
        </Popup>
      </div>
    </>
  );
}
export default GuidePopup;
