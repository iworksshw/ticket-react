import Popup from '@/components/module/Popup';

// docs/html-dist/html/menu01/page_01_01_03_pop01.html 참고
// comTableBasic(표)은 전역 클래스 마크업만 있고 별도 리액트 컴포넌트가 없어서(GuideTable.jsx와 동일),
// html 원본 그대로 옮겨서 사용한다.

/**
 * 승차권 변경 수수료 정책 팝업 (trainSelection 페이지의 안내 링크에서 연다)
 * @param {boolean} isOpen
 * @param {function} onClose
 */
function TicketChangeFeePage({ isOpen, onClose }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} size="md" title="승차권 변경 수수료 정책">
      <div className="pubTitH4">
        <h4>출발 전</h4>
      </div>
      <div className="comTableBasic">
        <table className="basic">
          <caption>승차권 변경 수수료 정책 출발 전_구분, 1회 변경, 2회 이상 변경으로 구성 된 표</caption>
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>구분</th>
              <th>1회 변경</th>
              <th>2회 이상 변경</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>현장</td>
              <td>무료</td>
              <td>1,000원</td>
            </tr>
            <tr>
              <td>온라인</td>
              <td>무료</td>
              <td>1,000원</td>
            </tr>
          </tbody>
        </table>
      </div>
      <span className="pubCaption">항공사 전화번호는 변경될 수 있으니 자세한 사항은 항공사 홈페이지를 통해 확인하세요.</span>

      <div className="pubTitH4">
        <h4>출발 후</h4>
      </div>
      <div className="comTableBasic">
        <table className="basic">
          <caption>승차권 변경 수수료 정책 출발 후_구분, 1회 변경, 2회 이상 변경으로 구성 된 표</caption>
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>구분</th>
              <th>출발 후</th>
              <th>도착 후</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>현장</td>
              <td>3,400원</td>
              <td>불가</td>
            </tr>
            <tr>
              <td>온라인</td>
              <td>불가</td>
              <td>불가</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Popup>
  );
}

export default TicketChangeFeePage;
