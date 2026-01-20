'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface QuillEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  disabled?: boolean;
}

export const QuillEditor: React.FC<QuillEditorProps> = ({
  value = '',
  onChange,
  placeholder = '내용을 입력해주세요',
  maxLength = 1000,
  className,
  disabled = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  const [textLength, setTextLength] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !editorRef.current) return;

    const initQuill = async () => {
      const Quill = (await import('quill')).default;
      
      if (quillRef.current) return;

      const toolbarOptions = [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ];

      quillRef.current = new Quill(editorRef.current!, {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions,
        },
        placeholder: placeholder,
        readOnly: disabled,
      });

      // 초기 값 설정
      if (value) {
        quillRef.current.clipboard.dangerouslyPasteHTML(value);
      }

      // 텍스트 변경 이벤트
      quillRef.current.on('text-change', () => {
        const content = quillRef.current.root.innerHTML;
        const text = quillRef.current.getText();
        const length = text.trim().length;
        
        setTextLength(length);
        
        if (length <= maxLength) {
          onChange?.(content);
        } else {
          // 최대 길이 초과 시 되돌리기
          const delta = quillRef.current.getContents();
          quillRef.current.setContents(delta.slice(0, maxLength));
        }
      });
    };

    initQuill();

    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  // value prop 변경 감지
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      const currentSelection = quillRef.current.getSelection();
      quillRef.current.clipboard.dangerouslyPasteHTML(value);
      if (currentSelection) {
        quillRef.current.setSelection(currentSelection);
      }
    }
  }, [value]);

  // disabled 상태 변경
  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.enable(!disabled);
    }
  }, [disabled]);

  return (
    <div className={cn('relative w-full', className)}>
      <style jsx global>{`
        @import url('https://cdn.quilljs.com/1.3.6/quill.snow.css');
        
        .quill-editor-wrapper .ql-container {
          min-height: 837px;
          border: 1px solid #DBDBDB;
          border-top: none;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          font-family: 'Pretendard Variable', sans-serif;
          font-size: 18px;
        }
        
        .quill-editor-wrapper .ql-container:focus,
        .quill-editor-wrapper .ql-container:focus-within {
          border: 1px solid #DBDBDB;
          border-top: none;
          outline: none;
        }
        
        .quill-editor-wrapper .ql-editor {
          min-height: 785px;
          padding: 16px;
          color: #121212;
        }
        
        .quill-editor-wrapper .ql-editor.ql-blank::before {
          color: #999999;
          font-style: normal;
          font-size: 18px;
          left: 16px;
        }
        
        /* 한글 입력 중 플레이스홀더 숨김 */
        .quill-editor-wrapper .ql-editor:focus::before {
          display: none !important;
        }
        
        .quill-editor-wrapper .ql-toolbar {
          background-color: #FAFAFA;
          border: 1px solid #DBDBDB;
          border-bottom: none;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          padding: 16px;
          display: flex;
          gap: 33px;
        }
        
        .quill-editor-wrapper .ql-toolbar .ql-formats {
          margin-right: 0;
        }
        
        .quill-editor-wrapper .ql-stroke {
          stroke: #121212;
        }
        
        .quill-editor-wrapper .ql-fill {
          fill: #121212;
        }
        
        .quill-editor-wrapper .ql-picker-label {
          color: #121212;
        }
        
        .quill-editor-wrapper .ql-snow .ql-picker {
          color: #121212;
        }
        
        .quill-editor-wrapper .ql-snow.ql-toolbar button:hover,
        .quill-editor-wrapper .ql-snow .ql-toolbar button:hover,
        .quill-editor-wrapper .ql-snow.ql-toolbar button:focus,
        .quill-editor-wrapper .ql-snow .ql-toolbar button:focus,
        .quill-editor-wrapper .ql-snow.ql-toolbar button.ql-active,
        .quill-editor-wrapper .ql-snow .ql-toolbar button.ql-active,
        .quill-editor-wrapper .ql-snow.ql-toolbar .ql-picker-label:hover,
        .quill-editor-wrapper .ql-snow .ql-toolbar .ql-picker-label:hover,
        .quill-editor-wrapper .ql-snow.ql-toolbar .ql-picker-label.ql-active,
        .quill-editor-wrapper .ql-snow .ql-toolbar .ql-picker-label.ql-active,
        .quill-editor-wrapper .ql-snow.ql-toolbar .ql-picker-item:hover,
        .quill-editor-wrapper .ql-snow .ql-toolbar .ql-picker-item:hover,
        .quill-editor-wrapper .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
        .quill-editor-wrapper .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
          color: #0066CC;
        }
        
        .quill-editor-wrapper .ql-snow.ql-toolbar button:hover .ql-stroke,
        .quill-editor-wrapper .ql-snow .ql-toolbar button:hover .ql-stroke,
        .quill-editor-wrapper .ql-snow.ql-toolbar button:focus .ql-stroke,
        .quill-editor-wrapper .ql-snow .ql-toolbar button:focus .ql-stroke,
        .quill-editor-wrapper .ql-snow.ql-toolbar button.ql-active .ql-stroke,
        .quill-editor-wrapper .ql-snow .ql-toolbar button.ql-active .ql-stroke,
        .quill-editor-wrapper .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
        .quill-editor-wrapper .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
        .quill-editor-wrapper .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
        .quill-editor-wrapper .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
        .quill-editor-wrapper .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
        .quill-editor-wrapper .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
        .quill-editor-wrapper .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
        .quill-editor-wrapper .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke {
          stroke: #0066CC;
        }
        
        .quill-editor-wrapper .ql-snow.ql-toolbar button:hover .ql-fill,
        .quill-editor-wrapper .ql-snow .ql-toolbar button:hover .ql-fill,
        .quill-editor-wrapper .ql-snow.ql-toolbar button:focus .ql-fill,
        .quill-editor-wrapper .ql-snow .ql-toolbar button:focus .ql-fill,
        .quill-editor-wrapper .ql-snow.ql-toolbar button.ql-active .ql-fill,
        .quill-editor-wrapper .ql-snow .ql-toolbar button.ql-active .ql-fill,
        .quill-editor-wrapper .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
        .quill-editor-wrapper .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
        .quill-editor-wrapper .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
        .quill-editor-wrapper .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
        .quill-editor-wrapper .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
        .quill-editor-wrapper .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
        .quill-editor-wrapper .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
        .quill-editor-wrapper .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill {
          fill: #0066CC;
        }
      `}</style>
      
      <div className="quill-editor-wrapper">
        <div ref={editorRef} />
      </div>
      
      <div className="absolute bottom-4 right-4">
        <span className="font-medium text-[18px] leading-[24px] text-[#BDBDBD]">
          ({textLength}/{maxLength})
        </span>
      </div>
    </div>
  );
};
