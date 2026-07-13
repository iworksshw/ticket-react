# 로그인 상태처리 : contexts
/src/contexts/AuthContext.jsx | 실제 로그인 상태 저장/유지 로직

//pages/auth/LoginPage.jsx — 실제 로그인 폼(Join 컴포넌트)에서 아이디/비밀번호가 맞았을 때(onLogin) login({ id, rememberId })을 호출해서 로그인 상태로 전환하는 지점.
//components/layout/Gnb.jsx — useAuth()로 isLoggedIn을 읽어서 로그인/회원가입 ↔ 회원님 반갑습니다/로그아웃 UI를 분기하는 소비 지점.


# 티켓예약관련 폴더 : tickets
{workJsx} = /src/pages/tickets/TicketSearchPage.jsx       {url} : /tickets/TicketSearch/   | 승차권 > 승차권 예약 | 열차조회 및 결과     {htmlFile} = /docs/html-dist/html/menu01/page_01_01_01~02.html, page_01_01_01_pop01~04.html
{workJsx} = /src/pages/tickets/TicketAuthPage.jsx         {url} : /tickets/TicketAuth/     | 승차권 > 승차권 예약 | 회원/비회원 예약선택 {htmlFile} = /docs/html-dist/html/menu01/page_01_01_02.html
{workJsx} = /src/pages/tickets/TrainSelectionPage.jsx     {url} : /tickets/TrainSelection/ | 승차권 > 승차권 예약 | 승차권 예약 상세     {htmlFile} = /docs/html-dist/html/menu01/page_01_01_03.html
{workJsx} = /src/pages/tickets/TicketSeatChangePage.jsx   {url} : 팝업이라 url 없음         | 승차권 > 승차권 예약 | 좌석변경 팝업        {htmlFile} = /docs/html-dist/html/menu01/page_01_01_03_pop05.html


# 회원관련 폴더 : auth
{workJsx} = /src/pages/auth/LoginPage.jsx                {url} : /tickets/ticketAuth/ | 로그인 | 로그인                              {htmlFile} = /docs/html-dist/html/menu01/page_01_01_02.html
{workJsx} = /src/pages/auth/JoinTermsPage.jsx            {url} : /auth/joinTermsPage/ | 회원가입 |  약관동의                         {htmlFile} = /docs/html-dist//html/menu07/page_07_01_01.html
{workJsx} = /src/pages/auth/JoinEmailAuthPage.jsx        {url} : /auth/joinEmailAuth/ | 회원가입 |  이메일 인증                      {htmlFile} = /docs/html-dist/html/menu07/page_07_01_02.html
{workJsx} = /src/pages/auth/JoinHistoryStatusPage.jsx    {url} : /auth/joinHistoryStatus/ | 회원가입 |  이메일 인증 후 실적 확인 페이지   {htmlFile} = /docs/html-dist/html/menu07/page_07_01_07.html
{workJsx} = /src/pages/auth/JoinIdConfirmPage.jsx        {url} : /auth/joinIdConfirmPage/ | 회원가입 |  회원ID 확인                      {htmlFile} = /docs/html-dist/html/menu07/page_07_01_04.html
{workJsx} = /src/pages/auth/JoinRequiredInfoPage.jsx     {url} : /auth/joinRequiredInfo/ | 회원가입 |  필수정보 입력                    {htmlFile} = /docs/html-dist/html/menu07/page_07_01_05.html
{workJsx} = /src/pages/auth/JoinOptionalInfoPage.jsx     {url} : /auth/joinOptionalInfo/ | 회원가입 |  선택정보 입력                    {htmlFile} = /docs/html-dist/html/menu07/page_07_01_06.html
{workJsx} = /src/pages/auth/JoinCompletePage.jsx         {url} : /auth/joinComplete/ | 회원가입 |  가입완료                         {htmlFile} = /docs/html-dist/html/menu07/page_07_01_08.html

{workJsx} = /src/pages/auth/PwResetRequestPage.jsx       {url} : /auth/PwResetRequest/ | 비밀번호변경 | 이메일 입력                 {htmlFile} = /docs/html-dist/html/menu07/page_07_04_01.html
{workJsx} = /src/pages/auth/PwResetEmailSentPage.jsx     {url} : /auth/PwResetEmailSent/ | 비밀번호변경 |  이메일 전송완료          {htmlFile} = /docs/html-dist//html/menu07/page_07_04_02.html
{workJsx} = /src/pages/auth/PwResetFormPage.jsx          {url} : /auth/PwResetForm/ | 비밀번호변경 |  비밀번호 재설정               {htmlFile} = /docs/html-dist/html/menu07/page_07_04_04.html
{workJsx} = /src/pages/auth/PwResetCompletePage.jsx      {url} : /auth/PwResetComplete/ | 비밀번호변경 |  비밀번호 재설정 완료      {htmlFile} = /docs/html-dist/html/menu07/page_07_01_08.html

{workJsx} = /src/pages/auth/AccountCheckPage.jsx       {url} : /auth/PwResetRequest/ | 회원가입여부 | 이메일 입력                 {htmlFile} = /docs/html-dist/html/menu07/page_07_03_01.html
{workJsx} = /src/pages/auth/RegisteredEmailPage.jsx     {url} : /auth/PwResetEmailSent/ | 회원가입여부 |  가입여부 확인          {htmlFile} = /docs/html-dist//html/menu07/page_07_03_02.html






# 리엑트 콤포넌트 + html 퍼블리싱으로 페이지 생성
1. ui 컴포넌트 → 리액트 컴포넌트 만들기
{htmlFile}파일은 html 페이지 퍼블리싱이야.
파일내에서 layoutContArea 또는 memberSubCont 안에 들어가는 부분이 페이지야. 
UIComponentList.md 보고 {workJsx}에 맞는 jsx를 찾아 연결해줘

*jsx는 만들어놨는데 없다면 경로가 잘못되었을 수 있으니 확인해달라고 요청해줘

## 주소값
{url}은 주소값이야


## 치환 파일 (htmlFile:html 퍼블리싱, guideJsxFile:참고 jsx파일, workJsx:작업리액트파일, scssFile:module.scss, guideListfile:가이드 리스트 jsx파일)
{workJsx} = /src/pages/auth/JoinEmailAuthPage.jsx        {url} : /auth/joinEmailAuth/ | 회원가입 |  이메일 인증                      {htmlFile} = /docs/html-dist/html/menu07/page_07_01_02.html
{workJsx} = /src/pages/auth/JoinHistoryStatusPage.jsx    {url} : /auth/joinHistoryStatus/ | 회원가입 |  이메일 인증 후 실적 확인 페이지   {htmlFile} = /docs/html-dist/html/menu07/page_07_01_07.html
{workJsx} = /src/pages/auth/JoinIdConfirmPage.jsx        {url} : /auth/joinIdConfirmPage/ | 회원가입 |  회원ID 확인                      {htmlFile} = /docs/html-dist/html/menu07/page_07_01_04.html
{workJsx} = /src/pages/auth/JoinRequiredInfoPage.jsx     {url} : /auth/joinRequiredInfo/ | 회원가입 |  필수정보 입력                    {htmlFile} = /docs/html-dist/html/menu07/page_07_01_05.html
{workJsx} = /src/pages/auth/JoinOptionalInfoPage.jsx     {url} : /auth/joinOptionalInfo/ | 회원가입 |  선택정보 입력                    {htmlFile} = /docs/html-dist/html/menu07/page_07_01_06.html
{workJsx} = /src/pages/auth/JoinCompletePage.jsx         {url} : /auth/joinComplete/ | 회원가입 |  가입완료                         {htmlFile} = /docs/html-dist/html/menu07/page_07_01_08.html


{workJsx} = /src/pages/auth/AccountCheckPage.jsx       {url} : /auth/AccountCheck/ | 회원가입여부 | 이메일 입력                 {htmlFile} = /docs/html-dist/html/menu07/page_07_03_01.html
{workJsx} = /src/pages/auth/RegisteredEmailPage.jsx     {url} : /auth/RegisteredEmail/ | 회원가입여부 |  가입여부 확인          {htmlFile} = /docs/html-dist//html/menu07/page_07_03_02.html

{url}은 주소값이야