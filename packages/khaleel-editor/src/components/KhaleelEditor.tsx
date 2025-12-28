import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus' 
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import BubbleMenuExtension from '@tiptap/extension-bubble-menu'
import ResizableImage from '../extensions/ResizableImage'
import { SlashCommand } from '../extensions/slashCommand'
import Youtube from '@tiptap/extension-youtube'
import AttachmentNode from '../extensions/AttachmentNode'
import { Table } from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'

import '../styles.scss'
import Toolbar from './Toolbar'
import Iframe from '../extensions/Iframe'
import CalloutExtension from '../extensions/CalloutExtension'
import Column from '../extensions/Column'
import ColumnsContainer from '../extensions/ColumnsContainer'

const lowlight = createLowlight(common)

export interface KhaleelEditorProps {
  initialContent?: string;
  onSave?: (json: object) => void;
  onUpload?: (file: File) => Promise<string>; 
}

const getDriveId = (url: string) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

const KhaleelEditor = ({ initialContent, onSave, onUpload }: KhaleelEditorProps) => {
  const editor = useEditor({
    extensions: [
      Placeholder.configure({ placeholder: "Type '/' for commands..." }),
      BubbleMenuExtension,
      SlashCommand,
      ResizableImage,
      CalloutExtension,
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      AttachmentNode,
        Table.configure({
        resizable: true, 
      }),
      TableRow,
      TableHeader,
      StarterKit.configure({
        codeBlock: false,
      }),
      
      CodeBlockLowlight.configure({
        lowlight,
      }),
      TableCell,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image', 'attachment'],
      }),
      Column,
      ColumnsContainer,
      Iframe
    ],
    content: initialContent || '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
      handleKeyDown: (view, event): boolean => {
        if (event.key === 'Tab') {
          event.preventDefault(); 
          if ((editor as any).isActive('bulletList') || (editor as any).isActive('orderedList')) {
             return (editor as any).chain().focus().sinkListItem('listItem').run();
          }

          view.dispatch(view.state.tr.insertText('    '));
          return true;
        }
        return false;
      },

      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0];
          
          if (file.type.startsWith('image/') && onUpload) {
            event.preventDefault(); 
            onUpload(file).then((url) => {
              const { schema } = view.state;
              const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
              
              if (coordinates) {
                const node = schema.nodes.image.create({ src: url });
                const transaction = view.state.tr.insert(coordinates.pos, node);
                view.dispatch(transaction);
              }
            });
            return true; 
          }

          else if (onUpload) {
            event.preventDefault();
            onUpload(file).then((url) => {
              const { schema } = view.state;
              const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
              
              if (coordinates) {
                const node = schema.nodes.attachment.create({ 
                  src: url,
                  fileName: file.name,
                  fileSize: (file.size / 1024).toFixed(1) + ' KB',
                  type: file.name.split('.').pop()
                });
                const transaction = view.state.tr.insert(coordinates.pos, node);
                view.dispatch(transaction);
              }
            });
            return true;
          }
        }
        return false;
      },
      handlePaste: (view, event, slice) => {
        const text = event.clipboardData?.getData('text/plain');
        if (!text) return false;

        if (text.includes('drive.google.com') || text.includes('docs.google.com')) {
          
          const getDriveId = (url: string) => {
            const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
            return match ? match[1] : null;
          }
          const fileId = getDriveId(text);

          if (fileId) {
            const directImageUrl = `https://lh3.googleusercontent.com/d/${fileId}`;

            const { schema } = view.state;
            
            const node = schema.nodes.image.create({ 
              src: directImageUrl,
              alt: 'Google Drive Content',
              width: '100%',
              textAlign: 'left'
            });
            
            const transaction = view.state.tr.replaceSelectionWith(node);
            view.dispatch(transaction);
            
            return true; 
          }
        }
        return false;
      }
    },
    onUpdate: ({ editor }) => {
      if (onSave) onSave(editor.getJSON()) 
    }
  })


  if (!editor) return null

  return (
    <div className="khaleel-editor-container">

      <div className="mb-4">
        <Toolbar editor={editor} onUpload={onUpload} />
      </div>

      
      {editor && (
        <BubbleMenu 
          editor={editor} 
          shouldShow={({ editor, from, to }) => {
            return !editor.isActive('image') && !editor.state.selection.empty
          }}
        >
          <div className="bubble-menu">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              Bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              Italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}
            >
              Strike
            </button>
          </div>
        </BubbleMenu>
      )}

      {editor && (
        <BubbleMenu 
          editor={editor} 
          pluginKey="imageMenu" 
          shouldShow={({ editor }) => editor.isActive('image')}
        >
          <div className="bubble-menu image-menu">
            <button 
              onClick={() => editor.chain().focus().deleteSelection().run()}
              className="delete-btn"
            >
              Remove
            </button>
          </div>
        </BubbleMenu>
      )}

      {editor && (
        <BubbleMenu 
          editor={editor} 
          pluginKey="tableMenu"
          shouldShow={({ editor }) => editor.isActive('table')} 
        >
          <div className="bubble-menu table-menu">
            <button onClick={() => editor.chain().focus().addColumnBefore().run()}>+ Col Left</button>
            <button onClick={() => editor.chain().focus().addColumnAfter().run()}>+ Col Right</button>
            <button onClick={() => editor.chain().focus().deleteColumn().run()} className="delete-btn">x Col</button>
            <div className="divider"></div>
            <button onClick={() => editor.chain().focus().addRowBefore().run()}>+ Row Up</button>
            <button onClick={() => editor.chain().focus().addRowAfter().run()}>+ Row Down</button>
            <button onClick={() => editor.chain().focus().deleteRow().run()} className="delete-btn">x Row</button>
            <div className="divider"></div>
            <button onClick={() => editor.chain().focus().deleteTable().run()} className="delete-btn">Delete Table</button>
          </div>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} className="khaleel-content" />
    </div>
  )
}

export default KhaleelEditor