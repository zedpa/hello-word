import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// 创建评论
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "未登录" }, { status: 401 })
    }

    const { content, parentId } = await request.json()

    if (!content) {
      return NextResponse.json(
        { error: "评论内容不能为空" },
        { status: 400 }
      )
    }

    const idea = await prisma.idea.findUnique({
      where: { id: params.id },
    })

    if (!idea) {
      return NextResponse.json({ error: "灵感不存在" }, { status: 404 })
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: session.user.id,
        ideaId: params.id,
        parentId: parentId || null,
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

    // 更新灵感的评论数
    await prisma.idea.update({
      where: { id: params.id },
      data: { commentCount: { increment: 1 } },
    })

    // 给灵感作者增加积分（不是自己评论自己）
    if (idea.authorId !== session.user.id) {
      await prisma.user.update({
        where: { id: idea.authorId },
        data: { points: { increment: 1 } },
      })

      await prisma.pointHistory.create({
        data: {
          userId: idea.authorId,
          amount: 1,
          type: "RECEIVE_COMMENT",
          description: "收到评论",
          relatedId: idea.id,
        },
      })
    }

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error("创建评论失败:", error)
    return NextResponse.json(
      { error: "创建评论失败" },
      { status: 500 }
    )
  }
}
