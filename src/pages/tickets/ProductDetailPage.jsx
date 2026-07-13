import { useState } from 'react';
import Popup from '@/components/module/Popup';
import Button from '@/components/common/forms/Button';
import Product from '@/features/ticket/components/Product';
import { parseWon } from '@/features/ticket/priceUtils';

// docs/html-dist/html/menu01/page_01_01_03_pop08.html 참고
// 상품상세/수령안내/반품교환 안내문은 상품마다 다르지 않고 공통 안내라서(html 원본도 고정 텍스트),
// GuideProduct.jsx와 동일한 정적 콘텐츠를 그대로 재사용한다.
const detailContent = (
  <>
    <p className="boxTit">상품상세</p>
    <ul className="editorList">
      <li className="item">1. 5천원이 충전된 교통카드(총 1만원)</li>
      <li className="item">2. 구매 시 객실승무원이 좌석으로 배송</li>
      <li className="item">3. 서울역에서 별도의 절차 없이 1,4호선 환승 가능</li>
      <li className="item">
        ※ 교통카드가 없는 고객 환승 절차
        <br />
        <span className="space">① 서울역 하차(게이트 밖으로 이동)</span>
        <span className="space">② 교통카드 또는 1회용 승차권 구매</span>
        <span className="space">③ 서울역 재승차</span>
        <span className="space">④ 1,4호선 환승</span>
      </li>
    </ul>
    <div className="editorImg">
      <img src="/images/contents/cont_01_01_16_002.jpg" alt="티머니카드 서비스 안내" />
    </div>
    <p className="boxTit">필수정보</p>
    <div className="editorTable">
      <table className="basic">
        <caption>제품정보, 기타를 나타낸 표</caption>
        <colgroup>
          <col style={{ width: '18.9%' }} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th>제품정보</th>
            <td className="left">
              - 종류 : 교통카드 - 소재 : PVC - 치수 : 가로 5.3 X 세로 8.5 (단위:cm) - 제조사 : ㈜티머니 - 제조국 : 한국 - 취급시 주의사항 및 품질보증기준 : 제품후면부 및 이용안내지 확인
            </td>
          </tr>
          <tr>
            <th>기타</th>
            <td className="left">
              - 어린이/청소년 할인등록은 편의점(서울역 지하 3층 등)에서 등록할 수 있습니다. - 본 고지사항 외 관련 이용약관은 홈페이지 하단의 링크를 통해 확인할 수 있습니다.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
);

const receiveContent = (
  <div className="basicText">
    <ul className="list">
      <li className="listItem">상품은 예약하신 승차권의 좌석으로 승무원이 직접 전달해 드립니다.</li>
      <li className="listItem">원활한 상품 지급을 위해 지정된 좌석에 착석하여 주시기 바랍니다.</li>
      <li className="listItem">상품구매내역 확인을 위해 승무원에게 승차권을 보여주시기 바랍니다.</li>
      <li className="listItem">
        승차권 또는 영수증이 없는 경우 상품 수령이 불가하오니 반드시 지참해주시기 바랍니다.
        <br />
        (영수증은 직통열차 예약발매시스템에서 상품 구매 시 입력하신 전자우편으로 전달됩니다.)
      </li>
    </ul>
    <ul className="list">
      <li className="listTit">※ 미수령 시</li>
      <li className="listItem">민원대응 및 사고 등 부득이한 사유로 차내에서 상품 제공이 어려울 수 있습니다.</li>
      <li className="listItem">상품 수령을 못하신 경우 하차 후 승무원에게 문의해주시기 바랍니다.</li>
      <li className="listItem">미수령한 상품에 대해서는 자동으로 환불 처리됩니다.</li>
    </ul>
  </div>
);

const methodContent = (
  <div className="basicText">
    <ul className="list">
      <li className="listItem">상품 수령 후 상품의 하자 및 단순 변심의 경우 즉시 승무원에게 문의해주시기 바랍니다.</li>
      <li className="listItem">
        직통열차 하차 이후 단순변심으로 인해 교환 및 반품을 원하시는 경우, 수령 후 7일 이내 서울역 고객 안내센터를 방문해주시기 바랍니다. (그 외 관련사항 이용약관 제26조 참조)
      </li>
      <li className="listItem">열차 미탑승 등의 사유로 상품을 수령하지 못한 경우 자동으로 환불 처리됩니다.</li>
      <li className="listItem">반품으로 인한 결제취소는 영업일 기준 2~3일이 소요될 수 있습니다.</li>
    </ul>
  </div>
);

function parseStock(numText) {
  if (!numText) return undefined;
  const match = String(numText).match(/\d+/);
  return match ? Number(match[0]) : undefined;
}

/**
 * 추천상품 상세 팝업 (trainSelection 페이지의 추천상품 카드를 누르면 연다)
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {object} product - 클릭한 추천상품 데이터(RECOMMEND_GOODS_LIST 항목: id/image/alt/name/oldPrice/price/soldOut/badgeLabel/date/num)
 * @param {function} onAdd - "담기" 클릭 시 (product, quantity)를 인자로 호출. quantity가 0이면 호출하지 않는다.
 */
function ProductDetailPage({ isOpen, onClose, product, onAdd }) {
  const [cartLines, setCartLines] = useState([]);

  if (!product) return null;

  const price = parseWon(product.price);
  const originalPrice = product.oldPrice ? parseWon(product.oldPrice) : undefined;
  const quantity = cartLines[0]?.quantity ?? 0;

  const handleAdd = () => {
    if (quantity > 0) onAdd(product, quantity);
    onClose();
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      title={product.name}
      footer={
        <Button variant="blue" size="lg" onClick={handleAdd}>담기</Button>
      }
    >
      {/* product.id별로 key를 다시 잡아서, 팝업을 다시 열거나 다른 상품을 클릭했을 때
          담을 개수가 항상 0부터 다시 시작하게 한다. */}
      <Product
        key={`${product.id}-${isOpen}`}
        images={[{ src: product.image, alt: product.alt }]}
        title={product.name}
        originalPrice={originalPrice}
        price={price}
        soldOut={product.soldOut}
        discountLabel={product.badgeLabel}
        expiry={product.date}
        stock={parseStock(product.num)}
        options={[]}
        initialCartLines={[{ label: product.name, unitPrice: price, quantity: 0, hasOptions: false }]}
        onCartLinesChange={setCartLines}
        detailContent={detailContent}
        receiveContent={receiveContent}
        methodContent={methodContent}
      />
    </Popup>
  );
}

export default ProductDetailPage;
