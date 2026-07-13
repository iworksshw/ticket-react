// src/routes.jsx
// import { createBrowserRouter } from 'react-router-dom';
import { createHashRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// 공통 레이아웃 (추후 폴더 안에 실제 파일로 만드시면 됩니다)
import MainLayout from '@/components/layout/MainLayout'; 
import SubLayout from '@/components/layout/SubLayout';
import GuideLayout from '@/components/layout/GuideLayout';
import AuthLayout from '@/components/layout/AuthLayout';

// 로딩 중 표시할 컴포넌트
const Loading = () => <div style={{ padding: '20px', textAlign: 'center' }}>로딩 중...</div>;

// 250개 대규모 페이지 관리를 위한 Lazy Loading 설정
const Home = lazy(() => import('@/pages/Home'));
const TicketSearchPage = lazy(() => import('@/pages/tickets/TicketSearchPage'));
const TicketAuthPage = lazy(() => import('@/pages/tickets/TicketAuthPage'));
const TrainSelectionPage = lazy(() => import('@/pages/tickets/TrainSelectionPage'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const JoinTermsPage = lazy(() => import('@/pages/auth/JoinTermsPage'));
const JoinEmailAuthPage = lazy(() => import('@/pages/auth/JoinEmailAuthPage'));
const JoinHistoryStatusPage = lazy(() => import('@/pages/auth/JoinHistoryStatusPage'));
const JoinIdConfirmPage = lazy(() => import('@/pages/auth/JoinIdConfirmPage'));
const JoinRequiredInfoPage = lazy(() => import('@/pages/auth/JoinRequiredInfoPage'));
const JoinOptionalInfoPage = lazy(() => import('@/pages/auth/JoinOptionalInfoPage'));
const JoinCompletePage = lazy(() => import('@/pages/auth/JoinCompletePage'));
const PwResetRequestPage = lazy(() => import('@/pages/auth/PwResetRequestPage'));
const PwResetEmailSentPage = lazy(() => import('@/pages/auth/PwResetEmailSentPage'));
const PwResetFormPage = lazy(() => import('@/pages/auth/PwResetFormPage'));
const PwResetCompletePage = lazy(() => import('@/pages/auth/PwResetCompletePage'));
const AccountCheckPage = lazy(() => import('@/pages/auth/AccountCheckPage'));
const RegisteredEmailPage = lazy(() => import('@/pages/auth/RegisteredEmailPage'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// // 마이페이지 관련 예시
// const MyHistory = lazy(() => import('@/pages/mypage/MyHistory'));
// const MyProfile = lazy(() => import('@/pages/mypage/MyProfile'));

// 가이드 파일
const GuideButton = lazy(() => import('@/guide/global/GuideButton'));
const GuideDropdown = lazy(() => import('@/guide/global/GuideDropdown'));
const GuideInput = lazy(() => import('@/guide/global/GuideInput'));
const GuideCheck = lazy(() => import('@/guide/global/GuideCheck'));
const GuideSelect = lazy(() => import('@/guide/global/GuideSelect'));
const GuideContents = lazy(() => import('@/guide/global/GuideContents'));
const GuideTable = lazy(() => import('@/guide/global/GuideTable'));
const GuideFileAttach = lazy(() => import('@/guide/global/GuideFileAttach'));
const GuideFormTable = lazy(() => import('@/guide/global/GuideFormTable'));
const GuideBox = lazy(() => import('@/guide/global/GuideBox'));
const GuideSubInfo = lazy(() => import('@/guide/global/GuideSubInfo'));
const GuideImgWrap = lazy(() => import('@/guide/global/GuideImgWrap'));
const GuideTermsAgree = lazy(() => import('@/guide/common/GuideTermsAgree'));
const GuideInfoBox = lazy(() => import('@/guide/common/GuideInfoBox'));
const GuideStepBox = lazy(() => import('@/guide/common/GuideStepBox'));
const GuideLocaTab = lazy(() => import('@/guide/common/GuideLocaTab'));
const GuideGrayBox = lazy(() => import('@/guide/common/GuideGrayBox'));
const GuideResvPros = lazy(() => import('@/guide/common/GuideResvPros'));
const GuideStepInfo = lazy(() => import('@/guide/common/GuideStepInfo'));
const GuideMeeting = lazy(() => import('@/guide/search/GuideMeeting'));
const GuideComplete = lazy(() => import('@/guide/common/GuideComplete'));
const GuideNoList = lazy(() => import('@/guide/common/GuideNoList'));
const GuideAgreePop = lazy(() => import('@/guide/common/GuideAgreePop'));
const GuidePartner = lazy(() => import('@/guide/common/GuidePartner'));
const GuideSubBtm = lazy(() => import('@/guide/common/GuideSubBtm'));
const GuideTicketSelect = lazy(() => import('@/guide/ticket/GuideTicketSelect'));
const GuideTicketSearch = lazy(() => import('@/guide/ticket/GuideTicketSearch'));
const GuideCalendarPop = lazy(() => import('@/guide/ticket/GuideCalendarPop'));
const GuideTicketPass = lazy(() => import('@/guide/ticket/GuideTicketPass'));
const GuideTicketGoodsList = lazy(() => import('@/guide/ticket/GuideTicketGoodsList'));
const GuideTicketGoods = lazy(() => import('@/guide/ticket/GuideTicketGoods'));
const GuideTicketDiscount = lazy(() => import('@/guide/ticket/GuideTicketDiscount'));
const GuideTicketInfo = lazy(() => import('@/guide/ticket/GuideTicketInfo'));
const GuideStaSelectPop = lazy(() => import('@/guide/ticket/GuideStaSelectPop'));
const GuideTicketPriceInfo = lazy(() => import('@/guide/ticket/GuideTicketPriceInfo'));
const GuideTicketSeat = lazy(() => import('@/guide/ticket/GuideTicketSeat'));
const GuideSeatDiscount = lazy(() => import('@/guide/ticket/GuideSeatDiscount'));
const GuidePayVisa = lazy(() => import('@/guide/payment/GuidePayVisa'));
const GuidePayCard = lazy(() => import('@/guide/payment/GuidePayCard'));
const GuideBoardList = lazy(() => import('@/guide/board/GuideBoardList'));
const GuideBoardView = lazy(() => import('@/guide/board/GuideBoardView'));
const GuideRequestList = lazy(() => import('@/guide/board/GuideRequestList'));
const GuideBoardCard = lazy(() => import('@/guide/board/GuideBoardCard'));
const GuideMemberSelect = lazy(() => import('@/guide/member/GuideMemberSelect'));
const GuideLogin = lazy(() => import('@/guide/member/GuideLogin'));
const GuideJoin = lazy(() => import('@/guide/member/GuideJoin'));
const GuideCoupon = lazy(() => import('@/guide/member/GuideCoupon'));
const GuideTicketView = lazy(() => import('@/guide/ticket/GuideTicketView'));
const GuideTotalPriceBtm = lazy(() => import('@/guide/ticket/GuideTotalPriceBtm'));
const GuideSchedule = lazy(() => import('@/guide/train/GuideSchedule'));
const GuideMypage = lazy(() => import('@/guide/train/GuideMypage'));
const GuidePopCerti = lazy(() => import('@/guide/train/GuidePopCerti'));
const GuideReceipt = lazy(() => import('@/guide/ticket/GuideReceipt'));
const GuideReturn = lazy(() => import('@/guide/ticket/GuideReturn'));
const GuideProduct = lazy(() => import('@/guide/ticket/GuideProduct'));
const GuideTab = lazy(() => import('@/guide/module/GuideTab'));
const GuideTabLine = lazy(() => import('@/guide/module/GuideTabLine'));
const GuideAccordion = lazy(() => import('@/guide/module/GuideAccordion'));
const GuidePopup = lazy(() => import('@/guide/module/GuidePopup'));
const GuideTicketDivide = lazy(() => import('@/guide/module/GuideTicketDivide'));
const GuideGnb = lazy(() => import('@/guide/layout/GuideGnb'));
const GuideSubTop = lazy(() => import('@/guide/layout/GuideSubTop'));
const GuideFooter = lazy(() => import('@/guide/layout/GuideFooter'));
const GuideSwiper = lazy(() => import('@/guide/swiper/GuideSwiper'));
const GuideCustomer = lazy(() => import('@/guide/customer/GuideCustomer'));
const GuideComplain = lazy(() => import('@/guide/complain/GuideComplain'));
const GuideDashBoard = lazy(() => import('@/guide/dashboard/GuideDashBoard'));
const GuideCalender = lazy(() => import('@/guide/calender/GuideCalender'));
const GuideList = lazy(() => import('@/guide/GuideList'));
//const NotFound = lazy(() => import('@/pages/NotFound'));

// export const router = createBrowserRouter([
export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />, // 모든 페이지에 공통 적용될 레이아웃 (헤더, 푸터 등)
    errorElement: <Suspense fallback={<Loading />}><NotFound /></Suspense>, // 404 등 에러 페이지
    children: [
      {
        index: true, // 홈 화면 ('/')
        element: <Suspense fallback={<Loading />}><Home /></Suspense>,
      },
    ],
  },
  // ------------------------------------------------------------------
  // 2. 💥 서브 화면 전용 (좌측 메뉴나 서브 타이틀이 들어가는 레이아웃)
  // ------------------------------------------------------------------
  {
    path: '',
    element: <SubLayout />, // 헤더/푸터 + 서브사이드바(LNB) 등이 포함된 레이아웃
    children: [
      {
        path: 'tickets/ticketSearch', // 주소: /tickets/ticketSearch
        element: <Suspense fallback={<Loading />}><TicketSearchPage /></Suspense>,
      },
      {
        path: 'tickets/ticketAuth', // 주소: /tickets/ticketAuth
        element: <Suspense fallback={<Loading />}><TicketAuthPage /></Suspense>,
      },
      {
        path: 'tickets/trainSelection', // 주소: /tickets/trainSelection
        element: <Suspense fallback={<Loading />}><TrainSelectionPage /></Suspense>,
      },
      // 💡 앞으로 추가될 대메뉴/소메뉴 페이지들은 여기에 한 줄씩 추가해 나가면 됩니다.
    ],
  },
  // ------------------------------------------------------------------
  // 2-1. 💥 회원 인증 전용 (로그인/회원가입 등 memberSubCont 레이아웃)
  // ------------------------------------------------------------------
  {
    path: '',
    element: <AuthLayout />,
    children: [
      {
        path: 'tickets/login', // 주소: /tickets/login
        element: <Suspense fallback={<Loading />}><LoginPage /></Suspense>,
      },
      {
        path: 'auth/joinTermsPage', // 주소: /auth/joinTermsPage
        element: <Suspense fallback={<Loading />}><JoinTermsPage /></Suspense>,
      },
      {
        path: 'auth/joinEmailAuth', // 주소: /auth/joinEmailAuth
        element: <Suspense fallback={<Loading />}><JoinEmailAuthPage /></Suspense>,
      },
      {
        path: 'auth/joinHistoryStatus', // 주소: /auth/joinHistoryStatus
        element: <Suspense fallback={<Loading />}><JoinHistoryStatusPage /></Suspense>,
      },
      {
        path: 'auth/joinIdConfirmPage', // 주소: /auth/joinIdConfirmPage
        element: <Suspense fallback={<Loading />}><JoinIdConfirmPage /></Suspense>,
      },
      {
        path: 'auth/joinRequiredInfo', // 주소: /auth/joinRequiredInfo
        element: <Suspense fallback={<Loading />}><JoinRequiredInfoPage /></Suspense>,
      },
      {
        path: 'auth/joinOptionalInfo', // 주소: /auth/joinOptionalInfo
        element: <Suspense fallback={<Loading />}><JoinOptionalInfoPage /></Suspense>,
      },
      {
        path: 'auth/joinComplete', // 주소: /auth/joinComplete
        element: <Suspense fallback={<Loading />}><JoinCompletePage /></Suspense>,
      },
      {
        path: 'auth/PwResetRequest', // 주소: /auth/PwResetRequest
        element: <Suspense fallback={<Loading />}><PwResetRequestPage /></Suspense>,
      },
      {
        path: 'auth/PwResetEmailSent', // 주소: /auth/PwResetEmailSent
        element: <Suspense fallback={<Loading />}><PwResetEmailSentPage /></Suspense>,
      },
      {
        path: 'auth/PwResetForm', // 주소: /auth/PwResetForm
        element: <Suspense fallback={<Loading />}><PwResetFormPage /></Suspense>,
      },
      {
        path: 'auth/PwResetComplete', // 주소: /auth/PwResetComplete
        element: <Suspense fallback={<Loading />}><PwResetCompletePage /></Suspense>,
      },
      {
        path: 'auth/accountCheck', // 주소: /auth/accountCheck
        element: <Suspense fallback={<Loading />}><AccountCheckPage /></Suspense>,
      },
      {
        path: 'auth/registeredEmail', // 주소: /auth/registeredEmail
        element: <Suspense fallback={<Loading />}><RegisteredEmailPage /></Suspense>,
      },
    ],
  },
//   // ------------------------------------------------------------------
//   // 그룹 2: 마이페이지 레이아웃 (authLayout) 적용 페이지들
//   // ------------------------------------------------------------------
//   {
//     path: '/auth', // 기준 주소가 /auth로 시작
//     element: <authLayout />,
//     children: [
//       {
//         path: 'history', // 실제 주소: '/auth/history'
//         element: <Suspense fallback={<Loading />}><MyHistory /></Suspense>,
//       },
//       {
//         path: 'profile', // 실제 주소: '/auth/profile'
//         element: <Suspense fallback={<Loading />}><MyProfile /></Suspense>,
//       },
//     ],
//   },

  // ------------------------------------------------------------------
  // 그룹 3: 가이드 적용 페이지들
  // ------------------------------------------------------------------
  {
    path: '/guide',
    element: <GuideLayout />,
    children: [
      {
        path: '',
        element: <Suspense fallback={<Loading />}><GuideList /></Suspense>,
        children: [
          {
            index: true,
            element: (
              <div style={{ padding: '32px', color: '#666', lineHeight: 1.6 }}>
                <h3>가이드 항목을 좌측에서 선택하세요.</h3>
                <p>버튼, 입력 폼 등 제작한 컴포넌트 가이드를 여기에서 확인할 수 있습니다.</p>
              </div>
            ),
          },
          {
            path: 'button', // 실제 주소: '/guide/button'
            element: <Suspense fallback={<Loading />}><GuideButton /></Suspense>,
          },
          {
            path: 'dropdown', // 실제 주소: '/guide/dropdown'
            element: <Suspense fallback={<Loading />}><GuideDropdown /></Suspense>,
          },
          {
            path: 'input', // 실제 주소: '/guide/input'
            element: <Suspense fallback={<Loading />}><GuideInput /></Suspense>,
          },
          {
            path: 'check', // 실제 주소: '/guide/check'
            element: <Suspense fallback={<Loading />}><GuideCheck /></Suspense>,
          },
          {
            path: 'select', // 실제 주소: '/guide/select'
            element: <Suspense fallback={<Loading />}><GuideSelect /></Suspense>,
          },
          {
            path: 'contents', // 실제 주소: '/guide/contents'
            element: <Suspense fallback={<Loading />}><GuideContents /></Suspense>,
          },
          {
            path: 'table', // 실제 주소: '/guide/table'
            element: <Suspense fallback={<Loading />}><GuideTable /></Suspense>,
          },
          {
            path: 'file-attach', // 실제 주소: '/guide/file-attach'
            element: <Suspense fallback={<Loading />}><GuideFileAttach /></Suspense>,
          },
          {
            path: 'form-table', // 실제 주소: '/guide/form-table'
            element: <Suspense fallback={<Loading />}><GuideFormTable /></Suspense>,
          },
          {
            path: 'box', // 실제 주소: '/guide/box'
            element: <Suspense fallback={<Loading />}><GuideBox /></Suspense>,
          },
          {
            path: 'sub-info', // 실제 주소: '/guide/sub-info'
            element: <Suspense fallback={<Loading />}><GuideSubInfo /></Suspense>,
          },
          {
            path: 'img-wrap', // 실제 주소: '/guide/img-wrap'
            element: <Suspense fallback={<Loading />}><GuideImgWrap /></Suspense>,
          },
          {
            path: 'terms-agree', // 실제 주소: '/guide/terms-agree'
            element: <Suspense fallback={<Loading />}><GuideTermsAgree /></Suspense>,
          },
          {
            path: 'info-box', // 실제 주소: '/guide/info-box'
            element: <Suspense fallback={<Loading />}><GuideInfoBox /></Suspense>,
          },
          {
            path: 'step-box', // 실제 주소: '/guide/step-box'
            element: <Suspense fallback={<Loading />}><GuideStepBox /></Suspense>,
          },
          {
            path: 'loca-tab', // 실제 주소: '/guide/loca-tab'
            element: <Suspense fallback={<Loading />}><GuideLocaTab /></Suspense>,
          },
          {
            path: 'gray-box', // 실제 주소: '/guide/gray-box'
            element: <Suspense fallback={<Loading />}><GuideGrayBox /></Suspense>,
          },
          {
            path: 'resv-pros', // 실제 주소: '/guide/resv-pros'
            element: <Suspense fallback={<Loading />}><GuideResvPros /></Suspense>,
          },
          {
            path: 'step-info', // 실제 주소: '/guide/step-info'
            element: <Suspense fallback={<Loading />}><GuideStepInfo /></Suspense>,
          },
          {
            path: 'schedule', // 실제 주소: '/guide/schedule'
            element: <Suspense fallback={<Loading />}><GuideSchedule /></Suspense>,
          },
          {
            path: 'mypage', // 실제 주소: '/guide/mypage'
            element: <Suspense fallback={<Loading />}><GuideMypage /></Suspense>,
          },
          {
            path: 'pop-certi', // 실제 주소: '/guide/pop-certi'
            element: <Suspense fallback={<Loading />}><GuidePopCerti /></Suspense>,
          },
          {
            path: 'meeting', // 실제 주소: '/guide/meeting'
            element: <Suspense fallback={<Loading />}><GuideMeeting /></Suspense>,
          },
          {
            path: 'complete', // 실제 주소: '/guide/complete'
            element: <Suspense fallback={<Loading />}><GuideComplete /></Suspense>,
          },
          {
            path: 'no-list', // 실제 주소: '/guide/no-list'
            element: <Suspense fallback={<Loading />}><GuideNoList /></Suspense>,
          },
          {
            path: 'agree-pop', // 실제 주소: '/guide/agree-pop'
            element: <Suspense fallback={<Loading />}><GuideAgreePop /></Suspense>,
          },
          {
            path: 'partner', // 실제 주소: '/guide/partner'
            element: <Suspense fallback={<Loading />}><GuidePartner /></Suspense>,
          },
          {
            path: 'sub-btm', // 실제 주소: '/guide/sub-btm'
            element: <Suspense fallback={<Loading />}><GuideSubBtm /></Suspense>,
          },
          {
            path: 'ticket-select', // 실제 주소: '/guide/ticket-select'
            element: <Suspense fallback={<Loading />}><GuideTicketSelect /></Suspense>,
          },
          {
            path: 'ticket-search', // 실제 주소: '/guide/ticket-search'
            element: <Suspense fallback={<Loading />}><GuideTicketSearch /></Suspense>,
          },
          {
            path: 'calendar-pop', // 실제 주소: '/guide/calendar-pop'
            element: <Suspense fallback={<Loading />}><GuideCalendarPop /></Suspense>,
          },
          {
            path: 'ticket-pass', // 실제 주소: '/guide/ticket-pass'
            element: <Suspense fallback={<Loading />}><GuideTicketPass /></Suspense>,
          },
          {
            path: 'ticket-goods-list', // 실제 주소: '/guide/ticket-goods-list'
            element: <Suspense fallback={<Loading />}><GuideTicketGoodsList /></Suspense>,
          },
          {
            path: 'ticket-goods', // 실제 주소: '/guide/ticket-goods'
            element: <Suspense fallback={<Loading />}><GuideTicketGoods /></Suspense>,
          },
          {
            path: 'ticket-discount', // 실제 주소: '/guide/ticket-discount'
            element: <Suspense fallback={<Loading />}><GuideTicketDiscount /></Suspense>,
          },
          {
            path: 'ticket-info', // 실제 주소: '/guide/ticket-info'
            element: <Suspense fallback={<Loading />}><GuideTicketInfo /></Suspense>,
          },
          {
            path: 'sta-select-pop', // 실제 주소: '/guide/sta-select-pop'
            element: <Suspense fallback={<Loading />}><GuideStaSelectPop /></Suspense>,
          },
          {
            path: 'ticket-price-info', // 실제 주소: '/guide/ticket-price-info'
            element: <Suspense fallback={<Loading />}><GuideTicketPriceInfo /></Suspense>,
          },
          {
            path: 'ticket-seat', // 실제 주소: '/guide/ticket-seat'
            element: <Suspense fallback={<Loading />}><GuideTicketSeat /></Suspense>,
          },
          {
            path: 'seat-discount', // 실제 주소: '/guide/seat-discount'
            element: <Suspense fallback={<Loading />}><GuideSeatDiscount /></Suspense>,
          },
          {
            path: 'pay-visa', // 실제 주소: '/guide/pay-visa'
            element: <Suspense fallback={<Loading />}><GuidePayVisa /></Suspense>,
          },
          {
            path: 'pay-card', // 실제 주소: '/guide/pay-card'
            element: <Suspense fallback={<Loading />}><GuidePayCard /></Suspense>,
          },
          {
            path: 'board', // 실제 주소: '/guide/board'
            element: <Suspense fallback={<Loading />}><GuideBoardList /></Suspense>,
          },
          {
            path: 'board-view', // 실제 주소: '/guide/board-view'
            element: <Suspense fallback={<Loading />}><GuideBoardView /></Suspense>,
          },
          {
            path: 'request-list', // 실제 주소: '/guide/request-list'
            element: <Suspense fallback={<Loading />}><GuideRequestList /></Suspense>,
          },
          {
            path: 'board-card', // 실제 주소: '/guide/board-card'
            element: <Suspense fallback={<Loading />}><GuideBoardCard /></Suspense>,
          },
          {
            path: 'member-select', // 실제 주소: '/guide/member-select'
            element: <Suspense fallback={<Loading />}><GuideMemberSelect /></Suspense>,
          },
          {
            path: 'login', // 실제 주소: '/guide/login'
            element: <Suspense fallback={<Loading />}><GuideLogin /></Suspense>,
          },
          {
            path: 'join', // 실제 주소: '/guide/join'
            element: <Suspense fallback={<Loading />}><GuideJoin /></Suspense>,
          },
          {
            path: 'coupon', // 실제 주소: '/guide/coupon'
            element: <Suspense fallback={<Loading />}><GuideCoupon /></Suspense>,
          },
          {
            path: 'ticket-view', // 실제 주소: '/guide/ticket-view'
            element: <Suspense fallback={<Loading />}><GuideTicketView /></Suspense>,
          },
          {
            path: 'total-price-btm', // 실제 주소: '/guide/total-price-btm'
            element: <Suspense fallback={<Loading />}><GuideTotalPriceBtm /></Suspense>,
          },
          {
            path: 'receipt', // 실제 주소: '/guide/receipt'
            element: <Suspense fallback={<Loading />}><GuideReceipt /></Suspense>,
          },
          {
            path: 'return', // 실제 주소: '/guide/return'
            element: <Suspense fallback={<Loading />}><GuideReturn /></Suspense>,
          },
          {
            path: 'product', // 실제 주소: '/guide/product'
            element: <Suspense fallback={<Loading />}><GuideProduct /></Suspense>,
          },
          {
            path: 'tab', // 실제 주소: '/guide/tab'
            element: <Suspense fallback={<Loading />}><GuideTab /></Suspense>,
          },
          {
            path: 'tab-line', // 실제 주소: '/guide/tab-line'
            element: <Suspense fallback={<Loading />}><GuideTabLine /></Suspense>,
          },
          {
            path: 'accordion', // 실제 주소: '/guide/accordion'
            element: <Suspense fallback={<Loading />}><GuideAccordion /></Suspense>,
          },
          {
            path: 'popup', // 실제 주소: '/guide/popup'
            element: <Suspense fallback={<Loading />}><GuidePopup /></Suspense>,
          },
          {
            path: 'ticket-divide', // 실제 주소: '/guide/ticket-divide'
            element: <Suspense fallback={<Loading />}><GuideTicketDivide /></Suspense>,
          },
          {
            path: 'gnb', // 실제 주소: '/guide/gnb'
            element: <Suspense fallback={<Loading />}><GuideGnb /></Suspense>,
          },
          {
            path: 'sub-top', // 실제 주소: '/guide/sub-top'
            element: <Suspense fallback={<Loading />}><GuideSubTop /></Suspense>,
          },
          {
            path: 'footer', // 실제 주소: '/guide/footer'
            element: <Suspense fallback={<Loading />}><GuideFooter /></Suspense>,
          },
          {
            path: 'swiper', // 실제 주소: '/guide/swiper'
            element: <Suspense fallback={<Loading />}><GuideSwiper /></Suspense>,
          },
          {
            path: 'customer', // 실제 주소: '/guide/customer'
            element: <Suspense fallback={<Loading />}><GuideCustomer /></Suspense>,
          },
          {
            path: 'complain', // 실제 주소: '/guide/complain'
            element: <Suspense fallback={<Loading />}><GuideComplain /></Suspense>,
          },
          {
            path: 'dash-board', // 실제 주소: '/guide/dash-board'
            element: <Suspense fallback={<Loading />}><GuideDashBoard /></Suspense>,
          },
          {
            path: 'calender', // 실제 주소: '/guide/calender'
            element: <Suspense fallback={<Loading />}><GuideCalender /></Suspense>,
          }
        ],
      },
      // 윈도우 팝업용 페이지나 이벤트 독립 페이지도 여기에 배치
    ],
  },
]);