import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import ResizableImage from '../extensions/ResizableImage';
import { SlashCommand } from '../extensions/slashCommand';
import Youtube from '@tiptap/extension-youtube';
import AttachmentNode from '../extensions/AttachmentNode';
import { Table } from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import '../styles.scss';
import Toolbar from './Toolbar';
import Iframe from '../extensions/Iframe';
import CalloutExtension from '../extensions/CalloutExtension';
import Column from '../extensions/Column';
import ColumnsContainer from '../extensions/ColumnsContainer';
const lowlight = createLowlight(common);
const getDriveId = (url) => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
};
const KhaleelEditor = ({ initialContent, onSave, onUpload }) => {
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
            handleKeyDown: (view, event) => {
                if (event.key === 'Tab') {
                    event.preventDefault();
                    if (editor.isActive('bulletList') || editor.isActive('orderedList')) {
                        return editor.chain().focus().sinkListItem('listItem').run();
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
                if (!text)
                    return false;
                if (text.includes('drive.google.com') || text.includes('docs.google.com')) {
                    const getDriveId = (url) => {
                        const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
                        return match ? match[1] : null;
                    };
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
            if (onSave)
                onSave(editor.getJSON());
        }
    });
    if (!editor)
        return null;
    return (_jsxs("div", { className: "khaleel-editor-container", children: [_jsx("div", { className: "mb-4", children: _jsx(Toolbar, { editor: editor, onUpload: onUpload }) }), editor && (_jsx(BubbleMenu, { editor: editor, shouldShow: ({ editor, from, to }) => {
                    return !editor.isActive('image') && !editor.state.selection.empty;
                }, children: _jsxs("div", { className: "bubble-menu", children: [_jsx("button", { onClick: () => editor.chain().focus().toggleBold().run(), className: editor.isActive('bold') ? 'is-active' : '', children: "Bold" }), _jsx("button", { onClick: () => editor.chain().focus().toggleItalic().run(), className: editor.isActive('italic') ? 'is-active' : '', children: "Italic" }), _jsx("button", { onClick: () => editor.chain().focus().toggleStrike().run(), className: editor.isActive('strike') ? 'is-active' : '', children: "Strike" })] }) })), editor && (_jsx(BubbleMenu, { editor: editor, pluginKey: "imageMenu", shouldShow: ({ editor }) => editor.isActive('image'), children: _jsx("div", { className: "bubble-menu image-menu", children: _jsx("button", { onClick: () => editor.chain().focus().deleteSelection().run(), className: "delete-btn", children: "Remove" }) }) })), editor && (_jsx(BubbleMenu, { editor: editor, pluginKey: "tableMenu", shouldShow: ({ editor }) => editor.isActive('table'), children: _jsxs("div", { className: "bubble-menu table-menu", children: [_jsx("button", { onClick: () => editor.chain().focus().addColumnBefore().run(), children: "+ Col Left" }), _jsx("button", { onClick: () => editor.chain().focus().addColumnAfter().run(), children: "+ Col Right" }), _jsx("button", { onClick: () => editor.chain().focus().deleteColumn().run(), className: "delete-btn", children: "x Col" }), _jsx("div", { className: "divider" }), _jsx("button", { onClick: () => editor.chain().focus().addRowBefore().run(), children: "+ Row Up" }), _jsx("button", { onClick: () => editor.chain().focus().addRowAfter().run(), children: "+ Row Down" }), _jsx("button", { onClick: () => editor.chain().focus().deleteRow().run(), className: "delete-btn", children: "x Row" }), _jsx("div", { className: "divider" }), _jsx("button", { onClick: () => editor.chain().focus().deleteTable().run(), className: "delete-btn", children: "Delete Table" })] }) })), _jsx(EditorContent, { editor: editor, className: "khaleel-content" })] }));
};
export default KhaleelEditor;
