"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500" />
              <span className="text-xl font-bold text-gray-900">CreativeHub</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/explore"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              探索灵感
            </Link>
            <Link
              href="/workspace"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              工作区
            </Link>
            <Link
              href="/community"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              社区
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {status === "loading" ? (
              <div className="h-8 w-20 animate-pulse rounded bg-gray-200" />
            ) : session ? (
              <>
                <Link
                  href="/workspace"
                  className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
                >
                  创建灵感
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700">
                    {session.user.username}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    退出
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  登录
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
                >
                  注册
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
