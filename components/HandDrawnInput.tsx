import React from 'react';
import { FileUp } from 'lucide-react';

interface HandDrawnInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  multiline?: boolean;
  label?: string;
  onFileSelect?: (base64: string) => void;
}

export const HandDrawnInput: React.FC<HandDrawnInputProps> = ({ 
  multiline = false, 
  label,
  className = '',
  type,
  onFileSelect,
  ...props 
}) => {
  const InputTag = multiline ? 'textarea' : 'input';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onFileSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  if (type === 'file') {
    return (
      <div className={`flex flex-col gap-1.5 w-full ${className}`}>
        {label && <label className="text-sm font-bold text-slate-700 ml-1">{label}</label>}
        <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50 rounded-xl h-32 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all group">
          <FileUp className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 mb-2" />
          <span className="text-xs font-bold text-slate-500">Klik untuk upload file</span>
          <input type="file" className="hidden" onChange={handleFileChange} accept={props.accept} />
        </label>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && <label className="text-sm font-bold text-slate-700 ml-1">{label}</label>}
      <InputTag
        type={type}
        className={`
          border border-slate-200 bg-white p-3 text-slate-900 text-sm rounded-xl outline-none
          focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500
          placeholder:text-slate-400 transition-all
          ${multiline ? 'min-h-[120px] resize-y' : ''}
        `}
        {...(props as any)}
      />
    </div>
  );
};