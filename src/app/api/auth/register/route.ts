import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { email, username, password, name } = await request.json()

    // 验证必填字段
    if (!email || !username || !password) {
      return NextResponse.json(
        { error: "缺少必填字段" },
        { status: 400 }
      )
    }

    // 检查邮箱是否已存在
    const existingEmail = await prisma.user.findUnique({
      where: { email }
    })

    if (existingEmail) {
      return NextResponse.json(
        { error: "该邮箱已被注册" },
        { status: 400 }
      )
    }

    // 检查用户名是否已存在
    const existingUsername = await prisma.user.findUnique({
      where: { username }
    })

    if (existingUsername) {
      return NextResponse.json(
        { error: "该用户名已被使用" },
        { status: 400 }
      )
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10)

    // 创建用户
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        name: name || username,
        points: 100, // 初始积分
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        points: true,
        createdAt: true,
      }
    })

    // 记录注册奖励积分
    await prisma.pointHistory.create({
      data: {
        userId: user.id,
        amount: 100,
        type: "REWARD",
        description: "注册奖励",
      }
    })

    return NextResponse.json(
      {
        message: "注册成功",
        user
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("注册错误:", error)
    return NextResponse.json(
      { error: "注册失败，请稍后重试" },
      { status: 500 }
    )
  }
}
