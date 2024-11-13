"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('../components/Editor'), { ssr: false });
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";

interface Post {
  title: string;
  slug: string;
  content: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  slug: Yup.string().required("Slug is required"),
  content: Yup.string().required("Content is required"),
});

export default function EditorPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  
  return (
    <Suspense fallback={<div>Loading editor...</div>}>
       <EditorComponent 
        router={router} 
        post={post} 
        setPost={setPost} 
        preview={preview} 
        setPreview={setPreview} 
      />
    </Suspense>
  );
}

function EditorComponent({ router, post, setPost, preview, setPreview }: any) {
  const id = useSearchParams().get("id");

  const savePost = async (values: Post) => {
    const updateId = Number(id);
    try {
      const response = await fetch(`/api/posts`, {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, id: updateId }),
      });

      if (response.ok) {
        alert(id ? "Post updated successfully!" : "Post created successfully!");
        router.push("/posts");
      } else {
        console.error("Failed to save post");
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const response = await fetch(`/api/posts?id=${id}`);
        const data = await response.json();
        setPost(data[0]);
      };
      fetchPost();
    }
  }, [id]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">CMS Editor</h1>
      <div className="flex justify-center">
        <Link href={'/posts'} className="mb-4 text-blue-500 underline">Posts</Link>
      </div>
      <Formik
        initialValues={{
          title: post?.title || "",
          slug: post?.slug || "",
          content: post?.content || "",
        }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          savePost(values);
        }}
      >
        {({ values, setFieldValue, handleChange }) => (
          <>
            <Form className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label htmlFor="title" className="block font-semibold mb-2">
                  Title
                </label>
                <Field
                  id="title"
                  name="title"
                  placeholder="Enter post title"
                  className="w-full p-2 border border-gray-300 rounded outline-0"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    setFieldValue("slug", e.target.value.toLowerCase().replace(/ /g, "-"));
                  }}
                />
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="slug" className="block font-semibold mb-2">
                  Slug
                </label>
                <Field
                  id="slug"
                  name="slug"
                  placeholder="Auto-generated from title"
                  className="w-full p-2 border border-gray-300 rounded outline-0"
                />
                <ErrorMessage name="slug" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-2">Content</label>
                <Editor
                  content={values.content}
                  onChange={(content) => setFieldValue("content", content)}
                />
                <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex justify-between">
                <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg">
                  {id ? "Update Post" : "Save Post"}
                </button>
                <button
                  type="button"
                  onClick={() => setPreview((prev: any) => !prev)}
                  className="bg-gray-600 text-white p-2 rounded-lg"
                >
                  {preview ? "Close Preview" : "Preview"}
                </button>
              </div>
            </Form>

            {preview && (
              <div className="mt-10 p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{values.title || "Preview Title"}</h2>
                <div
                  className="mt-4 quill-content"
                  dangerouslySetInnerHTML={{ __html: values.content }}
                ></div>
              </div>
            )}
          </>
        )}
      </Formik>
    </div>
  );
}
