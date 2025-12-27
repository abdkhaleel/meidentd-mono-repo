import React, { useState, useRef, useEffect } from 'react'
import { NodeViewWrapper } from '@tiptap/react'

export default (props: any) => {
  const [width, setWidth] = useState(props.node.attrs.width || '100%')
  const alignment = props.node.attrs.textAlign || 'left'
  
  const [isResizing, setIsResizing] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  const justifyMap: Record<string, string> = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  }

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault()
    setIsResizing(true)

    const startX = event.clientX
    const startWidth = imageRef.current ? imageRef.current.offsetWidth : 0

    const onMouseMove = (e: MouseEvent) => {
      if (!startWidth) return
      const currentX = e.clientX
      const diffX = currentX - startX
      
      // Logic to handle resizing from center or right depending on alignment could go here,
      // but simple additive resizing is usually enough for basic UX.
      const newWidth = startWidth + diffX
      
      setWidth(`${newWidth}px`)
    }

    const onMouseUp = (e: MouseEvent) => {
      setIsResizing(false)
      const currentX = e.clientX
      const diffX = currentX - startX
      const finalWidth = startWidth + diffX
      
      // Save width to JSON
      props.updateAttributes({ width: `${finalWidth}px` })

      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  if (hasError) {
    return (
      <NodeViewWrapper className="attachment-card-wrapper">
         <div className="attachment-card" contentEditable={false} onClick={() => window.open(props.node.attrs.src, '_blank')}>
            <div className="file-icon">
              <svg viewBox="0 0 87.3 78" width="24" height="24"><path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/><path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/><path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/><path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.4-4.5 1.2z" fill="#00832d"/><path d="m59.8 53h-27.5l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.5c1.6 0 3.15-.4 4.5-1.2z" fill="#2684fc"/><path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/></svg>
            </div>
            <div className="file-info">
               <div className="file-name">Google Drive File</div>
               <div className="file-meta">Unable to preview image</div>
            </div>
            <div className="download-btn">↗</div>
         </div>
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper 
      className="image-resizer-container" 
      style={{ display: 'flex', justifyContent: justifyMap[alignment] || 'flex-start', width: '100%', margin: '1rem 0' }}
    >
      <div className="image-wrapper" style={{ width: width, position: 'relative', display: 'inline-block' }}>
        <img
          ref={imageRef}
          src={props.node.attrs.src}
          alt={props.node.attrs.alt}
          style={{ width: '100%', display: 'block', borderRadius: '8px' }}
          className={props.selected ? 'ProseMirror-selectednode' : ''}
          
          onError={() => setHasError(true)}
          
          referrerPolicy="no-referrer"
        />
        <div className="image-resizer-handle" onMouseDown={handleMouseDown} />
      </div>
    </NodeViewWrapper>
  )
}