import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import '../styles.scss';
export default forwardRef((props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectItem = (index) => {
        const item = props.items[index];
        if (item) {
            props.command(item);
        }
    };
    // Handle Arrow Keys and Enter
    useImperativeHandle(ref, () => ({
        onKeyDown: ({ event }) => {
            if (event.key === 'ArrowUp') {
                setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
                return true;
            }
            if (event.key === 'ArrowDown') {
                setSelectedIndex((selectedIndex + 1) % props.items.length);
                return true;
            }
            if (event.key === 'Enter') {
                selectItem(selectedIndex);
                return true;
            }
            return false;
        },
    }));
    useEffect(() => setSelectedIndex(0), [props.items]);
    return (_jsx("div", { className: "slash-items", children: props.items.length ? (props.items.map((item, index) => (_jsx("button", { className: `slash-item ${index === selectedIndex ? 'is-selected' : ''}`, onClick: () => selectItem(index), children: item.title }, index)))) : (_jsx("div", { className: "slash-item", children: "No result" })) }));
});
