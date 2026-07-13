//영수증 상단
import Receipt from '@/features/ticket/components/Receipt';

function GuideReceipt() {
  return (
    <>
      <h3>Receipt Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/ticket/components/Receipt.jsx</p>

      {/* 영수증 - 반환 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>반환 영수증</h4>
        <Receipt
          subTitle="(반환)"
          num="A1035"
          info="서울역(10:30) → 인천공항2터미널(11:10)"
          seat="(3석)"
          list={[
            { dt: '승인번호', dd: '123456789' },
            { dt: '승인일시', dd: '2025-10-05 10:30' },
          ]}
          totalValue="44,500원"
          comments={['본 영수증은 세금계산서 또는 현금영수증을 대신하지 않습니다.']}
        />
      </div>

      {/* 영수증 - 기본(반환 텍스트 없음) */}
      <div style={{ marginBottom: '20px' }}>
        <h4>기본 영수증</h4>
        <Receipt
          subTitle=""
          num="A1035"
          info="서울역(10:30) → 인천공항2터미널(11:10)"
          seat="(3석)"
          list={[
            { dt: '승인번호', dd: '123456789' },
            { dt: '승인일시', dd: '2025-10-05 10:30' },
          ]}
          totalValue="44,500원"
          comments={['본 영수증은 세금계산서 또는 현금영수증을 대신하지 않습니다.']}
        />
      </div>
    </>
  );
}
export default GuideReceipt;
