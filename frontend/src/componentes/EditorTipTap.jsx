// EditorTipTap.jsx
import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="menu-bar mb-2">
      {/* Estilos comunes */}
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
        <b>Negrita</b>
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
        <i>Cursiva</i>
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('ordered') ? 'is-active' : ''}>
        <i>Lista</i>
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('Bullet') ? 'is-active' : ''}>
        <i>Viñeta</i>
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
        Título 1
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
        Título 2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        <u>Subrayado</u>
      </button>

      {/* Colores */}
      <button onClick={() => editor.chain().focus().setColor('#f00').run()}>Rojo</button>
      <button onClick={() => editor.chain().focus().setColor('#4179bd').run()}>Azul</button>
      <button onClick={() => editor.chain().focus().setColor('#000').run()}>Negro</button>

      {/* Alineación  */}
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()}>
        Izquierda
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()}>
        Centro
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()}>
        Derecha
      </button>
    </div>
  );
};

const EditorTiptap = ({ initialContent = '', onEditorReady }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Bold,
      Italic,
      Heading.configure({ levels: [1, 2] }),
      Paragraph,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }) 
    ],
    content: initialContent,
  });

  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default EditorTiptap;
