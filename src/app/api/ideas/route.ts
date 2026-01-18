import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// 获取灵感列表
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const status = searchParams.get("status") || "PUBLISHED"
    const skip = (page - 1) * limit

    const ideas = await prisma.idea.findMany({
      where: {
        status: status as any,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    })

    const total = await prisma.idea.count({
      where: { status: status as any },
    })

    return NextResponse.json({
      ideas,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("获取灵感列表失败:", error)
    return NextResponse.json(
      { error: "获取灵感列表失败" },
      { status: 500 }
    )
  }
}

// 创建灵感
export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "未登录" }, { status: 401 })
    }

    const { title, description, content, status = "PUBLISHED", tags = [] } =
      await request.json()

    if (!title || !description) {
      return NextResponse.json(
        { error: "标题和描述不能为空" },
        { status: 400 }
      )
    }

    // 创建灵感
    const idea = await prisma.idea.create({
      data: {
        title,
        description,
        content,
        status,
        authorId: session.user.id,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
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
    })

    // 如果有标签，处理标签
    if (tags.length > 0) {
      for (const tagName of tags) {
        let tag = await prisma.tag.findUnique({
          where: { name: tagName },
        })

        if (!tag) {
          tag = await prisma.tag.create({
            data: { name: tagName },
          })
        }

        await prisma.ideaTag.create({
          data: {
            ideaId: idea.id,
            tagId: tag.id,
          },
        })

        await prisma.tag.update({
          where: { id: tag.id },
          data: { useCount: { increment: 1 } },
        })
      }
    }

    // 如果是发布状态，给用户增加积分
    if (status === "PUBLISHED") {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { points: { increment: 10 } },
      })

      await prisma.pointHistory.create({
        data: {
          userId: session.user.id,
          amount: 10,
          type: "PUBLISH_IDEA",
          description: "发布灵感",
          relatedId: idea.id,
        },
      })
    }

    return NextResponse.json(idea, { status: 201 })
  } catch (error) {
    console.error("创建灵感失败:", error)
    return NextResponse.json(
      { error: "创建灵感失败" },
      { status: 500 }
    )
  }
}
