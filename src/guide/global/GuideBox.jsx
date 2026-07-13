// 이 가이드는 docs/html-src/html/common/comTicketBox.html 마크업을 그대로 옮긴 것이다.
// 클래스(comTicketBox, boxArea, boxHeader, boxTitle, boxList, item 등)가 전부
// src/styles/etc/_box.scss에 전역으로 정의되어 있어서, 별도의 React atom 컴포넌트 없이
// 마크업 구조만 그대로 옮기고 className을 문자열로 직접 사용한다.

function GuideBox() {
  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>Ticket Box Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트 없음 (전역 클래스 마크업을 그대로 사용)</p>
      </section>

      <section>
        <h4>기본형 - 승차권예약 + 열차 탑승</h4>
        <div className="comTicketBox">
          <div className="boxArea">
            <div className="boxHeader"><h4>이용안내</h4></div>
            <div className="boxTitle">승차권예약</div>
            <ul className="boxList">
              <li className="item">승차권 예약은 <em>출발 20분 전까지 가능</em>하며, <em>예약 후 20분 이내 결제</em>가 필요합니다. (최대 60일 이내 예약 가능)</li>
              <li className="item">어른, 어린이를 포함하여 총 12명까지 예약이 가능합니다.</li>
              <li className="item">유아가 1인을 초과하거나 좌석이 필요한 경우 어린이로 승차권 구매하셔야 합니다.</li>
              <li className="item"><em>휠체어 좌석은 현장구매</em>만 가능합니다.</li>
            </ul>
            <div className="boxTitle">열차 탑승</div>
            <ul className="boxList">
              <li className="item">직통열차 출발 30분 전부터 게이트 진입이 가능하며, <em>출발시각 3분 전까지</em> 직통열차 승강장에 도착하셔야 합니다.</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h4>기본형 - 승차권예약 + 승차권 반환/변경</h4>
        <div className="comTicketBox">
          <div className="boxArea">
            <div className="boxHeader"><h4>이용안내</h4></div>
            <div className="boxTitle">승차권예약</div>
            <ul className="boxList">
              <li className="item">승차권은 <em>열차 출발 5분 전까지 구매</em>할 수 있습니다.</li>
              <li className="item"><em>인쇄한 승차권 또는 모바일 QR승차권</em>을 소지하여야 직통열차를 탑승할 수 있습니다.</li>
              <li className="item">직통열차 여객은 안전한 열차이용을 위하여 <em>출발시각 3분 전까지 직통열차 승강장에 도착</em>하여야 합니다.</li>
              <li className="item">자세한 내용은 당사 여객운송약관을 참고하시기 바랍니다.</li>
            </ul>
            <div className="boxTitle">승차권 반환/변경</div>
            <ul className="boxList">
              <li className="item">승차권 변경은 3회까지만 가능하며, 1회 변경에 한하여 수수료를 면제합니다.(변경 수수료는 열차 출발 당일 2회 이상 변경하는 경우에 한하여 발생)</li>
              <li className="item">승차권 확인번호(숫자 6자리) 분실 시 이메일로 전송된 승차권 예약내역의 변경링크를 통해 승차권 확인번호를 변경할 수 있습니다.</li>
              <li className="item"><a href="#" className="line">승차권 반환(환불) 수수료 정책</a></li>
              <li className="item"><a href="#" className="line">승차권 변경 수수료 정책</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h4>type02</h4>
        <div className="comTicketBox type02">
          <div className="boxArea">
            <ul className="boxList">
              <li className="item">교환번호, 제휴카드 <em>쿠폰</em> 등의 할인 적용 시 해당좌석은 "어른"으로 변경됩니다.</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h4>type03</h4>
        <div className="comTicketBox type03">
          <div className="boxArea">
            <ul className="boxList">
              <li className="item">1) 열차 내 수령 가능합니다.</li>
              <li className="item">2) 즉시 사용 가능합니다. (5천원 충전 포함)</li>
              <li className="item">3) 신용카드로 구입 가능합니다. (타 판매처는 현금 결제 및 충전 별도)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GuideBox;
