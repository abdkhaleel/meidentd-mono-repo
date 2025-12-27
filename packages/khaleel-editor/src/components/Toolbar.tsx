import React from 'react'
import { 
  Bold, Italic, Underline, Strikethrough, Code, 
  Heading1, Heading2, Heading3, 
  List, ListOrdered, Quote, 
  AlignLeft, AlignCenter, AlignRight, 
  Link as LinkIcon, Image as ImageIcon, Youtube, 
  Undo, Redo, Table as TableIcon 
} from 'lucide-react'

const Toolbar = ({ editor, onUpload }: { editor: any, onUpload?: (file: File) => Promise<string> }) => {
  if (!editor) return null

  const isActive = (type: string | any, opts?: any) => editor.isActive(type, opts) ? 'is-active' : ''

  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }

  const addVideo = () => {
    const url = window.prompt('Enter YouTube URL:')
    if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run()
  }

  return (
    <div className="khaleel-toolbar-fixed">
      <div className="toolbar-group">
        <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <Undo size={18} />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <Redo size={18} />
        </button>
      </div>

      <div className="divider"></div>

      <div className="toolbar-group">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={isActive('bold')}>
          <Bold size={18} />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={isActive('italic')}>
          <Italic size={18} />
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={isActive('underline')}>
          <Underline size={18} />
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={isActive('strike')}>
          <Strikethrough size={18} />
        </button>
        <button onClick={() => editor.chain().focus().toggleCode().run()} className={isActive('code')}>
          <Code size={18} />
        </button>
      </div>

      <div className="divider"></div>

      <div className="toolbar-group">
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={isActive('heading', { level: 1 })}>
          <Heading1 size={18} />
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={isActive('heading', { level: 2 })}>
          <Heading2 size={18} />
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={isActive('heading', { level: 3 })}>
          <Heading3 size={18} />
        </button>
      </div>

      <div className="divider"></div>

      <div className="toolbar-group">
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={isActive('bulletList')}>
          <List size={18} />
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={isActive('orderedList')}>
          <ListOrdered size={18} />
        </button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={isActive('blockquote')}>
          <Quote size={18} />
        </button>
        
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={isActive({ textAlign: 'left' })}>
          <AlignLeft size={18} />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={isActive({ textAlign: 'center' })}>
          <AlignCenter size={18} />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={isActive({ textAlign: 'right' })}>
          <AlignRight size={18} />
        </button>
      </div>

      <div className="divider"></div>

      <div className="toolbar-group">
        <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
          <TableIcon size={18} />
        </button>
        <button onClick={addImage}>
          <ImageIcon size={18} />
        </button>
        <button onClick={addVideo}>
          <Youtube size={18} />
        </button>
      </div>

    </div>
  )
}

export default Toolbar