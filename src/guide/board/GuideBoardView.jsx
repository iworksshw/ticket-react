import BoardView from '@/features/board/components/BoardView';
import BoardViewBtm from '@/features/board/components/BoardViewBtm';

// comBoardView.html 마크업의 boardCont 영역을 그대로 옮긴 샘플 HTML.
// 실제 서비스에서는 에디터(CMS)에서 저장된 HTML이 이 자리에 들어온다.
const sampleContent = `
  <div class="center">
    <img src="/images/temp/temp_board_view.png" alt="여름철도학교" /><br /><br />
  </div>
  [행사일정] 2025. 8. 19.(화), 09:00 ~ 18:00<br />
  [모집기간] 2025. 8. 1.(금) ~ 8. 10.(일)<br />
  [지원방법] QR코드 스캔 후 지원서 제출 또는 링크 설문조사 작성<br />
  [결과발표] 2025. 8. 13.(수), 개별통보
`;

function GuideBoardView() {
  const handlePrevClick = () => {
    console.log('이전글로 이동');
  };

  const handleNextClick = () => {
    console.log('다음글로 이동');
  };

  return (
    <div>
      <h3>Board View Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/board/components/BoardView.jsx, src/features/board/components/BoardViewBtm.jsx</p>

      {/* 게시글 상세 - 제목/등록일/조회수 + 본문(content) */}
      <BoardView
        title="2025년 공항철도 여름철도학교 지원자 모집 공고(~8/10)"
        date="2025.08.20"
        view={123456}
        content={sampleContent}
      />

      {/* 이전글/다음글 - nextTitle을 비워서 '다음글이 없습니다.' 상태도 같이 확인 */}
      <BoardViewBtm
        prevTitle="에어부산 인천국제공항제2여객터미널 이전 안내"
        prevDate="2025.08.20"
        prevHref="/board/123"
        nextTitle=""
        nextDate=""
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      />
    </div>
  );
}

export default GuideBoardView;
