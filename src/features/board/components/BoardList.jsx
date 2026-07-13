import React from 'react';
import styles from './BoardList.module.scss';

//ui components : comBoardList

const BoardList = ({
  //@param {Array} columns - 컬럼 설정 [{ label: '번호', width: '9%', key: 'no' }, ...]
  //@param {Array} items - 표시할 데이터 배열
  // 게시글 목록 데이터 배열 - { no, title, date, view, onClick }
  items = [],
  columns = [],
}) => {
  // item.onClick이 있으면 SPA 라우팅으로 위임(preventDefault 후 콜백 실행)하고,
  // 없으면 href로 실제 이동하게 그대로 둔다.
  const handleTitleClick = (event, item) => {
    if (!item.onClick) return;
    event.preventDefault();
    item.onClick(item);
  };

  return (
    <div className={styles.comBoardList}>
      <table>
        <caption>게시판 테이블 표</caption>

        {/* columns 배열 순서대로 <col>을 생성해서 각 컬럼의 너비를 지정한다.
            width가 없으면 'auto'로 두어 제목 컬럼처럼 남는 공간을 차지하게 한다. */}
        <colgroup>
          {columns.map((col, index) => (
            <col key={index} style={{ width: col.width || 'auto' }} />
          ))}
        </colgroup>

        {/* columns 배열을 그대로 헤더로 매핑한다.
            즉 columns에 컬럼을 추가/삭제하면 표 헤더도 자동으로 같이 바뀐다. */}
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} scope="col">{col.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {/* items가 비어있으면 "데이터가 없습니다" 한 줄을 보여주고,
              데이터가 있으면 행(row)을 하나씩 그린다. */}
          {items.length > 0 ? (
            items.map((item, rowIndex) => (
              // key는 가능하면 고유한 no(게시글 번호)를 쓰고, 없으면 배열 인덱스로 대체
              <tr key={item.no ?? rowIndex}>
                {columns.map((col, colIndex) => {
                  // col.key(예: 'bdType', 'bdTitle', 'date')로 item에서 실제 표시할 값을 꺼낸다.
                  const cellData = item[col.key];

                  // 번호 컬럼(bdType)은 다른 컬럼과 다르게 <th> + <span class="listType">로 감싸서 표시한다.
                  // (디자인 마크업이 번호 셀만 th + span 구조로 되어 있기 때문)
                  if (col.key === 'bdType') {
                    return (
                      <th key={colIndex} className={styles.bdType}>
                        <span className={styles.listType}>
                            {cellData}
                        </span>
                      </th>
                    );
                  }

                  // 제목 컬럼(bdTitle)은 클릭 가능한 링크 구조(div.link > div.title > a)로 표시한다.
                  // 클릭하면 item.onClick(있을 경우)에 현재 item을 전달해 부모가 처리하도록 위임한다.
                  if (col.key === 'bdTitle') {
                    return (
                      <td key={colIndex} className={styles.bdTitle}>
                        <div className={styles.link}>
                          <div className={styles.title}>
                            <a href={item.href || '#'} onClick={(event) => handleTitleClick(event, item)}>
                                {cellData}
                            </a>
                          </div>
                        </div>
                      </td>
                    );
                  }

                  // 그 외 일반 컬럼(작성자/날짜/조회수 등)은 평범한 <td>로 값만 출력한다.
                  // className은 col.key와 같은 이름의 모듈 클래스가 있으면 적용하고, 없으면 빈 문자열.
                  return (
                    <td key={colIndex} className={styles[col.key] || ''}>
                      {cellData}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className={styles.noData}>
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BoardList;
