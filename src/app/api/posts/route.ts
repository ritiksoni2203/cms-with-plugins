import { NextResponse } from 'next/server';
import { prisma } from 'src/app/lib/prisma';

// GET: Fetch all posts
export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

// GET: Fetch a single post by ID
export async function GET_POST_BY_ID(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  if (!post) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

// POST: Create a new post
export async function POST(request: Request) {
  const { title, content } = await request.json();
  const slug = title.toLowerCase().replace(/ /g, '-');
  const newPost = await prisma.post.create({
    data: { title, slug, content },
  });
  return NextResponse.json(newPost);
}

// PUT: Update an existing post
export async function PUT(request: Request) {
  const { id, title, content } = await request.json();
  const updatedPost = await prisma.post.update({
    where: { id },
    data: { title, content },
  });
  return NextResponse.json(updatedPost);
}

// DELETE: Delete a post
export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.post.delete({
    where: { id },
  });
  return NextResponse.json({ message: 'Post deleted successfully' });
}
