import Complete from '@/components/common/contents/Complete';

// 가이드 : Complete
// 원본 퍼블리싱 파일: docs/html-src/html/common/comComplete.html

function GuideComplete() {
  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>Complete Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/contents/Complete.jsx</p>
      </section>

      <section>
        <h4>완료 아이콘 노출 (기본, addClass: chkIco)</h4>
        <Complete
          title="승차권 예약이 완료되었습니다."
          desc={
            <>
                담당자가 예약 승인 후 <em>[마이페이지 &gt; 체험학습 신청내역]</em>에서 <em>체험일 10일 전까지​ 승차권 결제를 완료</em>해야 참석이 가능합니다.<br/>
                (미결제 시 자동 취소)<br/><br/>
                
                체험학습 일정 확정 후 세부일정표 등은 신청하신 이메일로 발송해 드립니다.<br/>
                점심식사, 집결장소 등 궁금하신 사항은 FAQ를 참고하시기 바랍니다.<br/>
                특이사항이 있을 경우 휴대전화로 연락드립니다. 감사합니다.
            </>
          }
        />
      </section>

      <section>
        <h4>완료 아이콘 미노출</h4>
        <Complete
          title={
            <>
              등록하신 이메일(<em>id@domain.com</em>)은<br /> 회원으로 등록되어 있습니다.
            </>
          }
          desc={
            <>
              <em>'인쇄한 승차권'</em> 또는 <em>'모바일QR승차권'</em>을 사용하여 직통열차를 탑승할 수 있습니다.
            </>
          }
          chkIco={false}
        />
      </section>
    </div>
  );
}

export default GuideComplete;
