import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-24 text-center">
          <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl">
            让创意
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              不再停留在想法
            </span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
            CreativeHub 是一个帮助创意落地的社区平台。在这里，你可以记录灵感、寻找协作者、获得反馈，让想法变成现实。
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <Link
              href="/register"
              className="rounded-lg bg-purple-600 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-purple-700 transition-all hover:scale-105"
            >
              开始创作
            </Link>
            <Link
              href="/explore"
              className="rounded-lg border-2 border-gray-300 px-8 py-3 text-lg font-semibold text-gray-700 hover:border-purple-600 hover:text-purple-600 transition-all"
            >
              探索灵感
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl">
              <div className="mb-4 inline-block rounded-lg bg-purple-100 p-3">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">记录灵感</h3>
              <p className="mt-2 text-gray-600">
                一句话快速创建灵感，永久保存你的创意想法，随时查看和完善。
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl">
              <div className="mb-4 inline-block rounded-lg bg-pink-100 p-3">
                <svg className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">社区协作</h3>
              <p className="mt-2 text-gray-600">
                与志同道合的创作者交流，获得反馈，找到合作伙伴，共同实现创意。
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl">
              <div className="mb-4 inline-block rounded-lg bg-purple-100 p-3">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">积分激励</h3>
              <p className="mt-2 text-gray-600">
                通过分享创意、参与讨论获得积分，用积分交易资源，实现价值流通。
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-200 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600">1000+</div>
              <div className="mt-2 text-gray-600">创意灵感</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600">500+</div>
              <div className="mt-2 text-gray-600">活跃用户</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600">100+</div>
              <div className="mt-2 text-gray-600">成功落地</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
