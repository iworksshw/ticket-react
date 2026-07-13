//간편지연증명서 팝업
import { useState } from 'react';
import Button from '@/components/common/forms/Button';
import Popup from '@/components/module/Popup';
import PopCerti from '@/features/train/components/PopCerti';

const sampleReferList = [
  '※ 본 간편 지연증명서는 2025년 07월25일 09시부터 13시까지 이 노선에서 운행하였던 열차가 5분 이상 지연되었음을 표시하는 것이며, 개별 열차의 지연을 증명하는 것은 아닙니다.',
  '※ 본 간편 지연증명서의 내용을 무단으로 복제 및 변경하거나 개인 홈페이지, 블로그 등에 공개하는 것을 금지합니다.',
  '※ 지연시간이 포함된 지연증명서 발급을 원하실 경우 하단버튼을 클릭해 주시기 바랍니다. 다만, 이는 담당자 확인 후 발행이 가능하여 시간이 다소 소요될 수 있는 점 양해 부탁드립니다.',
];

function GuidePopCerti() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h3>Pop Certi Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/forms/Button.jsx, src/components/module/Popup.jsx, src/features/train/components/PopCerti.jsx</p>

      <div style={{ marginBottom: '20px' }}>
        <h4>간편지연증명서 팝업 열기</h4>
        <Button variant="blue" onClick={() => setIsOpen(true)}>
          간편지연증명서
        </Button>

        <Popup isOpen={isOpen} onClose={() => setIsOpen(false)} size="md" title="간편지연증명서">
          <PopCerti
            time="09시~13시"
            lineName="공항방면 일반열차"
            date={
              <>
                2025.07.25
                <br />
                공항철도 (주)
              </>
            }
            referList={sampleReferList}
            onPrint={() => window.print()}
            onRequest={() => alert('지연증명서 신청')}
          />
        </Popup>
      </div>
    </>
  );
}
export default GuidePopCerti;
