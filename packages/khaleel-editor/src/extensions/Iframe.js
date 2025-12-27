import { Node, mergeAttributes } from '@tiptap/core';
export default Node.create({
    name: 'iframe',
    group: 'block',
    atom: true,
    addOptions() {
        return {
            allowFullscreen: true,
            HTMLAttributes: {
                class: 'iframe-wrapper',
                style: 'width: 100%; height: 400px; border: none;', // Default styles
            },
        };
    },
    addAttributes() {
        return {
            src: {
                default: null,
            },
        };
    },
    parseHTML() {
        return [
            {
                tag: 'iframe',
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['div', { class: 'iframe-container' }, ['iframe', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]];
    },
    addCommands() {
        return {
            setIframe: (options) => ({ tr, dispatch }) => {
                const { selection } = tr;
                const node = this.type.create(options);
                if (dispatch) {
                    tr.replaceRangeWith(selection.from, selection.to, node);
                }
                return true;
            },
        };
    },
});
