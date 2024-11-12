import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content, onChange }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ color: [] }, { background: [] }],
            ['clean'],
          ],
        },
      });

      quillRef.current.on('text-change', () => {
        const html = quillRef.current!.root.innerHTML;
        onChange(html);
      });
    }
  }, [onChange]);

  useEffect(() => {
    if (quillRef.current && quillRef.current.root.innerHTML !== content) {
      quillRef.current.root.innerHTML = content;
    }
  }, [content]);

  return (
    <div className="quill-editor">
      <div ref={editorRef} />
    </div>
  );
};

export default Editor;
