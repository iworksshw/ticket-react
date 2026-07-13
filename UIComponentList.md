# UI Component List

`/src/components/`, `/src/features/` 하위 jsx 파일에 적힌 `UI Components :` 주석을 기준으로 정리한 목록.
퍼블리싱 html(`/docs/html-src/html/...`)에서 쓰인 최상위 class명과 아래 "UI Component" 열을 비교하면,
그 html이 어떤 리액트 컴포넌트로 이미 구현되어 있는지 바로 찾을 수 있다.

## src/components/common/forms

| 파일 | UI Component | 경로 |
|---|---|---|
| Button.jsx | btn | src/components/common/forms/Button.jsx |
| ButtonGroup.jsx | comBtnGroup | src/components/common/forms/ButtonGroup.jsx |
| Dropdown.jsx | comDropdown | src/components/common/forms/Dropdown.jsx |
| FileAttach.jsx | frmFileList | src/components/common/forms/FileAttach.jsx |
| FormCheck.jsx | frmChoBox, frmChoList, frmGroup | src/components/common/forms/FormCheck.jsx |
| FormGroup.jsx | frmGroup | src/components/common/forms/FormGroup.jsx |
| FormInput.jsx | frmBox, iptText | src/components/common/forms/FormInput.jsx |
| FormTable.jsx | comTableForm | src/components/common/forms/FormTable.jsx |
| NumberInput.jsx | pubIncDec | src/components/common/forms/NumberInput.jsx |
| Select.jsx | iptSlt | src/components/common/forms/Select.jsx |
| TermsAgree.jsx | comAgreement | src/components/common/forms/TermsAgree.jsx |

## src/components/common/contents

| 파일 | UI Component | 경로 |
|---|---|---|
| AgreePop.jsx | comAgreePop | src/components/common/contents/AgreePop.jsx |
| Complete.jsx | comComplete | src/components/common/contents/Complete.jsx |
| GrayBox.jsx | comGrayBox | src/components/common/contents/GrayBox.jsx |
| ImgWrap.jsx | comImgWrap | src/components/common/contents/ImgWrap.jsx |
| InfoBox.jsx | comInfoBox | src/components/common/contents/InfoBox.jsx |
| NoList.jsx | comNoList | src/components/common/contents/NoList.jsx |
| Partner.jsx | comPartner (리스트형) | src/components/common/contents/Partner.jsx |
| ResvPros.jsx | comResvPros | src/components/common/contents/ResvPros.jsx |
| StepBox.jsx | comStepBox | src/components/common/contents/StepBox.jsx |
| StepInfo.jsx | comStepInfo | src/components/common/contents/StepInfo.jsx |
| SubBtm.jsx | comSubBtm | src/components/common/contents/SubBtm.jsx |
| SubInfo.jsx | comSubInfo | src/components/common/contents/SubInfo.jsx |

## src/components/common/navigation

| 파일 | UI Component | 경로 |
|---|---|---|
| LocaTab.jsx | comLocaTab | src/components/common/navigation/LocaTab.jsx |
| Pagination.jsx | comPaging | src/components/common/navigation/Pagination.jsx |

## src/components/common/search

| 파일 | UI Component | 경로 |
|---|---|---|
| Meeting.jsx | comMeeting (이력조회검색바) | src/components/common/search/Meeting.jsx |

## src/components/module

| 파일 | UI Component | 경로 |
|---|---|---|
| Accordion.jsx | modAccordion | src/components/module/Accordion.jsx |
| Popup.jsx | modPopup | src/components/module/Popup.jsx |
| Tab.jsx | modTab | src/components/module/Tab.jsx |
| TabLine.jsx | tabInTab | src/components/module/TabLine.jsx |
| TicketDivide.jsx | cptTicketDivide | src/components/module/TicketDivide.jsx |

## src/components/layout

| 파일 | UI Component | 경로 |
|---|---|---|
| Footer.jsx | cptFooter | src/components/layout/Footer.jsx |
| Gnb.jsx | cptGnb | src/components/layout/Gnb.jsx |
| SubTop.jsx | cptSubTop | src/components/layout/SubTop.jsx |
| MainLayout.jsx | *(주석 없음 — 특정 퍼블리싱 컴포넌트가 아니라 라우팅용 페이지 셸)* | src/components/layout/MainLayout.jsx |
| GuideLayout.jsx | *(주석 없음 — 위와 동일, 가이드 페이지 셸)* | src/components/layout/GuideLayout.jsx |
| SubLayout.jsx | *(주석 없음 — 위와 동일, 서브페이지 셸)* | src/components/layout/SubLayout.jsx |

## src/components/swiper

| 파일 | UI Component | 경로 |
|---|---|---|
| SwiperProduct.jsx | productSlide (swiper-container) | src/components/swiper/SwiperProduct.jsx |

## src/features/board/components

| 파일 | UI Component | 경로 |
|---|---|---|
| BoardCard.jsx | comBoardCard | src/features/board/components/BoardCard.jsx |
| BoardList.jsx | comBoardList | src/features/board/components/BoardList.jsx |
| BoardView.jsx | comBoardView | src/features/board/components/BoardView.jsx |
| BoardViewBtm.jsx | comNextPrev | src/features/board/components/BoardViewBtm.jsx |
| GroupTop.jsx | comGroupTop | src/features/board/components/GroupTop.jsx |
| RequestList.jsx | comRequestList | src/features/board/components/RequestList.jsx |

## src/features/calender/components

| 파일 | UI Component | 경로 |
|---|---|---|
| Calender.jsx | comCalendar | src/features/calender/components/Calender.jsx |

## src/features/complain/components

| 파일 | UI Component | 경로 |
|---|---|---|
| Complain.jsx | cptComplain | src/features/complain/components/Complain.jsx |

## src/features/customer/components

| 파일 | UI Component | 경로 |
|---|---|---|
| Customer.jsx | cptCustomer | src/features/customer/components/Customer.jsx |

## src/features/dashboard/components

| 파일 | UI Component | 경로 |
|---|---|---|
| DashBoard.jsx | cptMypage | src/features/dashboard/components/DashBoard.jsx |
| InBasicInfo.jsx | infoBox (나의 기본정보) | src/features/dashboard/components/InBasicInfo.jsx |
| InMy.jsx | boardingArea (나의 신청정보) | src/features/dashboard/components/InMy.jsx |
| InTicket.jsx | boardingArea (탑승예정 승차권) | src/features/dashboard/components/InTicket.jsx |
| InUse.jsx | boardingArea (나의 AREX 이용정보) | src/features/dashboard/components/InUse.jsx |

## src/features/member/components

| 파일 | UI Component | 경로 |
|---|---|---|
| Coupon.jsx | comCoupon | src/features/member/components/Coupon.jsx |
| Join.jsx | cptLogin | src/features/member/components/Join.jsx |
| Login.jsx | comLog | src/features/member/components/Login.jsx |
| MemberType.jsx | comMemberSelect | src/features/member/components/MemberType.jsx |

## src/features/payment/components

| 파일 | UI Component | 경로 |
|---|---|---|
| PayCard.jsx | comTicketPay | src/features/payment/components/PayCard.jsx |
| PayVisa.jsx | comPay | src/features/payment/components/PayVisa.jsx |

## src/features/ticket/components

| 파일 | UI Component | 경로 |
|---|---|---|
| CalendarPop.jsx | *(주석 없음 — 루트 class는 `comCalendarMin`으로 추정, styles.comCalendarMin 참고)* | src/features/ticket/components/CalendarPop.jsx |
| Product.jsx | cptProduct | src/features/ticket/components/Product.jsx |
| Receipt.jsx | comReceipt | src/features/ticket/components/Receipt.jsx |
| Return.jsx | comReturn | src/features/ticket/components/Return.jsx |
| SeatDiscount.jsx | comDiscount | src/features/ticket/components/SeatDiscount.jsx |
| StaSelectPop.jsx | comStaSelect | src/features/ticket/components/StaSelectPop.jsx |
| TicketDiscount.jsx | comTicketDiscount | src/features/ticket/components/TicketDiscount.jsx |
| TicketGoods.jsx | comTicketGoods | src/features/ticket/components/TicketGoods.jsx |
| TicketGoodsList.jsx | comTicketGoodsList | src/features/ticket/components/TicketGoodsList.jsx |
| TicketInfo.jsx | comTicketInfo | src/features/ticket/components/TicketInfo.jsx |
| TicketPass.jsx | comTicketPass | src/features/ticket/components/TicketPass.jsx |
| TicketPriceInfo.jsx | comTicketPriceInfo | src/features/ticket/components/TicketPriceInfo.jsx |
| TicketSearch.jsx | comTicketSearch | src/features/ticket/components/TicketSearch.jsx |
| TicketSeat.jsx | comSeat | src/features/ticket/components/TicketSeat.jsx |
| TicketSelect.jsx | comTicketSelect | src/features/ticket/components/TicketSelect.jsx |
| TicketView.jsx | comTicketView | src/features/ticket/components/TicketView.jsx |
| TotalPriceBtm.jsx | comTotalPriceBtm | src/features/ticket/components/TotalPriceBtm.jsx |

## src/features/train/components

| 파일 | UI Component | 경로 |
|---|---|---|
| Mypage.jsx | comMypage | src/features/train/components/Mypage.jsx |
| PopCerti.jsx | cptPopCerti | src/features/train/components/PopCerti.jsx |
| Schedule.jsx | comSchedule | src/features/train/components/Schedule.jsx |

## 기타 예외
| 파일 | UI Component | 경로 |
|---|---|---|
| GuideBox.jsx | comTicketBox | src/guide/global/GuideBox.jsx |