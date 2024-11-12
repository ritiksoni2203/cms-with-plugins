'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Editor from './Editor';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <Editor content={content} onChange={setContent} />
      <button type="submit">Save</button>
    </form>
  );
}
