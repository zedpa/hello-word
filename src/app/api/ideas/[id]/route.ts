import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// 获取单个灵感
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const idea = await prisma.idea.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
            points: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    })

    if (!idea) {
      return NextResponse.json({ error: "灵感不存在" }, { status: 404 })
    }

    // 增加浏览次数
    await prisma.idea.update({
      where: { id: params.id },
      data: { viewCount: { increment: 1 } },
    })

    return NextResponse.json(idea)
  } catch (error) {
    console.error("获取灵感失败:", error)
    return NextResponse.json(
      { error: "获取灵感失败" },
      { status: 500 }
    )
  }
}

// 更新灵感
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "未登录" }, { status: 401 })
    }

    const idea = await prisma.idea.findUnique({
      where: { id: params.id },
    })

    if (!idea) {
      return NextResponse.json({ error: "灵感不存在" }, { status: 404 })
    }

    if (idea.authorId !== session.user.id) {
      return NextResponse.json({ error: "无权限" }, { status: 403 })
    }

    const { title, description, content, status } = await request.json()

    const updatedIdea = await prisma.idea.update({
      where: { id: params.id },
      data: {
        title,
        description,
        content,
        status,
        publishedAt:
          status === "PUBLISHED" && !idea.publishedAt
            ? new Date()
            : idea.publishedAt,
      },
    })

    return NextResponse.json(updatedIdea)
  } catch (error) {
    console.error("更新灵感失败:", error)
    return NextResponse.json(
      { error: "更新灵感失败" },
      { status: 500 }
    )
  }
}

// 删除灵感
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "未登录" }, { status: 401 })
    }

    const idea = await prisma.idea.findUnique({
      where: { id: params.id },
    })

    if (!idea) {
      return NextResponse.json({ error: "灵感不存在" }, { status: 404 })
    }

    if (idea.authorId !== session.user.id) {
      return NextResponse.json({ error: "无权限" }, { status: 403 })
    }

    await prisma.idea.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "删除成功" })
  } catch (error) {
    console.error("删除灵感失败:", error)
    return NextResponse.json(
      { error: "删除灵感失败" },
      { status: 500 }
    )
  }
}
