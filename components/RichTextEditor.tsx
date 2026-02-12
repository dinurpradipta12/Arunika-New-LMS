
import React, { useRef, useEffect } from 'react';
import { Bold, Italic, List, ListOrdered, Type } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, label }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-bold text-slate-700 ml-1">{label}</label>}
      <div className="border border-slate-200 bg-white rounded-xl overflow-hidden focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 transition-all">
        <div className="flex items-center gap-1 p-2 bg-slate-50 border-b border-slate-100">
          <button 
            type="button"
            onClick={() => execCommand('bold')}
            className="p-1.5 hover:bg-white rounded-md text-slate-600 transition-colors"
            title="Bold"
          >
            <Bold size={18} />
          </button>
          <button 
            type="button"
            onClick={() => execCommand('italic')}
            className="p-1.5 hover:bg-white rounded-md text-slate-600 transition-colors"
            title="Italic"
          >
            <Italic size={18} />
          </button>
          <div className="w-px h-4 bg-slate-200 mx-1" />
          <button 
            type="button"
            onClick={() => execCommand('insertUnorderedList')}
            className="p-1.5 hover:bg-white rounded-md text-slate-600 transition-colors"
            title="Bullet List"
          >
            <List size={18} />
          </button>
          <button 
            type="button"
            onClick={() => execCommand('insertOrderedList')}
            className="p-1.5 hover:bg-white rounded-md text-slate-600 transition-colors"
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </button>
          <div className="w-px h-4 bg-slate-200 mx-1" />
          <button 
            type="button"
            onClick={() => {
              const url = prompt('Enter link URL:');
              if (url) execCommand('createLink', url);
            }}
            className="p-1.5 hover:bg-white rounded-md text-slate-600 transition-colors text-xs font-bold"
          >
            Link
          </button>
        </div>
        <div
          ref={editorRef}
          contentEditable
          onInput={(e) => onChange(e.currentTarget.innerHTML)}
          className="p-4 min-h-[200px] outline-none prose prose-slate max-w-none text-slate-900 text-sm"
          style={{ whiteSpace: 'pre-wrap' }}
        />
      </div>
    </div>
  );
};
