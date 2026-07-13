import { useRef, useState } from 'react';
import FileAttach from '@/components/common/forms/FileAttach';

function GuideFileAttach() {
  // FileAttach는 자신의 상태를 직접 들고 있지 않는 controlled 컴포넌트라서,
  // "지금 어떤 슬롯들이 있고 각 슬롯에 어떤 파일이 선택됐는지"는 항상 이 화면(부모)이 state로 관리한다.
  // 슬롯 1개 = { id, name } 객체 하나. id는 label-input 연결용 고유 키, name은 선택된 파일명.

  // 단일 첨부 데모 - 슬롯이 1개로 고정되어 있고(추가 버튼 없음), 양식 다운로드 링크를 함께 보여준다.
  const [singleFiles, setSingleFiles] = useState([{ id: 'single-file', name: '' }]);

  // 다중 첨부 데모 - "첨부파일 추가" 버튼으로 슬롯이 늘어나고, 삭제하면 줄어든다. 용량 안내 문구도 함께 보여준다.
  const [multiFiles, setMultiFiles] = useState([{ id: 'multi-file-1', name: '' }]);

  // 새 슬롯 id 발급용 카운터. 배열 길이로 id를 만들면 삭제 후 추가 시 이미 남아있는 슬롯의 id와 충돌할 수 있어서,
  // 삭제 여부와 무관하게 한 번 쓴 번호는 재사용하지 않도록 별도로 계속 증가시킨다.
  const nextMultiIdRef = useRef(2);

  // 단일 첨부에서 파일을 선택했을 때.
  // FileAttach가 (변경된 슬롯의 id, 사용자가 고른 FileList)를 넘겨주므로,
  // id가 일치하는 슬롯만 찾아서 name을 첫 번째 파일명으로 갱신한다(나머지 슬롯은 그대로 유지).
  const handleSingleChange = (id, fileList) => {
    const file = fileList?.[0];
    setSingleFiles((prev) => prev.map((f) => (f.id === id ? { ...f, name: file?.name || '' } : f)));
  };

  // 삭제 버튼을 누르면 슬롯 자체를 배열에서 빼지 않고, 그 슬롯의 name만 빈 문자열로 되돌린다.
  // (단일 첨부는 슬롯 개수가 항상 1개여야 하므로 "선택 취소" 동작에 가깝다.)
  const handleSingleDelete = (id) => {
    setSingleFiles((prev) => prev.map((f) => (f.id === id ? { ...f, name: '' } : f)));
  };

  // 다중 첨부에서 파일을 선택했을 때. 단일 첨부와 동일하게 id로 슬롯을 찾아 name만 갱신한다.
  const handleMultiChange = (id, fileList) => {
    const file = fileList?.[0];
    setMultiFiles((prev) => prev.map((f) => (f.id === id ? { ...f, name: file?.name || '' } : f)));
  };

  // 다중 첨부는 단일 첨부와 달리 "삭제 = 슬롯을 배열에서 완전히 제거"한다(fileBox 자체가 줄어듦).
  // 단, 마지막 남은 슬롯까지 지워버리면 첨부할 방법이 없어지므로
  // 그 경우에는 빈 슬롯 하나를 다시 채워 넣어 최소 1개는 항상 유지되게 한다.
  const handleMultiDelete = (id) => {
    setMultiFiles((prev) => {
      const next = prev.filter((f) => f.id !== id);
      // 마지막 슬롯까지 삭제되면 빈 슬롯 하나는 남겨둔다.
      return next.length > 0 ? next : [{ id: 'multi-file-1', name: '' }];
    });
  };

  // "첨부파일 추가" 버튼(FileAttach의 onAddFile)을 누르면 호출됨.
  // 기존 슬롯 배열 끝에 빈 슬롯 하나를 추가한다 → FileAttach 입장에서는 fileBox가 하나 더 늘어나는 것으로 보인다.
  // id는 현재 슬롯 개수를 이용해 만들어 항상 고유하게 유지한다(예: multi-file-2, multi-file-3 ...).
  const handleMultiAdd = () => {
    const id = `multi-file-${nextMultiIdRef.current++}`;
    setMultiFiles((prev) => [...prev, { id, name: '' }]);
  };

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>File Attach Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/forms/FileAttach.jsx</p>
      </section>

      <section>
        <h4>단일 첨부 + 양식 다운로드</h4>
        {/* multiple을 주지 않으면(기본값 false) 추가 버튼이 노출되지 않아 슬롯이 1개로 고정된다.
            downloadHref/downloadLabel을 주면 양식 다운로드 링크가 같이 보인다. */}
        <FileAttach
          files={singleFiles}
          onFileChange={handleSingleChange}
          onFileDelete={handleSingleDelete}
          downloadHref="/files/sample-form.xlsx"
          downloadLabel="참가자 양식 다운로드"
        />
      </section>

      <section>
        <h4>다중 첨부 + 용량 안내</h4>
        {/* multiple을 true로 주면 마지막 슬롯에 '첨부파일 추가' 버튼이 보이고,
            onAddFile(handleMultiAdd)로 슬롯이 늘어난다. infoText는 용량 제한 같은 안내문 표시용. */}
        <FileAttach
          files={multiFiles}
          multiple
          onFileChange={handleMultiChange}
          onFileDelete={handleMultiDelete}
          onAddFile={handleMultiAdd}
          infoText="* 용량제한 5MB"
        />
      </section>
    </div>
  );
}

export default GuideFileAttach;
