import { useRef, useState } from 'react';
import FormTable from '@/components/common/forms/FormTable';
import FormGroup from '@/components/common/forms/FormGroup';
import FormInput from '@/components/common/forms/FormInput';
import FormCheck from '@/components/common/forms/FormCheck';
import Select from '@/components/common/forms/Select';
import FileAttach from '@/components/common/forms/FileAttach';

// 이 가이드는 docs/html-src/html/common/comTableForm.html(퍼블리싱 마크업)을
// FormTable + 기존 atom 컴포넌트(FormInput/FormGroup/FormCheck/Select/FileAttach)로
// 조합해서 "실제로 동작하는" React 버전으로 옮긴 데모이다.
// 즉 FormTable 자체는 table/caption/colgroup만 그려주는 빈 틀이고,
// 그 안에 들어가는 tr(행)들은 이 화면(부모)이 직접 구성해서 children으로 넘긴다.

// 할인선택 표 중에서 "라디오 + 단순 설명 텍스트"만 있는 행들(어른/어린이/경로/장애인/국가유공자).
// 구조가 똑같이 반복되므로 배열로 정의해두고 아래 JSX에서 .map()으로 한 번에 그린다.
// (반대로 교환번호/할인쿠폰/제휴카드처럼 입력창·버튼이 섞인 행들은 구조가 서로 달라서
//  배열화하지 않고 각각 따로 JSX로 작성했다.)
const simpleDiscountRows = [
  { id: 'dc01', label: '어른', desc: '할인 중복적용 불가' },
  { id: 'dc02', label: '어린이', desc: '탑승일 기준 만 6세 ~ 만 12세' },
  { id: 'dc03', label: '경로', desc: '신분증' },
  {
    id: 'dc04',
    label: '장애인',
    // desc에 줄바꿈(<br/>)이 필요해서 문자열 대신 JSX(Fragment)를 그대로 값으로 넣었다.
    desc: (
      <>
        시·군·구청장 발행 복지카드<br />국가·지방자치단체가 발급한 장애인등록증/장애인증명서
      </>
    ),
  },
  {
    id: 'dc05',
    label: '국가유공자',
    desc: (
      <>
        국가보훈처 발행 유공자증<br />국가보훈처 발행 5.18 민주유공자
      </>
    ),
  },
];

function GuideFormTable() {
  // ===================== 1. 신청서 입력폼 데모용 state =====================
  // 아래 7개는 각각 "신청자명/휴대폰번호/이메일/사업자명/회의명/사용인원/요청사항" 입력값을
  // 그대로 담는 단순 controlled state다. FormInput은 자체 상태를 안 들고 있는 controlled
  // 컴포넌트이므로, 값(value)과 변경 핸들러(onChange)를 부모가 항상 들고 있어야 한다.
  const [applicantName, setApplicantName] = useState('');
  // 휴대폰번호는 3칸(010-1234-5678)으로 나뉘어 있어서 객체 하나({p1,p2,p3})로 관리한다.
  const [phone, setPhone] = useState({ p1: '', p2: '', p3: '' });
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [meetingName, setMeetingName] = useState('');
  const [headcount, setHeadcount] = useState('');
  const [request, setRequest] = useState('');

  // ----- 제출서류(첨부파일) 1: 단일 첨부 + 양식 다운로드 -----
  // GuideFileAttach.jsx와 동일한 패턴. 슬롯은 { id, name } 객체이고,
  // FileAttach는 이 슬롯 배열을 그대로 받아 fileBox를 그려주는 controlled 컴포넌트다.
  const [singleFiles, setSingleFiles] = useState([{ id: 'form-file-single', name: '' }]);
  // 파일을 선택하면 FileAttach가 (슬롯id, FileList)를 넘겨준다.
  // id가 일치하는 슬롯만 찾아서 name을 갱신(나머지 슬롯은 그대로 유지).
  const handleSingleChange = (id, fileList) => {
    const file = fileList?.[0];
    setSingleFiles((prev) => prev.map((f) => (f.id === id ? { ...f, name: file?.name || '' } : f)));
  };
  // 단일 첨부는 슬롯 개수가 항상 1개여야 하므로, 삭제 = 슬롯 제거가 아니라 name만 비우는 "선택 취소".
  const handleSingleDelete = (id) => {
    setSingleFiles((prev) => prev.map((f) => (f.id === id ? { ...f, name: '' } : f)));
  };

  // ----- 제출서류(첨부파일) 2: 다중 첨부 -----
  const [multiFiles, setMultiFiles] = useState([{ id: 'form-file-multi-1', name: '' }]);
  // 새 슬롯 id 발급용 카운터.
  // ⚠ 주의: id를 prev.length+1처럼 "현재 배열 길이"로 만들면 안 된다.
  //   예) 슬롯이 [1,2]인 상태에서 1번을 삭제하면 배열은 [2] (length=1)가 되고,
  //       이후 추가 버튼을 누르면 length+1=2 → 이미 있는 'multi-2'와 id가 충돌해서
  //       React가 두 슬롯을 같은 row로 취급해버리는 버그가 생긴다(GuideFileAttach.jsx에서
  //       실제로 겪은 문제). 그래서 배열 길이와 무관하게 계속 증가만 하는 ref 카운터를 쓴다.
  const nextMultiIdRef = useRef(2);
  const handleMultiChange = (id, fileList) => {
    const file = fileList?.[0];
    setMultiFiles((prev) => prev.map((f) => (f.id === id ? { ...f, name: file?.name || '' } : f)));
  };
  // 다중 첨부는 삭제 시 슬롯 자체를 배열에서 제거한다.
  // 단, 마지막 슬롯까지 지워버리면 첨부할 방법이 없어지므로 그 경우엔 빈 슬롯 하나를 다시 채운다.
  const handleMultiDelete = (id) => {
    setMultiFiles((prev) => {
      const next = prev.filter((f) => f.id !== id);
      return next.length > 0 ? next : [{ id: 'form-file-multi-1', name: '' }];
    });
  };
  // "첨부파일 추가" 버튼(FileAttach의 onAddFile)을 누르면 호출됨.
  // 위에서 만든 카운터로 고유 id를 뽑아 슬롯 배열 끝에 빈 슬롯 하나를 추가한다.
  const handleMultiAdd = () => {
    const id = `form-file-multi-${nextMultiIdRef.current++}`;
    setMultiFiles((prev) => [...prev, { id, name: '' }]);
  };

  // ===================== 2. 할인선택 데모용 state =====================
  // html 원본을 보면 모든 라디오(dc01~dc11)가 name="discount"로 같은 그룹이다.
  // 즉 "할인 종류는 한 번에 하나만 선택 가능"하므로, 선택값 하나(discountValue)로 전체를 관리한다.
  const [discountValue, setDiscountValue] = useState('dc02');

  // 교환번호(dc06/dc07) 행: html에는 "인증 전(dc06)"과 "인증 후(dc07)"가 별도의 두 행으로
  // 정적으로 그려져 있었지만, React에서는 정적으로 두 행을 복제하는 대신
  // state로 "인증 여부"를 토글하는 한 행으로 합쳤다(아래 handleExchangeToggle 참고).
  const [exchangeCode, setExchangeCode] = useState('');
  const [exchangeVerified, setExchangeVerified] = useState(false);

  // 할인쿠폰(회원) 행: select에서 "직접 입력"을 고르면 교환번호 입력칸이 추가로 펼쳐진다.
  // (html 주석 "직접 입력 선택시 표출 그 외 항상 숨김 처리"를 그대로 구현한 부분)
  const [memberCouponOption, setMemberCouponOption] = useState('');
  const [memberCouponCode, setMemberCouponCode] = useState('');

  // 할인쿠폰(비회원) 행: 입력 + 인증 버튼만 있는 단순한 형태.
  const [couponCode, setCouponCode] = useState('');

  // 제휴카드(dc10/dc11) 행도 교환번호와 마찬가지로 "등록 전/후" 두 정적 행을
  // state 토글 한 행으로 합쳤다. 등록 전엔 "제휴카드 정보 입력" 버튼만 보이고,
  // 등록 후엔 카드번호 입력창 + 취소 버튼이 보인다.
  const [affCardRegistered, setAffCardRegistered] = useState(false);
  const [cardNumber, setCardNumber] = useState('');

  // 교환번호 인증/취소 버튼 클릭 핸들러.
  // 인증 안 된 상태 → 인증 처리(입력값 그대로 두고 잠금).
  // 인증된 상태 → 취소 처리(입력값 비우고 다시 입력 가능하게).
  const handleExchangeToggle = () => {
    if (exchangeVerified) {
      setExchangeVerified(false);
      setExchangeCode('');
    } else {
      setExchangeVerified(true);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>Form Table Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/forms/FormTable.jsx, src/components/common/forms/FormGroup.jsx, src/components/common/forms/FormInput.jsx, src/components/common/forms/FormCheck.jsx, src/components/common/forms/Select.jsx, src/components/common/forms/FileAttach.jsx</p>
      </section>

      {/* ===================== 표 1: 신청서 입력폼 ===================== */}
      <section>
        <h4>신청서 입력폼</h4>
        {/* FormTable은 <div class="comTableForm"><table class="formTable">...</table></div> 틀만 그려준다.
            caption은 스크린리더용 표 설명(원본 html의 <caption> 그대로),
            colWidths는 <colgroup><col style="width:..."></colgroup>에 들어갈 너비 배열이다.
            실제 행(tr)들은 children으로 그대로 전달한다. */}
        <FormTable
          caption="신청자명, 휴대폰번호, 이메일, 사업자명, 회의명, 사용인원, 요청사항, 결제총금액을 포함한 표"
          colWidths={['240px', 'auto']}
        >
          {/* 신청자명: required 표시(*) + FormGroup 안에 FormInput 하나 */}
          <tr>
            <th><span className="required">*</span>신청자명</th>
            <td>
              <FormGroup>
                <FormInput
                  className="frmMd"
                  title="신청자명 입력"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                />
              </FormGroup>
            </td>
          </tr>

          {/* 휴대폰번호: FormGroup 하나에 FormInput 3개 + 구분용 '-' 텍스트를 나란히 배치.
              FormGroup은 children을 그냥 한 줄(frmGroupRow)로 감싸주기 때문에,
              FormInput이 아닌 일반 <span>도 형제로 같이 넣을 수 있다. */}
          <tr>
            <th><span className="required">*</span>휴대폰 번호</th>
            <td>
              <FormGroup>
                <FormInput
                  className="frmTini"
                  title="휴대폰번호 첫번째 세자리"
                  value={phone.p1}
                  onChange={(e) => setPhone((prev) => ({ ...prev, p1: e.target.value }))}
                />
                <span>-</span>
                <FormInput
                  className="frmTini"
                  title="휴대폰번호 두번째 세자리 또는 네자리"
                  value={phone.p2}
                  onChange={(e) => setPhone((prev) => ({ ...prev, p2: e.target.value }))}
                />
                <span>-</span>
                <FormInput
                  className="frmTini"
                  title="휴대폰번호 마지막 네자리"
                  value={phone.p3}
                  onChange={(e) => setPhone((prev) => ({ ...prev, p3: e.target.value }))}
                />
              </FormGroup>
              {/* pubInfoText: 전역 스타일(공통 안내문구) 클래스. varColorRed로 강조색 적용 */}
              <em className="pubInfoText varColorRed">
                ※ 회의 당일 30분전 도어락 비밀번호 4자리가 발송되어니 실제 이용자의 휴대전화번호를 필히 입력하시기 바랍니다.
              </em>
            </td>
          </tr>

          {/* 이메일: 신청자명과 동일한 패턴(FormGroup + FormInput 1개) */}
          <tr>
            <th><span className="required">*</span>이메일</th>
            <td>
              <FormGroup>
                <FormInput
                  className="frmMd"
                  title="이메일주소 입력"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
            </td>
          </tr>

          {/* 사업자명: 입력창 아래에 안내문구(pubInfoText)가 추가로 붙는 패턴 */}
          <tr>
            <th><span className="required">*</span>사업자명</th>
            <td>
              <FormGroup>
                <FormInput
                  className="frmMd"
                  title="사업자명 입력"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </FormGroup>
              <div className="pubInfoText">※ 회의실 입구 디지털 사이니지 안내용</div>
            </td>
          </tr>

          {/* 회의명: 사업자명과 동일한 패턴 */}
          <tr>
            <th><span className="required">*</span>회의명</th>
            <td>
              <FormGroup>
                <FormInput
                  className="frmMd"
                  title="회의명 입력"
                  value={meetingName}
                  onChange={(e) => setMeetingName(e.target.value)}
                />
              </FormGroup>
              <div className="pubInfoText">※ 회의실 입구 디지털 사이니지 안내용</div>
            </td>
          </tr>

          {/* 사용인원: FormInput + 단위 텍스트('명')를 같은 FormGroup 줄에 배치 */}
          <tr>
            <th><span className="required">*</span>사용인원</th>
            <td>
              <FormGroup>
                <FormInput
                  className="frmTini"
                  title="사용예정 인원 입력"
                  value={headcount}
                  onChange={(e) => setHeadcount(e.target.value)}
                />
                <span className="mR32">명</span>
              </FormGroup>
              <div className="pubInfoText">※ 최대 00명</div>
            </td>
          </tr>

          {/* 요청사항: textarea(iptTextArea)는 따로 atom 컴포넌트가 없어서
              그냥 일반 HTML textarea에 전역 클래스만 붙여서 controlled로 직접 사용했다. */}
          <tr>
            <th>요청사항</th>
            <td>
              <textarea
                className="iptTextArea"
                placeholder="요청 사항을 입력해 주세요."
                title="요청사항 입력"
                value={request}
                onChange={(e) => setRequest(e.target.value)}
              />
            </td>
          </tr>

          {/* 제출서류 1: 단일 첨부 + 양식 다운로드 링크(downloadHref/downloadLabel) */}
          <tr>
            <th>제출서류</th>
            <td>
              <FileAttach
                files={singleFiles}
                onFileChange={handleSingleChange}
                onFileDelete={handleSingleDelete}
                downloadHref="/files/sample-form.xlsx"
                downloadLabel="참가자 양식 다운로드"
              />
            </td>
          </tr>

          {/* 제출서류 2: 다중 첨부(multiple) + 용량 안내 문구(infoText).
              multiple일 때만 FileAttach 내부에서 마지막 슬롯에 "첨부파일 추가" 버튼이 노출된다. */}
          <tr>
            <th>제출서류</th>
            <td>
              <FileAttach
                files={multiFiles}
                multiple
                onFileChange={handleMultiChange}
                onFileDelete={handleMultiDelete}
                onAddFile={handleMultiAdd}
                infoText="* 용량제한 5MB"
              />
            </td>
          </tr>
        </FormTable>
      </section>

      {/* ===================== 표 2: 할인선택 ===================== */}
      <section>
        <h4>할인선택</h4>
        <FormTable
          caption="할인선택_어른(할인없음), 어린이, 경로, 장애인, 국가유공자, 교환번호, 할인쿠폰(회원), 할인쿠폰, 제휴카드로 구성된 표"
          colWidths={['200px', 'auto']}
        >
          {/* 구조가 동일한 단순 설명형 행들(어른/어린이/경로/장애인/국가유공자)은
              위에서 만든 simpleDiscountRows 배열을 .map()으로 돌려서 한 번에 그린다.
              FormCheck를 options 없이 단일 모드로 쓰면 라디오 1개 + 라벨만 렌더링된다. */}
          {simpleDiscountRows.map((row) => (
            <tr key={row.id}>
              <th className="left">
                <FormCheck
                  type="radio"
                  id={row.id}
                  name="discount"
                  label={row.label}
                  checked={discountValue === row.id}
                  onChange={() => setDiscountValue(row.id)}
                />
              </th>
              <td className="left">{row.desc}</td>
            </tr>
          ))}

          {/* 교환번호: 라디오 + (입력창 + 인증/취소 버튼).
              html 원본은 "인증 전" 행과 "인증 후" 행이 따로 있었지만,
              여기서는 exchangeVerified state로 같은 행에서 토글되도록 구현했다.
              - disabled={exchangeVerified}: 인증되면 입력 잠금
              - 버튼 텍스트/동작: handleExchangeToggle이 인증↔취소를 토글 */}
          <tr>
            <th className="left">
              <FormCheck
                type="radio"
                id="dc06"
                name="discount"
                label="교환번호"
                checked={discountValue === 'dc06'}
                onChange={() => setDiscountValue('dc06')}
              />
            </th>
            <td className="left">
              <FormGroup>
                <FormInput
                  title="교환번호"
                  placeholder="교환번호 13자리를 입력해 주세요."
                  value={exchangeCode}
                  onChange={(e) => setExchangeCode(e.target.value)}
                  disabled={exchangeVerified}
                />
                {/* fncBtn은 공통 Button 컴포넌트(btn 클래스 체계)와는 다른,
                    이 표 전용 버튼 스타일(_table.scss)이라서 Button 컴포넌트를 쓰지 않고
                    원본 html처럼 일반 <button className="fncBtn">을 그대로 사용했다. */}
                <button type="button" className="fncBtn" onClick={handleExchangeToggle}>
                  {exchangeVerified ? '취소' : '인증'}
                </button>
              </FormGroup>
            </td>
          </tr>

          {/* 할인쿠폰(회원): Select로 쿠폰을 고르고, "직접 입력"을 선택했을 때만
              아래 FormGroup(입력창+인증버튼)이 조건부로 나타난다.
              &&를 이용한 조건부 렌더링: memberCouponOption이 'direct'가 아니면
              오른쪽 JSX 전체가 그려지지 않는다(html의 display:none과 동일한 효과를
              실제 DOM에서 아예 안 그리는 방식으로 구현). */}
          <tr>
            <th className="left">
              <FormCheck
                type="radio"
                id="dc08"
                name="discount"
                label="할인쿠폰(회원)"
                checked={discountValue === 'dc08'}
                onChange={() => setDiscountValue('dc08')}
              />
            </th>
            <td className="left">
              <FormGroup>
                <Select
                  title="쿠폰 선택"
                  placeholder="쿠폰 선택"
                  value={memberCouponOption}
                  onChange={(e) => setMemberCouponOption(e.target.value)}
                  options={[
                    { value: 'opt1', label: '옵션1' },
                    { value: 'direct', label: '직접 입력' },
                  ]}
                />
              </FormGroup>
              {/* 직접 입력 선택시에만 교환번호 입력 영역 표출 */}
              {memberCouponOption === 'direct' && (
                <FormGroup>
                  <FormInput
                    title="교환번호"
                    placeholder="교환번호 8자리를 입력해 주세요."
                    value={memberCouponCode}
                    onChange={(e) => setMemberCouponCode(e.target.value)}
                  />
                  <button type="button" className="fncBtn">인증</button>
                </FormGroup>
              )}
            </td>
          </tr>

          {/* 할인쿠폰(비회원): 별도 select 없이 입력창 + 인증 버튼만 있는 가장 단순한 형태 */}
          <tr>
            <th className="left">
              <FormCheck
                type="radio"
                id="dc09"
                name="discount"
                label="할인쿠폰"
                checked={discountValue === 'dc09'}
                onChange={() => setDiscountValue('dc09')}
              />
            </th>
            <td className="left">
              <FormGroup>
                <FormInput
                  title="교환번호"
                  placeholder="교환번호 8자리를 입력해 주세요."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button type="button" className="fncBtn">인증</button>
              </FormGroup>
            </td>
          </tr>

          {/* 제휴카드: th 안에 라디오 + "제휴카드목록"(affList) 버튼이 같이 들어간다.
              td는 affCardRegistered state에 따라 두 가지 모습 중 하나를 보여준다.
              - false: "제휴카드 정보 입력" 버튼만 (등록 전)
              - true : 카드번호 입력창 + 취소 버튼 (등록 후)
              html에서는 이 두 상태가 dc10/dc11이라는 별개의 두 행으로 정적으로
              그려져 있었지만, 실제 동작하는 컴포넌트로 옮기면서 하나의 행 + 토글로 합쳤다. */}
          <tr>
            <th className="left">
              <FormCheck
                type="radio"
                id="dc10"
                name="discount"
                label="제휴카드"
                checked={discountValue === 'dc10'}
                onChange={() => setDiscountValue('dc10')}
              />
              <button type="button" className="affList" title="새 창 열림">제휴카드목록</button>
            </th>
            <td className="left">
              {/* 제휴카드 등록 전/후 상태를 하나의 행에서 토글로 표현 */}
              {affCardRegistered ? (
                <FormGroup>
                  <FormInput
                    title="카드번호"
                    placeholder="000-****-****-0000 (MM/YY)"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <button
                    type="button"
                    className="fncBtn"
                    onClick={() => {
                      setAffCardRegistered(false);
                      setCardNumber('');
                    }}
                  >
                    취소
                  </button>
                </FormGroup>
              ) : (
                <FormGroup>
                  {/* affCardInfo도 fncBtn처럼 이 표 전용 버튼 클래스라 Button 컴포넌트 대신
                      원본 마크업 그대로 일반 button을 사용했다. */}
                  <button type="button" className="affCardInfo" onClick={() => setAffCardRegistered(true)}>
                    제휴카드 정보 입력
                  </button>
                </FormGroup>
              )}
            </td>
          </tr>
        </FormTable>
      </section>
    </div>
  );
}

export default GuideFormTable;
