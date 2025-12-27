import React from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'

export default (props: any) => {
  const type = props.node.attrs.type || 'info'
  
  const styles: Record<string, any> = {
    info:    { bg: '#eff6ff', border: '#3b82f6', icon: 'ℹ️', color: '#1e40af' },
    warning: { bg: '#fffbeb', border: '#f59e0b', icon: '⚠️', color: '#92400e' },
    error:   { bg: '#fef2f2', border: '#ef4444', icon: '🚫', color: '#b91c1c' },
    success: { bg: '#f0fdf4', border: '#22c55e', icon: '✅', color: '#166534' },
  }

  const currentStyle = styles[type]

  const toggleType = () => {
    const types = Object.keys(styles)
    const nextIndex = (types.indexOf(type) + 1) % types.length
    props.updateAttributes({ type: types[nextIndex] })
  }

  return (
    <NodeViewWrapper className="callout-block-wrapper">
      <div 
        className="callout-block" 
        style={{ 
          backgroundColor: currentStyle.bg, 
          borderColor: currentStyle.border,
          color: currentStyle.color,
          display: 'flex',
          padding: '1rem',
          borderRadius: '0.5rem',
          borderLeftWidth: '4px',
          margin: '1rem 0'
        }}
      >
        <div 
          className="callout-icon" 
          contentEditable={false} 
          onClick={toggleType}
          style={{ marginRight: '1rem', cursor: 'pointer', userSelect: 'none' }}
          title="Click to change style"
        >
          {currentStyle.icon}
        </div>

        <NodeViewContent className="callout-content" style={{ flex: 1 }} />
      </div>
    </NodeViewWrapper>
  )
}