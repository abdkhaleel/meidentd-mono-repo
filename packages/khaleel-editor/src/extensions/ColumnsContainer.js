import { Node, mergeAttributes } from '@tiptap/core';
export default Node.create({
    name: 'columnsContainer',
    group: 'block',
    content: 'column+',
    parseHTML() {
        return [{ tag: 'div[data-type="columns-container"]' }];
    },
    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            mergeAttributes(HTMLAttributes, { 'data-type': 'columns-container' }),
            0
        ];
    },
});
