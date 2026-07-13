//컨텐츠

function GuideContents() {
  return (
    <>
      <div class="pubTitH2">
            <h2>열차정보</h2>
        </div>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트 없음 (전역 클래스 마크업을 그대로 사용)</p>

        <div class="pubTitH3">
            <h3>소요시간</h3>
        </div>

        <div class="pubTitH3">
            <h3>예약정보</h3>
            <div class="alignR">
                <button type="button" class="train">열차변경</button>
            </div>
        </div>

        <div class="pubTitH3">
            <h3>승차권</h3>
            <div class="alignR">
                <button type="button" class="change">좌석변경</button>
            </div>
        </div>

        <div class="pubTitH4">
            <h4>이용시간</h4>
        </div>

        <div class="pubText">서울역 도심공항터미널 무료 이용, 열차 지정 좌석제, 객실승무원 서비스 제공, 전동카트 서비스, 무료 와이파이 서비스, 무료 생수(요청 시)</div>
        <p class="pubText varColorBlue">서울역 도심공항터미널 무료 이용, 열차 지정 좌석제, 객실승무원 서비스 제공, 전동카트 서비스, 무료 와이파이 서비스, 무료 생수(요청 시)</p>
        <em class="pubText">서울역 도심공항터미널 무료 이용, 열차 지정 좌석제, 객실승무원 서비스 제공, 전동카트 서비스, 무료 와이파이 서비스, 무료 생수(요청 시)</em>
        <b class="pubText varColorRed">서울역 도심공항터미널 무료 이용, 열차 지정 좌석제, 객실승무원 서비스 제공, 전동카트 서비스, 무료 와이파이 서비스, 무료 생수(요청 시)</b>
        
        <ul class="pubTextList">
            <li class="textListItem">
                <p class="pubText">탑승수속 : 05:20 ~ 19:00 (접수마감 18:50)</p>
            </li>
            <li class="textListItem">
                <p class="pubText">
                    출국심사 : 05:30 ~ 19:00<br/>
                    * 인천공항1터미널 : 항공기 출발 3시간 전 수속완료​<br/>
                    * 인천공항2터미널 : 항공기 출발 3시간 20분 전 수속완료
                </p>
            </li>
            <li class="textListItem">
                <p class="pubText">서울역 도심공항터미널 무료 이용, 열차 지정 좌석제, 객실승무원 서비스 제공, 전동카트 서비스, 무료 와이파이 서비스, 무료 생수(요청 시)</p>
            </li>
        </ul>

        <span class="pubCaption">항공사 전화번호는 변경될 수 있으니 자세한 사항은 항공사 홈페이지를 통해 확인하세요.</span>
        <span class="pubCaption gray">항공사 전화번호는 변경될 수 있으니 자세한 사항은 항공사 홈페이지를 통해 확인하세요.</span>

        <span class="pubRefer">※ 정상운임 : 18,100원(서울역~인천공항1터미널), 18,700원(서울역~인천공항2터미널)</span>
    </>
  );
}
export default GuideContents;