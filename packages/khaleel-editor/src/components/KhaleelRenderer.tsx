import React, { JSX } from 'react'
import '../styles.scss'

const renderTextNodes = (node: any) => {
  if (!node.content) return node.text || ''
  
  return node.content.map((child: any, index: number) => {
    let element = <span key={index}>{child.text}</span>

    if (child.marks) {
      child.marks.forEach((mark: any) => {
        if (mark.type === 'bold') element = <strong key={index}>{element}</strong>
        if (mark.type === 'italic') element = <em key={index}>{element}</em>
        if (mark.type === 'strike') element = <s key={index}>{element}</s>
        if (mark.type === 'underline') element = <u key={index}>{element}</u>
        if (mark.type === 'code') element = <code key={index} className="bg-gray-100 rounded px-1 font-mono text-sm text-red-500">{element}</code>

        if (mark.type === 'link') {
            element = (
                <a href={mark.attrs.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800" key={index}>
                    {child.text}
                </a>
            )
        }
      })
    }
    return element
  })
}

const ImageRenderer = ({ block }: { block: any }) => {
  const [error, setError] = React.useState(false);
  const justifyMap: Record<string, string> = { left: 'flex-start', center: 'center', right: 'flex-end' };
  const alignment = block.attrs.textAlign || 'left';

  if (error) {
     return (
        <div className="attachment-card-wrapper my-4">
            <a href={block.attrs.src} target="_blank" rel="noreferrer" className="attachment-card">
               <div className="file-icon">📄</div>
               <div className="file-info"><div className="file-name">View File</div></div>
               <div className="download-btn">↗</div>
            </a>
        </div>
     )
  }

  return (
    <div className="my-4 flex" style={{ justifyContent: justifyMap[alignment] || 'flex-start' }}>
      <img 
        src={block.attrs.src} 
        alt={block.attrs.alt || ''} 
        style={{ width: block.attrs.width || '100%', maxWidth: '100%' }}
        className="rounded-lg h-auto"
        onError={() => setError(true)}
        referrerPolicy="no-referrer"
      />
    </div>
  )
}

const renderBlock = (block: any, index: number) => {
  
  const getStyles = (b: any) => {
    const styles: React.CSSProperties = {};
    if (b.attrs?.textAlign) {
      styles.textAlign = b.attrs.textAlign as any;
    }
    return styles;
  }

  if (block.type === 'paragraph') {
      if (!block.content) return <p key={index} className="h-4" />
      return <p key={index} style={getStyles(block)}>{renderTextNodes(block)}</p>
  }

  if (block.type === 'heading') {
      const Tag = `h${block.attrs.level}` as keyof JSX.IntrinsicElements
      return <Tag key={index} style={getStyles(block)}>{renderTextNodes(block)}</Tag>
  }

  if (block.type === 'columnsContainer') {
      return (
        <div key={index} className="flex gap-4 my-4 flex-col sm:flex-row">
            {block.content && block.content.map((col: any, i: number) => (
                <div key={i} className="flex-1 min-w-0">
                    {col.content && col.content.map((child: any, j: number) => renderBlock(child, j))}
                </div>
            ))}
        </div>
      )
  }

  if (block.type === 'callout') {
      const type = block.attrs.type || 'info'
      const styles: Record<string, any> = {
        info:    { bg: '#eff6ff', border: '#3b82f6', icon: 'ℹ️', color: '#1e40af' },
        warning: { bg: '#fffbeb', border: '#f59e0b', icon: '⚠️', color: '#92400e' },
        error:   { bg: '#fef2f2', border: '#ef4444', icon: '🚫', color: '#b91c1c' },
        success: { bg: '#f0fdf4', border: '#22c55e', icon: '✅', color: '#166534' },
      }
      const s = styles[type]

      return (
        <div key={index} className="my-4 p-4 rounded-lg border-l-4 flex" style={{ backgroundColor: s.bg, borderColor: s.border, color: s.color }}>
           <div className="mr-4 select-none">{s.icon}</div>
           <div className="flex-1">
             {block.content && block.content.map((child: any, i: number) => (
                 <p key={i} className="m-0">{renderTextNodes({ content: [child] })}</p>
             ))}
           </div>
        </div>
      )
  }

  if (block.type === 'blockquote') {
    return (
      <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4" style={getStyles(block)}>
        {block.content.map((nested: any, i: number) => renderBlock(nested, i))}
      </blockquote>
    )
  }

  if (block.type === 'bulletList') {
    return (
      <ul key={index}>
        {block.content.map((listItem: any, liIndex: number) => (
          <li key={liIndex}>{renderBlock(listItem.content[0], liIndex)}</li>
        ))}
      </ul>
    )
  }

  if (block.type === 'orderedList') {
    return (
      <ol key={index}>
        {block.content.map((listItem: any, liIndex: number) => (
          <li key={liIndex}>{renderBlock(listItem.content[0], liIndex)}</li>
        ))}
      </ol>
    )
  }

  if (block.type === 'image') {
     return <ImageRenderer key={index} block={block} />
  }

  if (block.type === 'youtube') {
      const rawSrc = block.attrs.src || '';
      
      const match = rawSrc.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
      const videoId = (match && match[2].length === 11) ? match[2] : null;

      const embedSrc = videoId 
        ? `https://www.youtube.com/embed/${videoId}` 
        : rawSrc; 

      return (
          <div key={index} className="my-6 flex justify-center">
              <iframe 
                  src={embedSrc} 
                  className="w-full aspect-video rounded-lg shadow-sm"
                  style={{ border: 'none', maxWidth: '800px' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube video player"
              ></iframe>
          </div>
      )
  }

  if (block.type === 'attachment') {
      const isDrive = block.attrs.src.includes('drive.google.com') || block.attrs.src.includes('docs.google.com');

      return (
          <div key={index} className="attachment-card-wrapper my-4">
              <a href={block.attrs.src} target="_blank" rel="noreferrer" className="attachment-card" style={{ textDecoration: 'none' }}>
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
                        <span style={{ fontSize: '20px' }}>📄</span>
                    )}
                  </div>
                  <div className="file-info">
                      <div className="file-name" style={{ color: '#000' }}>{block.attrs.fileName}</div>
                      <div className="file-meta">{isDrive ? 'GOOGLE DRIVE' : `${block.attrs.type?.toUpperCase()} • ${block.attrs.fileSize}`}</div>
                  </div>
                  <div className="download-btn">
                      {isDrive ? '↗' : '↓'}
                  </div>
              </a>
          </div>
      )
  }

  if (block.type === 'table') {
    return (
      <div className="overflow-x-auto my-4" key={index}>
        <table className="min-w-full border-collapse border border-gray-300" style={{ tableLayout: 'fixed' }}>
          <tbody>
            {block.content.map((row: any, rIndex: number) => (
              <tr key={rIndex}>
                {row.content.map((cell: any, cIndex: number) => {
                    const CellTag = cell.type === 'tableHeader' ? 'th' : 'td';
                    const width = cell.attrs?.colwidth ? `${cell.attrs.colwidth[0]}px` : 'auto';

                    return (
                      <CellTag 
                        key={cIndex} 
                        className={`border border-gray-300 p-2 ${cell.type === 'tableHeader' ? 'bg-gray-100 font-bold' : ''}`}
                        colSpan={cell.attrs?.colspan}
                        rowSpan={cell.attrs?.rowspan}
                        style={{ width: width, verticalAlign: 'top' }}
                      >
                        {cell.content && cell.content.map((nestedBlock: any, i: number) => renderBlock(nestedBlock, i))}
                      </CellTag>
                    )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (block.type === 'iframe') {
    return (
      <div key={index} className="my-6 relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
        <iframe 
          src={block.attrs.src} 
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-sm border border-gray-200"
          allowFullScreen
        ></iframe>
      </div>
    )
  }

  if (block.type === 'codeBlock') {
      const language = block.attrs.language || 'text'
      return (
        <pre key={index} className="my-4 p-4 rounded bg-gray-900 text-gray-100 overflow-x-auto">
            <code className={`language-${language}`}>
                {block.content && block.content[0] && block.content[0].text}
            </code>
        </pre>
      )
  }

  return null
}

const KhaleelRenderer = ({ content }: { content: any }) => {
  if (!content || !content.content) return null

  return (
    <div className="khaleel-renderer ProseMirror">
      {content.content.map((block: any, index: number) => renderBlock(block, index))}
    </div>
  )
}

export default KhaleelRenderer