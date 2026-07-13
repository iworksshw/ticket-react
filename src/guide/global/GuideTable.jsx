//테이블

function GuideTable() {
  return (
    <>
      <h3>Table Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트 없음 (전역 클래스 마크업을 그대로 사용)</p>

      <div className="comTableBasic">
        <div className="tableHeader">
          <p className="date">2025-08-23 (토)</p>
          <p className="count">예약 완료 수<span className="deco">/</span><span className="use">총 이용 수</span></p>
        </div>
        <table className="basic">
          <caption>승차권 좌석 변경 전과 변경 후를 포함한 표</caption>
          <colgroup>
            <col style={{ width: 'auto' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
          <thead>
            <tr>
              <th>변경 전</th>
              <th>변경 후</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2호차 8A</td>
              <td>2호차 8A</td>
            </tr>
            <tr>
              <td>2호차 8B</td>
              <td>2호차 8B</td>
            </tr>
            <tr>
              <td>2호차 8C</td>
              <td>2호차 9C</td>
            </tr>
            <tr>
              <td>2호차 8D</td>
              <td>2호차 9D</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default GuideTable;
