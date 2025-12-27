import { Node, mergeAttributes } from '@tiptap/core'

export default Node.create({
  name: 'column',
  content: 'block+', 
  isolating: true, 
  
  addAttributes() {
    return {
      width: {
        default: '50%',
        renderHTML: (attributes) => ({
          'data-width': attributes.width, 
        }),
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="column"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'column' }), 0]
  },
})