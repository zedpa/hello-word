import Link from "next/link"
import { prisma } from "@/lib/prisma"

async function getIdeas() {
  return await prisma.idea.findMany({
    where: { status: "PUBLISHED" },
    include: {
      author: {
        select: {
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
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  })
}

export default async function ExplorePage() {
  const ideas = await getIdeas()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">探索灵感</h1>
          <p className="mt-2 text-gray-600">发现社区中的精彩创意</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <Link
              key={idea.id}
              href={`/ideas/${idea.id}`}
              className="block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                  {idea.title}
                </h3>
              </div>
              <p className="text-gray-600 line-clamp-3 mb-4">
                {idea.description}
              </p>

              {/* Tags */}
              {idea.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {idea.tags.slice(0, 3).map((ideaTag) => (
                    <span
                      key={ideaTag.id}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                    >
                      {ideaTag.tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta */}
              <div className="flex items-center justify-between text-sm text-gray-500">
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    {idea.likeCount}
                  </span>
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
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    {idea.commentCount}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {ideas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">还没有发布的灵感</p>
            <Link
              href="/workspace"
              className="mt-4 inline-block text-purple-600 hover:text-purple-700"
            >
              成为第一个发布灵感的人 →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
