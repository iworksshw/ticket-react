import React from 'react';

//ui components : frmFileList
/**
 * 공통 파일첨부 컴포넌트
 * @param {Array} files - 첨부 슬롯 배열 [{ id, name }] (name이 비어있으면 선택 전 상태)
 * @param {function} onFileChange - 파일 선택 시 호출되는 콜백 (id, FileList)
 * @param {function} onFileDelete - 삭제 버튼 클릭 시 호출되는 콜백 (id)
 * @param {function} onAddFile - 첨부파일 추가 버튼 클릭 시 호출되는 콜백 (multiple일 때만 노출)
 * @param {boolean} multiple - 다중 첨부 여부 (true면 마지막 슬롯에 '첨부파일 추가' 버튼 노출)
 * @param {string} accept - 파일 input의 accept 속성
 * @param {string} downloadHref - 양식 다운로드 링크 주소 (있으면 docDownload 링크 노출)
 * @param {string} downloadLabel - 양식 다운로드 링크 텍스트
 * @param {string} infoText - 안내 문구 (예: '* 용량제한 5MB')
 * @param {string} className - 추가적인 커스텀 클래스
 */
const FileAttach = ({
  files = [{ id: 'file1', name: '' }],
  onFileChange,
  onFileDelete,
  onAddFile,
  multiple = false,
  accept,
  downloadHref,
  downloadLabel = '양식 다운로드',
  infoText,
  className = "",
}) => {
  return (
    // frmFileList: 이 컴포넌트 전체를 감싸는 전역 클래스(scss/form/_frmFileList.scss).
    // className prop으로 외부에서 추가 스타일을 덧붙일 수 있게 열어둠.
    <div className={`frmFileList ${className}`.trim()}>
      {/* fileGroup: 첨부 슬롯(fileBox)들을 묶는 하나의 컨테이너.
          "첨부파일 추가"를 누르면 fileGroup이 늘어나는 게 아니라,
          이 fileGroup 안에서 fileBox 개수만 늘어난다(아래 files 배열 길이만큼 fileBox가 그려짐). */}
      <div className="fileGroup">
        {/* files 배열 하나당 fileBox 하나를 그린다.
            - files는 부모(Guide 등)가 useState로 들고 있는 "슬롯" 배열이다.
            - 각 슬롯은 { id, name } 형태: id는 label-input 연결용 고유 키, name은 선택된 파일명(없으면 빈 문자열). */}
        {files.map((file, index) => {
          // 마지막 슬롯인지 여부. multiple 모드일 때 "첨부파일 추가" 버튼은
          // 항상 가장 마지막 슬롯에만 노출시켜야 하므로 필요하다.
          const isLast = index === files.length - 1;

          return (
            // key는 배열 인덱스가 아니라 file.id(고유값)를 써야
            // 중간 슬롯이 삭제되어도 React가 각 row를 올바르게 추적할 수 있다.
            <div className="fileBox" key={file.id}>
              {/* fileAfter: "선택된 파일 표시 영역" - 파일명(textBox)과 삭제 버튼을 보여준다. */}
              <div className="fileAfter">
                <div className="textBox">{file.name}</div>
                {/* 삭제 클릭 시 이 슬롯의 id를 부모에게 전달, 실제 제거/초기화 로직은 부모(onFileDelete)가 담당 */}
                <button type="button" className="fileDel" onClick={() => onFileDelete?.(file.id)}>삭제</button>
              </div>
              {/* fileBefore: "파일 선택 영역" - 실제 input[type=file]은 화면에서 숨기고,
                  htmlFor로 연결된 label(btn 스타일)을 클릭하면 파일 선택창이 열리는 전형적인 패턴. */}
              <div className="fileBefore">
                {/* label의 htmlFor와 input의 id가 반드시 같은 file.id를 가리켜야 클릭이 연결된다.
                    여러 슬롯이 동시에 존재하므로 file.id가 슬롯마다 달라야 충돌이 안 난다. */}
                <label htmlFor={file.id} className="btn">파일선택</label>
                <input
                  type="file"
                  id={file.id}
                  className="uploadBtn"
                  accept={accept} // 예: 'image/*', '.pdf,.docx' 등으로 선택 가능한 파일 형식 제한
                  // 사용자가 파일을 고르면 (이 슬롯의 id, 선택된 FileList)를 그대로 부모에게 전달.
                  // 실제 파일명 갱신(setState)은 부모의 onFileChange 핸들러가 처리한다.
                  onChange={(event) => onFileChange?.(file.id, event.target.files)}
                />
                {/* multiple이 true이고, 지금 그리는 슬롯이 마지막 슬롯일 때만 추가 버튼을 보여준다.
                    클릭하면 부모가 onAddFile에서 files 배열에 새 슬롯을 push해서 fileBox가 하나 더 늘어난다. */}
                {multiple && isLast && (
                  <button type="button" className="addBtn" onClick={() => onAddFile?.()}>첨부파일 추가</button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* downloadHref가 주어졌을 때만 양식 다운로드 링크를 보여준다(옵션 기능).
          예: 신청서 양식 파일을 미리 받아 작성 후 업로드하게 하는 용도. */}
      {downloadHref && (
        <a href={downloadHref} className="docDownload">{downloadLabel}</a>
      )}

      {/* infoText가 주어졌을 때만 안내 문구(예: 용량 제한)를 보여준다. */}
      {infoText && (
        <div className="infoText red">{infoText}</div>
      )}
    </div>
  );
};

export default FileAttach;
