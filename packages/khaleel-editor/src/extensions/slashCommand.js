import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import { ReactRenderer } from '@tiptap/react';
import tippy from 'tippy.js';
import CommandList from '../components/CommandList';
const getSuggestionItems = ({ query }) => {
    return [
        {
            title: 'Heading 1',
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run();
            },
        },
        {
            title: 'Heading 2',
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run();
            },
        },
        {
            title: 'Bullet List',
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).toggleBulletList().run();
            },
        },
        {
            title: 'Image',
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).run();
                // You can add a file picker trigger here later
                alert("Drag & Drop an image to upload!");
            },
        },
        {
            title: 'YouTube',
            command: ({ editor, range }) => {
                const url = prompt('Enter YouTube URL:');
                if (url) {
                    editor.chain().focus().deleteRange(range).setYoutubeVideo({ src: url }).run();
                }
            },
        },
        {
            title: 'Table',
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range)
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run();
            },
        },
        {
            title: 'Drive Video Player',
            command: ({ editor, range }) => {
                const url = prompt('Enter Google Drive Video Link:');
                if (url) {
                    // 1. Convert "View" link to "Preview" link (Required for embedding)
                    // Input:  https://drive.google.com/file/d/VIDEO_ID/view?usp=sharing
                    // Output: https://drive.google.com/file/d/VIDEO_ID/preview
                    let embedUrl = url;
                    if (url.includes('drive.google.com') && url.includes('/view')) {
                        embedUrl = url.replace(/\/view.*/, '/preview');
                    }
                    // 2. Insert the Iframe
                    editor.chain().focus()
                        .deleteRange(range)
                        .setIframe({ src: embedUrl })
                        .run();
                }
            },
        },
        {
            title: 'Callout / Alert',
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).insertContent({ type: 'callout' }).run();
            },
        },
        {
            title: 'Code Block',
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
            },
        },
        {
            title: '2 Columns',
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range)
                    .insertContent({
                    type: 'columnsContainer',
                    content: [
                        { type: 'column', content: [{ type: 'paragraph' }] },
                        { type: 'column', content: [{ type: 'paragraph' }] }
                    ]
                })
                    .run();
            },
        },
        {
            title: '3 Columns',
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range)
                    .insertContent({
                    type: 'columnsContainer',
                    content: [
                        { type: 'column', content: [{ type: 'paragraph' }] },
                        { type: 'column', content: [{ type: 'paragraph' }] },
                        { type: 'column', content: [{ type: 'paragraph' }] }
                    ]
                })
                    .run();
            },
        },
    ].filter(item => item.title.toLowerCase().startsWith(query.toLowerCase()));
};
export const SlashCommand = Extension.create({
    name: 'slashCommand',
    addProseMirrorPlugins() {
        return [
            Suggestion({
                editor: this.editor,
                char: '/',
                items: getSuggestionItems,
                command: ({ editor, range, props }) => {
                    props.command({ editor, range });
                },
                render: () => {
                    let component;
                    let popup;
                    return {
                        onStart: (props) => {
                            component = new ReactRenderer(CommandList, {
                                props,
                                editor: props.editor,
                            });
                            if (!props.clientRect) {
                                return;
                            }
                            popup = tippy('body', {
                                getReferenceClientRect: props.clientRect,
                                appendTo: () => document.body,
                                content: component.element,
                                showOnCreate: true,
                                interactive: true,
                                trigger: 'manual',
                                placement: 'bottom-start',
                            });
                        },
                        onUpdate(props) {
                            component.updateProps(props);
                            if (!props.clientRect) {
                                return;
                            }
                            popup[0].setProps({
                                getReferenceClientRect: props.clientRect,
                            });
                        },
                        onKeyDown(props) {
                            if (props.event.key === 'Escape') {
                                popup[0].hide();
                                return true;
                            }
                            // Delegates the key event to the React Component
                            return component.ref?.onKeyDown(props);
                        },
                        onExit() {
                            popup[0].destroy();
                            component.destroy();
                        },
                    };
                },
            }),
        ];
    },
});
