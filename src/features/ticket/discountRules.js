// 승차권 할인 금액 규칙. TrainSelectionPage(초기 좌석 배정)와 TicketDiscountPage(할인선택 팝업)가
// 같은 금액을 써야 하므로 한 곳에 모아둔다. 전부 실제 요금표가 아직 없어 가상 금액이다.
export const SEAT_FARE = 13000; // 좌석 1개당 운임(할인 전)
export const ADULT_DISCOUNT_AMOUNT = 500; // 어른(할인없음) 기본 할인액
export const CHILD_DISCOUNT_AMOUNT = 3500;
export const SENIOR_DISCOUNT_AMOUNT = 3500; // 경로/장애인/국가유공자 공통
export const EXCHANGE_DISCOUNT_AMOUNT = 4000; // 교환번호마다 실제로는 다르지만 가상 고정값
export const COUPON_DISCOUNT_AMOUNT = 4000; // 할인쿠폰(회원/비회원) 공통, 가상 고정값
export const AFFILIATE_DISCOUNT_AMOUNT = 2000; // 제휴카드는 체크만으로 적용(정보입력은 추후 제작)
