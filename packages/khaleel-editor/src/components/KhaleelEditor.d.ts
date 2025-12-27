import '../styles.scss';
export interface KhaleelEditorProps {
    initialContent?: string;
    onSave?: (json: object) => void;
    onUpload?: (file: File) => Promise<string>;
}
declare const KhaleelEditor: ({ initialContent, onSave, onUpload }: KhaleelEditorProps) => import("react/jsx-runtime").JSX.Element | null;
export default KhaleelEditor;
//# sourceMappingURL=KhaleelEditor.d.ts.map