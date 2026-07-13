import React from 'react';

//ui components : comTableForm
/**
 * 공통 테이블형 폼 컴포넌트 (comTableForm + formTable + caption + colgroup + tbody를 감싸는 틀)
 * 실제 행(tr/th/td) 내용은 FormInput, FormGroup, FormCheck, Select, FileAttach 등을 조합해 children으로 넘긴다.
 * @param {string} caption - 테이블 캡션 (스크린리더용 표 설명)
 * @param {Array<string>} colWidths - colgroup의 각 col width 값 배열 (예: ['240px', 'auto'])
 * @param {node} children - tbody 안에 들어갈 tr 목록
 * @param {string} className - 추가적인 커스텀 클래스
 */
// 이 컴포넌트는 "틀(wrapper)"만 담당한다 — 다른 atom 컴포넌트(Button, FormInput 등)와 달리
// FormTable은 표 안에 실제로 무엇이 들어가는지는 전혀 모른다.
// table/caption/colgroup/tbody라는 뼈대만 그려주고, "행이 몇 개인지, 각 행에 무엇이 들어가는지"는
// 전부 이 컴포넌트를 사용하는 쪽(예: GuideFormTable.jsx)이 children(tr들)으로 결정한다.
// 그래서 props도 4개뿐이고 내부에 상태(useState)가 하나도 없다 — 완전히 stateless한 wrapper다.
const FormTable = ({
  caption,
  colWidths = [], // 기본값 []: colWidths를 안 넘기면 colgroup 자체를 그리지 않음(아래 22번째 줄 조건)
  children,
  className = "",
}) => {
  return (
    // comTableForm: 표 전체를 감싸는 전역 클래스(scss/common/_comTableForm.scss).
    // className prop으로 외부에서 추가 스타일을 덧붙일 수 있게 열어둠(Button.jsx와 동일한 패턴).
    <div className={`comTableForm ${className}`.trim()}>
      <table className="formTable">
        {/* caption이 안 주어지면(undefined/'') <caption> 태그 자체를 렌더링하지 않는다.
            caption은 화면에는 보통 숨겨지고 스크린리더가 "이 표가 무엇에 대한 표인지" 읽어주는 용도. */}
        {caption && <caption>{caption}</caption>}

        {/* colWidths 배열을 받아서 <col style="width:..."> 목록을 동적으로 생성한다.
            예) colWidths={['240px', 'auto']}
              → <colgroup><col style="width:240px"><col style="width:auto"></colgroup>
            배열이 비어있으면(기본값) colgroup을 아예 생성하지 않는다(표 너비를 CSS가 알아서 처리하게 둠).
            key는 col 순서가 바뀌지 않는 고정 배열이라 index를 써도 안전하다. */}
        {colWidths.length > 0 && (
          <colgroup>
            {colWidths.map((width, index) => (
              <col key={index} style={{ width }} />
            ))}
          </colgroup>
        )}

        {/* 실제 행(tr) 내용은 모두 children으로 그대로 전달받아 tbody 안에 그린다.
            FormTable은 그 tr 안에 th/td가 몇 개인지, FormInput을 쓰는지 FileAttach를 쓰는지 전혀 신경 쓰지 않는다 —
            그래야 신청서 폼 표든 라디오 선택 표든 같은 FormTable로 감쌀 수 있다. */}
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default FormTable;
