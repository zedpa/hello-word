import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// 点赞/取消点赞
export async function POST(
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

    // 检查是否已点赞
    const existingLike = await prisma.ideaLike.findUnique({
      where: {
        userId_ideaId: {
          userId: session.user.id,
          ideaId: params.id,
        },
      },
    })

    if (existingLike) {
      // 取消点赞
      await prisma.ideaLike.delete({
        where: { id: existingLike.id },
      })

      await prisma.idea.update({
        where: { id: params.id },
        data: { likeCount: { decrement: 1 } },
      })

      return NextResponse.json({ liked: false })
    } else {
      // 点赞
      await prisma.ideaLike.create({
        data: {
          userId: session.user.id,
          ideaId: params.id,
        },
      })

      await prisma.idea.update({
        where: { id: params.id },
        data: { likeCount: { increment: 1 } },
      })

      // 给作者增加积分
      if (idea.authorId !== session.user.id) {
        await prisma.user.update({
          where: { id: idea.authorId },
          data: { points: { increment: 2 } },
        })

        await prisma.pointHistory.create({
          data: {
            userId: idea.authorId,
            amount: 2,
            type: "RECEIVE_LIKE",
            description: "收到点赞",
            relatedId: idea.id,
          },
        })
      }

      return NextResponse.json({ liked: true })
    }
  } catch (error) {
    console.error("点赞操作失败:", error)
    return NextResponse.json(
      { error: "点赞操作失败" },
      { status: 500 }
    )
  }
}
