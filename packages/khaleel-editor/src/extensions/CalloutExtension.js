import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import CalloutComponent from '../components/CalloutComponent';
export default Node.create({
    name: 'callout',
    group: 'block',
    content: 'inline*',
    addAttributes() {
        return {
            type: {
                default: 'info',
            },
        };
    },
    parseHTML() {
        return [{ tag: 'div[data-type="callout"]' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'callout' }), 0];
    },
    addNodeView() {
        return ReactNodeViewRenderer(CalloutComponent);
    },
});
