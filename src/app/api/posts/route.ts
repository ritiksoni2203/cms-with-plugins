import { NextResponse } from 'next/server';
import { prisma } from 'src/app/lib/prisma';

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function GET_BY_ID(request: Request) {
  const { id } = await request.json();
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function POST(request: Request) {
  const { title, content } = await request.json();
  const slug = title.toLowerCase().replace(/ /g, '-');
  const newPost = await prisma.post.create({
    data: { title, slug, content },
  });
  return NextResponse.json(newPost);
}

export async function PUT(request: Request) {
  const { id, title, content } = await request.json();
  const updatedPost = await prisma.post.update({
    where: { id },
    data: { title, content },
  });
  return NextResponse.json(updatedPost);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.post.delete({
    where: { id },
  });
  return NextResponse.json({ message: 'Post deleted successfully' });
}
