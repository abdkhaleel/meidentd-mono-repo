import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import '../styles.scss';
// 1. Helper to render Inline Styles
const renderTextNodes = (node) => {
    if (!node.content)
        return node.text || '';
    return node.content.map((child, index) => {
        let element = _jsx("span", { children: child.text }, index);
        if (child.marks) {
            child.marks.forEach((mark) => {
                if (mark.type === 'bold')
                    element = _jsx("strong", { children: element }, index);
                if (mark.type === 'italic')
                    element = _jsx("em", { children: element }, index);
                if (mark.type === 'strike')
                    element = _jsx("s", { children: element }, index);
                if (mark.type === 'underline')
                    element = _jsx("u", { children: element }, index);
                if (mark.type === 'code')
                    element = _jsx("code", { className: "bg-gray-100 rounded px-1 font-mono text-sm text-red-500", children: element }, index);
                if (mark.type === 'link') {
                    element = (_jsx("a", { href: mark.attrs.href, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 underline hover:text-blue-800", children: child.text }, index));
                }
            });
        }
        return element;
    });
};
// Helper to handle image errors
const ImageRenderer = ({ block }) => {
    const [error, setError] = React.useState(false);
    const justifyMap = { left: 'flex-start', center: 'center', right: 'flex-end' };
    const alignment = block.attrs.textAlign || 'left';
    if (error) {
        return (_jsx("div", { className: "attachment-card-wrapper my-4", children: _jsxs("a", { href: block.attrs.src, target: "_blank", rel: "noreferrer", className: "attachment-card", children: [_jsx("div", { className: "file-icon", children: "\uD83D\uDCC4" }), _jsx("div", { className: "file-info", children: _jsx("div", { className: "file-name", children: "View File" }) }), _jsx("div", { className: "download-btn", children: "\u2197" })] }) }));
    }
    return (_jsx("div", { className: "my-4 flex", style: { justifyContent: justifyMap[alignment] || 'flex-start' }, children: _jsx("img", { src: block.attrs.src, alt: block.attrs.alt || '', style: { width: block.attrs.width || '100%', maxWidth: '100%' }, className: "rounded-lg h-auto", onError: () => setError(true), referrerPolicy: "no-referrer" }) }));
};
// 2. Recursive Block Renderer
const renderBlock = (block, index) => {
    const getStyles = (b) => {
        const styles = {};
        if (b.attrs?.textAlign) {
            styles.textAlign = b.attrs.textAlign;
        }
        return styles;
    };
    if (block.type === 'paragraph') {
        if (!block.content)
            return _jsx("p", { className: "h-4" }, index);
        return _jsx("p", { style: getStyles(block), children: renderTextNodes(block) }, index);
    }
    if (block.type === 'heading') {
        const Tag = `h${block.attrs.level}`;
        return _jsx(Tag, { style: getStyles(block), children: renderTextNodes(block) }, index);
    }
    if (block.type === 'columnsContainer') {
        return (_jsx("div", { className: "flex gap-4 my-4 flex-col sm:flex-row", children: block.content && block.content.map((col, i) => (_jsx("div", { className: "flex-1 min-w-0", children: col.content && col.content.map((child, j) => renderBlock(child, j)) }, i))) }, index));
    }
    if (block.type === 'callout') {
        const type = block.attrs.type || 'info';
        const styles = {
            info: { bg: '#eff6ff', border: '#3b82f6', icon: 'ℹ️', color: '#1e40af' },
            warning: { bg: '#fffbeb', border: '#f59e0b', icon: '⚠️', color: '#92400e' },
            error: { bg: '#fef2f2', border: '#ef4444', icon: '🚫', color: '#b91c1c' },
            success: { bg: '#f0fdf4', border: '#22c55e', icon: '✅', color: '#166534' },
        };
        const s = styles[type];
        return (_jsxs("div", { className: "my-4 p-4 rounded-lg border-l-4 flex", style: { backgroundColor: s.bg, borderColor: s.border, color: s.color }, children: [_jsx("div", { className: "mr-4 select-none", children: s.icon }), _jsx("div", { className: "flex-1", children: block.content && block.content.map((child, i) => (_jsx("p", { className: "m-0", children: renderTextNodes({ content: [child] }) }, i))) })] }, index));
    }
    if (block.type === 'blockquote') {
        return (_jsx("blockquote", { className: "border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4", style: getStyles(block), children: block.content.map((nested, i) => renderBlock(nested, i)) }, index));
    }
    if (block.type === 'bulletList') {
        return (_jsx("ul", { children: block.content.map((listItem, liIndex) => (_jsx("li", { children: renderBlock(listItem.content[0], liIndex) }, liIndex))) }, index));
    }
    if (block.type === 'orderedList') {
        return (_jsx("ol", { children: block.content.map((listItem, liIndex) => (_jsx("li", { children: renderBlock(listItem.content[0], liIndex) }, liIndex))) }, index));
    }
    if (block.type === 'image') {
        return _jsx(ImageRenderer, { block: block }, index);
    }
    // --- YOUTUBE (UPDATED) ---
    if (block.type === 'youtube') {
        const rawSrc = block.attrs.src || '';
        // ✅ Logic to extract Video ID from various YouTube URL formats:
        // 1. Standard: https://www.youtube.com/watch?v=dQw4w9WgXcQ
        // 2. Share: https://youtu.be/dQw4w9WgXcQ
        // 3. Embed: https://www.youtube.com/embed/dQw4w9WgXcQ
        const match = rawSrc.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
        const videoId = (match && match[2].length === 11) ? match[2] : null;
        // Construct the safe embed URL
        const embedSrc = videoId
            ? `https://www.youtube.com/embed/${videoId}`
            : rawSrc; // Fallback if parsing fails
        return (_jsx("div", { className: "my-6 flex justify-center", children: _jsx("iframe", { src: embedSrc, className: "w-full aspect-video rounded-lg shadow-sm", style: { border: 'none', maxWidth: '800px' }, allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, title: "YouTube video player" }) }, index));
    }
    if (block.type === 'attachment') {
        const isDrive = block.attrs.src.includes('drive.google.com') || block.attrs.src.includes('docs.google.com');
        return (_jsx("div", { className: "attachment-card-wrapper my-4", children: _jsxs("a", { href: block.attrs.src, target: "_blank", rel: "noreferrer", className: "attachment-card", style: { textDecoration: 'none' }, children: [_jsx("div", { className: "file-icon", children: isDrive ? (_jsxs("svg", { viewBox: "0 0 87.3 78", width: "24", height: "24", children: [_jsx("path", { d: "m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z", fill: "#0066da" }), _jsx("path", { d: "m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z", fill: "#00ac47" }), _jsx("path", { d: "m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z", fill: "#ea4335" }), _jsx("path", { d: "m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.4-4.5 1.2z", fill: "#00832d" }), _jsx("path", { d: "m59.8 53h-27.5l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.5c1.6 0 3.15-.4 4.5-1.2z", fill: "#2684fc" }), _jsx("path", { d: "m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z", fill: "#ffba00" })] })) : (_jsx("span", { style: { fontSize: '20px' }, children: "\uD83D\uDCC4" })) }), _jsxs("div", { className: "file-info", children: [_jsx("div", { className: "file-name", style: { color: '#000' }, children: block.attrs.fileName }), _jsx("div", { className: "file-meta", children: isDrive ? 'GOOGLE DRIVE' : `${block.attrs.type?.toUpperCase()} • ${block.attrs.fileSize}` })] }), _jsx("div", { className: "download-btn", children: isDrive ? '↗' : '↓' })] }) }, index));
    }
    if (block.type === 'table') {
        return (_jsx("div", { className: "overflow-x-auto my-4", children: _jsx("table", { className: "min-w-full border-collapse border border-gray-300", style: { tableLayout: 'fixed' }, children: _jsx("tbody", { children: block.content.map((row, rIndex) => (_jsx("tr", { children: row.content.map((cell, cIndex) => {
                            const CellTag = cell.type === 'tableHeader' ? 'th' : 'td';
                            const width = cell.attrs?.colwidth ? `${cell.attrs.colwidth[0]}px` : 'auto';
                            return (_jsx(CellTag, { className: `border border-gray-300 p-2 ${cell.type === 'tableHeader' ? 'bg-gray-100 font-bold' : ''}`, colSpan: cell.attrs?.colspan, rowSpan: cell.attrs?.rowspan, style: { width: width, verticalAlign: 'top' }, children: cell.content && cell.content.map((nestedBlock, i) => renderBlock(nestedBlock, i)) }, cIndex));
                        }) }, rIndex))) }) }) }, index));
    }
    if (block.type === 'iframe') {
        return (_jsx("div", { className: "my-6 relative w-full", style: { paddingBottom: '56.25%', height: 0 }, children: _jsx("iframe", { src: block.attrs.src, className: "absolute top-0 left-0 w-full h-full rounded-lg shadow-sm border border-gray-200", allowFullScreen: true }) }, index));
    }
    if (block.type === 'codeBlock') {
        const language = block.attrs.language || 'text';
        return (_jsx("pre", { className: "my-4 p-4 rounded bg-gray-900 text-gray-100 overflow-x-auto", children: _jsx("code", { className: `language-${language}`, children: block.content && block.content[0] && block.content[0].text }) }, index));
    }
    return null;
};
const KhaleelRenderer = ({ content }) => {
    if (!content || !content.content)
        return null;
    return (_jsx("div", { className: "khaleel-renderer ProseMirror", children: content.content.map((block, index) => renderBlock(block, index)) }));
};
export default KhaleelRenderer;
