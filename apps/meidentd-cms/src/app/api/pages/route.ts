import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      orderBy: {
        createdAt: 'asc', 
      },
    });
    return NextResponse.json(pages);
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    const newPage = await prisma.page.create({
      data: {
        title,
        slug,
      },
    });

    return NextResponse.json(newPage, { status: 201 }); 
  } catch (error) {
    console.error("Error creating page:", error);
    if ((error as any).code === 'P2002') { 
         return NextResponse.json({ error: 'Slug must be unique' }, { status: 409 }); 
    }
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    );
  }
}