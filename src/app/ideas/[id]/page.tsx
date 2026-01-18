import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

async function getIdea(id: string) {
  const idea = await prisma.idea.findUnique({
    where: { id },
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
        where: { parentId: null },
        include: {
          author: {
            select: {
              id: true,
              username: true,
              name: true,
              avatar: true,
            },
          },
          replies: {
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
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  })

  if (!idea) {
    return null
  }

  // 增加浏览量
  await prisma.idea.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  })

  return idea
}

export default async function IdeaDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const idea = await getIdea(params.id)

  if (!idea) {
    notFound()
  }

  const statusMap = {
    DRAFT: "草稿",
    PUBLISHED: "已发布",
    IN_PROGRESS: "进行中",
    COMPLETED: "已完成",
    ARCHIVED: "已归档",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/explore"
            className="text-purple-600 hover:text-purple-700 flex items-center mb-4"
          >
            ← 返回探索
          </Link>
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              {statusMap[idea.status]}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{idea.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{idea.description}</p>

          {/* Tags */}
          {idea.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {idea.tags.map((ideaTag) => (
                <span
                  key={ideaTag.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                >
                  #{ideaTag.tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-gray-500 border-b border-gray-200 pb-6">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <svg
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {idea.author.name || idea.author.username}
              </span>
              <span>{idea.author.points} 积分</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>{idea.viewCount} 浏览</span>
              <span>{idea.likeCount} 点赞</span>
              <span>{idea.commentCount} 评论</span>
            </div>
          </div>
        </div>

        {/* Content */}
        {idea.content && (
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">详细内容</h2>
            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
              {idea.content}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            讨论 ({idea.commentCount})
          </h2>

          {idea.comments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">还没有评论，来发表第一个评论吧</p>
          ) : (
            <div className="space-y-6">
              {idea.comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-gray-900">
                          {comment.author.name || comment.author.username}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString("zh-CN")}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>

                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 ml-8 space-y-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start space-x-3">
                              <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-semibold text-sm text-gray-900">
                                    {reply.author.name || reply.author.username}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {new Date(reply.createdAt).toLocaleDateString("zh-CN")}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
