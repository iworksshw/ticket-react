import { useState } from 'react';
import TermsAgree from '@/components/common/forms/TermsAgree';

// 가이드 : TermsAgree
// 원본 퍼블리싱 파일: docs/html-src/html/common/comAgreement.html
// html 안에 있던 "내용보기" 팝업(#sample01 .modPopup)은 별도 범위라 구현하지 않고,
// onShowDetail 콜백이 호출되는 것만 alert으로 확인한다.

const personalInfoDesc = (
  <>
    [개인정보의 수집 및 이용 목적]
    <br />
    승차권 예약발매서비스 이용
    <br />
    <br />
    [개인정보 수집 항목]
    <br />
    카드번호, 유효기간
    <br />
    <br />
    ▶개인정보 수집 및 이용 동의 거부
    <br />
    개인정보 수집 및 이용 동의를 거부하실 수 있습니다. 다만, 이 경우 승차권 예약 서비스 이용이 제한될 수 있습니다.
  </>
);

const fieldTripDesc = (
  <>
    공항철도는 체험학습 운영을 위해 아래와 같이 개인정보를 수집하고 있습니다.
    <br />
    개인정보의 수집 및 이용 목적
    <br />
    공항철도는 수집한 개인정보를 다음의 목적을 위해서만 사용하며, 아래 목적 외에는 사용하지 않습니다.
    <br />
    - 체험학습 진행
    <br />
    수집하는 개인 정보의 항목
    <br />
    - 필수: 인솔자 정보(성명, 전화번호, 이메일 주소), 참석자 정보(성명, 성별)
    <br />
    개인정보 보유 기간
    <br />
    - 체험학습 종료 시까지
    <br />
    귀하는 위와 같은 개인정보 수집·이용에 동의하지 않으실 수 있습니다. 단, 수집되는 개인정보는 체험학습 진행을 위한
    필수정보로 미동의 시 체험학습을 신청하실 수 없습니다.
  </>
);

/**
 * TermsAgree 사용 가이드
 *
 * - variant='single': 항목 하나(또는 여러 개)를 전체동의 없이 그대로 나열.
 *   description만 있으면 펼쳐진 안내 텍스트, onShowDetail만 있으면 "내용보기" 버튼만 보여준다.
 * - variant='group' + layout='list': 전체동의 + 체크박스/팝업버튼 목록.
 * - variant='group' + layout='description': 전체동의 + 펼쳐진 안내 텍스트가 달린 항목들.
 */
function GuideTermsAgree() {
  // 1) single + description (전체동의 없이, 안내 텍스트만 펼쳐서 보여줌)
  const [singleDescChecked, setSingleDescChecked] = useState(false);

  // 2) single + 내용보기 버튼만 (안내 텍스트 없음)
  const [singlePopupChecked, setSinglePopupChecked] = useState(false);

  // 3) group + list (전체동의 + 체크박스 목록 + 내용보기 팝업버튼)
  const [listItems, setListItems] = useState([
    { id: 'chk01', label: '홈페이지 이용약관 동의', required: true, checked: false },
    { id: 'chk02', label: '개인정보 수집/이용 동의', required: true, checked: false },
    { id: 'chk03', label: '메일수신에 동의 (다양한 공항철도 정보 제공)', required: false, checked: false },
  ]);
  const listAgreeAll = listItems.every((item) => item.checked);

  // 4) group + description (전체동의 + 펼쳐진 안내 텍스트가 달린 항목들)
  const [descItems, setDescItems] = useState([
    { id: 'desc01', label: '개인정보 수집 및 이용 동의', checked: false, description: fieldTripDesc },
    { id: 'desc02', label: '개인정보 수집 및 이용 동의', checked: false, description: fieldTripDesc },
    { id: 'desc03', label: '개인정보 수집 및 이용 동의', checked: false, description: fieldTripDesc },
  ]);
  const descAgreeAll = descItems.every((item) => item.checked);

  const handleShowDetail = (item) => alert(`"${item.label}" 내용보기 클릭`);

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>TermsAgree Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/forms/TermsAgree.jsx</p>
      </section>

      <section>
        <h4>단일 항목 + 안내 텍스트</h4>
        <TermsAgree
          variant="single"
          items={[
            { id: 'single-desc', label: '개인정보 수집/이용 동의', checked: singleDescChecked, description: personalInfoDesc },
          ]}
          onToggleItem={(id, checked) => setSingleDescChecked(checked)}
        />
      </section>

      <section>
        <h4>단일 항목 + 내용보기 버튼 (안내 텍스트 없음)</h4>
        <TermsAgree
          variant="single"
          items={[
            {
              id: 'single-popup',
              label: '개인정보 수집/이용 동의',
              required: true,
              checked: singlePopupChecked,
              onShowDetail: handleShowDetail,
            },
          ]}
          onToggleItem={(id, checked) => setSinglePopupChecked(checked)}
        />
      </section>

      <section>
        <h4>전체동의 + 목록(체크박스 + 내용보기)</h4>
        <TermsAgree
          variant="group"
          layout="list"
          agreeAll={listAgreeAll}
          items={listItems.map((item) => ({ ...item, onShowDetail: handleShowDetail }))}
          onToggleAll={(checked) => setListItems((prev) => prev.map((item) => ({ ...item, checked })))}
          onToggleItem={(id, checked) =>
            setListItems((prev) => prev.map((item) => (item.id === id ? { ...item, checked } : item)))
          }
          referText="전체 동의에는 필수 및 선택 정보수집에 대한 동의가 포함되어 있으며, 개별적인 동의 선택도 가능합니다. 선택항목에 대한 동의를 거부하시더라도 필수 서비스 이용은 가능합니다."
        />
      </section>

      <section>
        <h4>전체동의 + 펼쳐진 안내 텍스트 목록</h4>
        <TermsAgree
          variant="group"
          layout="description"
          agreeAll={descAgreeAll}
          items={descItems}
          onToggleAll={(checked) => setDescItems((prev) => prev.map((item) => ({ ...item, checked })))}
          onToggleItem={(id, checked) =>
            setDescItems((prev) => prev.map((item) => (item.id === id ? { ...item, checked } : item)))
          }
        />
      </section>
    </div>
  );
}

export default GuideTermsAgree;
