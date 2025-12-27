import Image from '@tiptap/extension-image'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ImageResizeComponent from '../components/ImageResizeComponent'

export default Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: '100%',
        renderHTML: attributes => ({
          width: attributes.width,
        }),
      },
      textAlign: {
        default: 'left',
        renderHTML: attributes => ({
          style: `text-align: ${attributes.textAlign}`,
        }),
      },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageResizeComponent)
  },
})