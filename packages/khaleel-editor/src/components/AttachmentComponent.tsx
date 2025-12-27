import React from 'react'
import { NodeViewWrapper } from '@tiptap/react'

export default (props: any) => {
  const { fileName, fileSize, src, type } = props.node.attrs

  const downloadFile = () => {
    window.open(src, '_blank')
  }

  const isDrive = src.includes('drive.google.com') || src.includes('docs.google.com');

  return (
    <NodeViewWrapper className="attachment-card-wrapper">
      <div className={`attachment-card ${isDrive ? 'is-drive' : ''}`} contentEditable={false} onClick={downloadFile}>
        
        <div className="file-icon">
          {isDrive ? (
            <svg viewBox="0 0 87.3 78" width="24" height="24">
              <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
              <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
              <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
              <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.4-4.5 1.2z" fill="#00832d"/>
              <path d="m59.8 53h-27.5l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.5c1.6 0 3.15-.4 4.5-1.2z" fill="#2684fc"/>
              <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" color="#555"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          )}
        </div>
        
        <div className="file-info">
          <div className="file-name">{isDrive && fileName === 'file' ? 'Google Drive File' : fileName}</div>
          <div className="file-meta">
            {isDrive ? 'GOOGLE DRIVE' : `${type?.toUpperCase()} • ${fileSize}`}
          </div>
        </div>

        <div className="download-btn">
          {isDrive ? '↗' : '↓'}
        </div>
      </div>
    </NodeViewWrapper>
  )
}