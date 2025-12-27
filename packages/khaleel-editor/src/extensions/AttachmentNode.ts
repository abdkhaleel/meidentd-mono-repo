import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import AttachmentComponent from '../components/AttachmentComponent'

export default Node.create({
  name: 'attachment',
  group: 'block',
  atom: true, 

  addAttributes() {
    return {
      src: { default: null },
      fileName: { default: 'file' },
      fileSize: { default: '' },
      type: { default: 'file' },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="attachment"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'attachment' })]
  },

  addNodeView() {
    return ReactNodeViewRenderer(AttachmentComponent)
  },
})