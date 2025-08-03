import React, { useRef, useEffect } from 'react';
import './SimpleWysiwygEditor.css';
import {
  FaUndo, FaRedo, FaBold, FaItalic, FaUnderline, FaStrikethrough, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify,
  FaIndent, FaOutdent, FaListUl, FaListOl, FaSuperscript, FaSubscript
} from 'react-icons/fa';

interface SimpleWysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const BUTTONS = [
  { group: [
    { role: 'undo', icon: <FaUndo /> },
    { role: 'redo', icon: <FaRedo /> },
  ] },
  { group: [
    { role: 'bold', icon: <FaBold /> },
    { role: 'italic', icon: <FaItalic /> },
    { role: 'underline', icon: <FaUnderline /> },
    { role: 'strikeThrough', icon: <FaStrikethrough /> },
  ] },
  { group: [
    { role: 'justifyLeft', icon: <FaAlignLeft /> },
    { role: 'justifyCenter', icon: <FaAlignCenter /> },
    { role: 'justifyRight', icon: <FaAlignRight /> },
    { role: 'justifyFull', icon: <FaAlignJustify /> },
  ] },
  { group: [
    { role: 'indent', icon: <FaIndent /> },
    { role: 'outdent', icon: <FaOutdent /> },
  ] },
  { group: [
    { role: 'insertUnorderedList', icon: <FaListUl /> },
    { role: 'insertOrderedList', icon: <FaListOl /> },
  ] },
  { group: [
    { role: 'h1', icon: <>h<sup>1</sup></> },
    { role: 'h2', icon: <>h<sup>2</sup></> },
    { role: 'p', icon: <>p</> },
  ] },
  { group: [
    { role: 'subscript', icon: <FaSubscript /> },
    { role: 'superscript', icon: <FaSuperscript /> },
  ] },
];

export const SimpleWysiwygEditor: React.FC<SimpleWysiwygEditorProps> = ({ value, onChange, disabled, placeholder }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleCommand = (role: string) => {
    if (disabled) return;
    if (role === 'h1' || role === 'h2' || role === 'p') {
      document.execCommand('formatBlock', false, role);
    } else {
      document.execCommand(role, false, undefined);
    }
    // After command, update value
    handleInput();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  return (
    <div className="simple-wysiwyg-content">
      <div id="editControls" style={{ textAlign: 'center', padding: 5 }}>
        {BUTTONS.map((btnGroup, i) => (
          <div className="btn-group" key={i} style={{ display: 'inline-block', marginRight: 4 }}>
            {btnGroup.group.map(btn => (
              <button
                key={btn.role}
                type="button"
                className="btn"
                tabIndex={-1}
                aria-label={btn.role}
                onMouseDown={e => { e.preventDefault(); handleCommand(btn.role); }}
                style={{ pointerEvents: disabled ? 'none' : undefined, opacity: disabled ? 0.5 : 1 }}
              >
                {btn.icon}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div
        id="editor"
        ref={editorRef}
        className="simple-wysiwyg-editor"
        contentEditable={!disabled}
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
        style={{ minHeight: 120, border: '1px solid #ccc', borderRadius: 6, padding: 10, background: disabled ? '#f9f9f9' : '#fff' }}
      />
    </div>
  );
};

export default SimpleWysiwygEditor;
