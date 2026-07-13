import React from 'react';
import Select from '@/components/common/forms/Select';
import Button from '@/components/common/forms/Button';
import styles from './GroupTop.module.scss';

//ui components : comGroupTop

const searchOptions = [
  { label: '전체', value: '' },
  { label: '제목', value: 'title' },
  { label: '내용', value: 'content' },
  { label: '제목 + 내용', value: 'all' },
];

const GroupTop = ({
  // 전체 게시물 수(예: "전체 123 건")를 표시할 때 사용하는 값
  total = 0,

  // 현재 선택된 검색 분류값(예: 'title', 'content' - value 값) - 초기값은 '전체'로 설정
  searchType = '',

  // 입력 중인 검색어 값
  searchKeyword = '',

  // 검색 분류(select) 값이 변경될 때 호출되는 콜백
  onSearchTypeChange,

  // 검색어(input) 값이 변경될 때 호출되는 콜백
  onSearchKeywordChange,

  // 검색 버튼 클릭 또는 엔터 제출 시 실행되는 콜백
  onSearch,

  // 추가로 적용할 className
  className = '',
}) => {
  // form의 기본 제출 동작(새로고침)을 막고, 현재 searchType/searchKeyword 값을
  // onSearch 콜백으로 부모에게 전달한다. 이 컴포넌트는 값을 직접 들고 있지 않고
  // searchType/searchKeyword를 props로만 받는 "controlled component" 방식이라서
  // 실제 상태 변경은 항상 부모(state)가 책임진다.
  const handleSubmit = (event) => {
    event.preventDefault();
    // 현재 searchType, searchKeyword 상태를 부모로 전달
    onSearch?.(searchType, searchKeyword);
  };

  return (
    // comGroupTop: 이 컴포넌트 전용 스타일(GroupTop.module.scss)이라 styles.xxx로 연결.
    // className prop으로 외부에서 추가 클래스를 덧붙일 수 있게 열어둠.
    <div className={`${styles.comGroupTop} ${className}`.trim()}>
      <div className={styles.alignL}>
        <div className={styles.unit}>
          <span className={styles.text}>
            전체 <span className={styles.total}>{total}</span> 건
          </span>
        </div>
      </div>
      <div className={styles.alignR}>
        <ul className={styles.opList}>
          {/* 검색 분류 select - li.item은 이 컴포넌트 전용 클래스라 styles.item 사용 */}
          <li className={styles.item}>
            {/* frmGroup/frmBox는 _form.scss에 정의된 전역 공통 클래스이므로
                styles.xxx가 아니라 문자열 그대로 사용한다(여러 화면에서 공유되는 폼 레이아웃). */}
            <div className="frmGroup">
              <div className="frmBox">
                <Select
                  title="검색 분류"
                  value={searchType} // 현재 선택값을 그대로 보여줌(controlled)
                  onChange={(event) => onSearchTypeChange?.(event.target.value)} // 값이 바뀌면 부모에 알림
                  options={searchOptions}
                  placeholder=""
                />
              </div>
            </div>
          </li>
          {/* 검색어 입력 + 검색 버튼 */}
          <li className={styles.item}>
            <div className="frmGroup">
              {/* frmSearch/iptText/btnSearch도 전역 폼 클래스라서 동일하게 문자열 className 사용 */}
              <form className="frmSearch" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="iptText"
                  placeholder="검색어를 입력해주세요."
                  title="검색어 입력"
                  value={searchKeyword} // controlled input: value를 props로만 받아 그대로 표시
                  onChange={(event) => onSearchKeywordChange?.(event.target.value)} // 타이핑마다 부모에 알림
                />
                {/* type="submit"이라 버튼 클릭 시 form의 onSubmit(handleSubmit)이 실행됨 */}
                <button type="submit" className="btnSearch">검색</button>
              </form>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GroupTop;
