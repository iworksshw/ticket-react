# 가이드 파일 관련 Context

/docs/html-src/html/form/input.html파일의 버튼 및 그룹 부분을 
/src/component/common/FormInput.jsx 파일과
/src/component/common/FormGroup.jsx 참고해서 
/src/guide/global/GuideInput.jsx에 채워줘


# 가이드 리스트 파일 만들기

/src/guide/GuideList.jsx 파일에 각 제작한 콤포넌트 가이드 파일들을 리스트로 만들어 연결해서 보고싶어
해당 화면은 좌측엔 리스트가 나오고 우측에는 해당 가이드들이 보였으면 좋겠어
제작한 콤포넌트 가이드 파일들은 /src/guide/common/이나 /src/guide/global/폴더의 jsx파일들이야

주소를 연결하는 파일은 /src/routes.jsx파일이야
그외에 참고할만한 파일은 없을꺼야 해당 부분을 가지고 GuideList.jsx부분을 제작해줘 GuideList.jsx에 전용으로 사용하는 css는 GuideList.module.css파일에 넣어주고연결해줘

이외에 필요한 파일이나 검색해야 할 부분이 있으면 요청해줘



# ui 컴포넌트 > 리액트 컴포넌트 전환 → Class 입히기 → 전환된 리액트 컴포넌트 > 리액트 가이드 제작

1. ui 컴포넌트 → 리액트 컴포넌트 만들기
/docs/html-src/html/common/comTableForm.html파일은 퍼블리싱 ui 콤포넌트 마크업이야.
/src/component/common/forms/Button.jsx 파일 참고해서 
/src/features/board/components/BoardViewBtm.jsx에 채워줘

(이 작업할 때는 pwsh나 파이썬등을 쓰지말고 그냥 라인을 그려줘)

2. class 입히기
리액트에서 쓰이는 전역 클래스 파일을 먼저 확인해줘.

/src/features/board/components/BoardViewBtm.module.scss파일을 
/src/features/board/components/BoardViewBtm.jsx에 연결해줘.
/src/features/board/components/BoardViewBtm.jsx파일의 class는 현재 전역으로 쓰였다면 BoardViewBtm.module.scss파일에 맞춰서 수정되어야 해

3. ui 컴포넌트를 리엑트 컴포넌트 기반으로 리액트 내 가이드 파일 만들기
/docs/html-src/html/common/comBoardView.html파일은 퍼블리싱 ui 콤포넌트 마크업이야.
/src/features/board/components/BoardView.jsx 파일을 참고해서
/src/guide/global/GuideFileAttach.jsx에 추가해줘

4. 추가된 가이드 연결하기
/src/guide/board/GuideBoardView.jsx 이 파일 관련해서 
/src/routes.jsx 파일과
/src/guide/GuideList.jsx 파일에 추가해줘



# ui 컴포넌트 > 리액트 컴포넌트 전환 → Class 입히기 → 전환된 리액트 컴포넌트 > 리액트 가이드 제작 : 치환형

1. ui 컴포넌트 → 리액트 컴포넌트 만들기
{htmlFile}파일은 퍼블리싱 ui 콤포넌트 마크업이야.
{guideJsxFile} 파일 참고해서 
{workJsx}에 채워줘

(이 작업할 때는 pwsh나 파이썬등을 쓰지말고 그냥 라인을 그려줘)

2. class 입히기
리액트에서 쓰이는 전역 클래스 파일을 먼저 확인해줘.

{scssFile}파일을 
{workJsx}에 연결해줘.
{workJsx}파일의 class는 현재 전역으로 쓰였다면 {scssFile}파일에 맞춰서 수정되어야 해

3. ui 컴포넌트를 리엑트 컴포넌트 기반으로 리액트 내 가이드 파일 만들기
{htmlFile}파일은 퍼블리싱 ui 콤포넌트 마크업이야.
{guideJsxFile} 파일을 참고해서
{guideListfile}에 추가해줘

4. 추가된 가이드 연결하기
{guideListfile} 이 파일 관련해서 
/src/routes.jsx 파일과
/src/guide/GuideList.jsx 파일에 추가해줘

## 치환 파일 (htmlFile:퍼블리싱 ui 컴포넌트, guideJsxFile:참고 jsx파일, workJsx:작업리액트파일, scssFile:module.scss, guideListfile:가이드 리스트 jsx파일)
htmlFile = /docs/html-src/html/common/comTableForm.html
guideJsxFile = /src/components/common/forms/Button.jsx
workJsx = /src/component/common/forms/FormTable.jsx
scssFile = /src/features/board/components/BoardViewBtm.module.scss
guideListfile = /src/guide/global/GuideFormTable.jsx




# 전역 클래스(컨텐츠) ui 컴포넌트 가이드 추가하기
/docs/html-src/html/common/comTableBasic.html파일은 퍼블리싱 ui 콤포넌트 마크업이고 class는 모두 전역 class야.
/src/guide/global/GuideContents.jsx 참고해서 
/src/guide/global/GuideTable.jsx에 채워주고 완료되면

/src/routes.jsx 파일과
/src/guide/GuideList.jsx 파일에 추가해줘



/docs/html-src/html/common/comTableForm.html파일은 퍼블리싱 ui 콤포넌트 마크업이야. 
이 파일 내부에 .frmFileList부분이 파일첨부 부분인데
/src/component/common/forms/Button.jsx 파일 참고해서 
/src/component/common/forms/FileAttach.jsx에 채워줘 해당 class는 전역 class야









# ui 컴포넌트 대칭 리엑트 컴포넌트 목록 학습
- UIComponentList.md을 통해 해당 리엑트 컴포넌트가 어떤 경로에 있고, 또 어떤 ui퍼블리싱을 가지고 만들어졌는지를 학습해줘.
- /src/contexts/ 폴더와 /src/data/ 폴더의 파일들을 학습해줘
- 페이지가 SubTop(브레드크럼/타이틀)과 GNB/Footer를 어떻게 감싸는지 확인하기 위해 src/pages/tickets/TicketSearchPage.jsx를 확인해줘






# 리엑트 콤포넌트 + html 퍼블리싱으로 페이지 생성
1. ui 컴포넌트 → 리액트 컴포넌트 만들기
{htmlFile}파일은 html 페이지 퍼블리싱이야.
{workJsx}파일에서 검색부분에 반응하는 팝업 및 결과 화면이야.
UIComponentList.md 보고 맞는 jsx를 찾아 연결 및 구현해줘

2. 제작된 파일을 /src/routes.jsx에 업데이트해줘

## 치환 파일 (htmlFile:html 퍼블리싱, guideJsxFile:참고 jsx파일, workJsx:작업리액트파일, scssFile:module.scss, guideListfile:가이드 리스트 jsx파일)
{htmlFile} = /docs/html-dist/html/menu01/page_01_01_01_pop01.html : 출발역/도착역 선택
, /docs/html-dist/html/menu01/page_01_01_01_pop02.html : 열차시간 선택
, /docs/html-dist/html/menu01/page_01_01_01_pop03.html : 탑승인원 설정
, /docs/html-dist/html/menu01/page_01_01_01_pop03.html : 열차시간 선택
, /docs/html-dist/html/menu01/page_01_01_01_after.html : 열차조회 및 조회 결과

{workJsx} = /src/pages/tickets/TicketSearchPage.jsx

## 주소값
{workJsx}의 주소값 : /tickets/ticketSearch/









# 리엑트 콤포넌트 + html 퍼블리싱으로 페이지 생성
1. ui 컴포넌트 → 리액트 컴포넌트 만들기
{htmlFile}파일은 html 페이지 퍼블리싱이야.
파일내에서 layoutContArea 안에 들어가는 부분이 페이지야. 
UIComponentList.md 보고 {workJsx}에 맞는 jsx를 찾아 연결해줘

* jsx는 만들어놨는데 없다면 경로가 잘못되었을 수 있으니 확인해달라고 요청해줘

2. trainSelection페이지에서 각각 [승차권 반환(환불) 수수료 정책], [승차권 변경 수수료 정책]을 누르면 해당 파일이 팝업으로 나타나야해

## 주소값
팝업으로 사용될 예정이라 주소값은 없음


## 치환 파일 (htmlFile:html 퍼블리싱, guideJsxFile:참고 jsx파일, workJsx:작업리액트파일, scssFile:module.scss, guideListfile:가이드 리스트 jsx파일)
{htmlFile} = /docs/html-dist/html/menu01/page_01_01_03_pop02.html, /docs/html-dist/html/menu01/page_01_01_03_pop01
{workJsx} = /src/pages/tickets/TicketReturnFeePage.jsx, /src/pages/tickets/TicketChangeFeePage.jsx







# layout만들기
1. ui 컴포넌트 → 리액트 컴포넌트 만들기
{htmlFile}파일은 html 페이지 퍼블리싱이야.

{SubLayout}을 채울꺼야. 페이지 컨텐츠는 memberSubCont 이 영역에 다른 페이지들이 들어올꺼야. {htmlFile}의 memberSubCont 내부 부분은 작업하지 말아줘.

*cptLogin부분은 UIComponentList.md 보고 맞는 jsx를 /src/pages/auth/LoginPage.jsx에 작업해줘 이파일의 url은 /tickets/login/으로 해줘



## 치환 파일 (htmlFile:html 퍼블리싱, guideJsxFile:참고 jsx파일, workJsx:작업리액트파일, scssFile:module.scss, guideListfile:가이드 리스트 jsx파일)
{htmlFile} = /docs/html-dist/html/menu07/page_07_02_01.html
{SubLayout} = /src/components/layout/AuthLayout.jsx