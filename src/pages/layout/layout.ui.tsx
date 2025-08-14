import { ReactNode } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { getCookie } from 'typescript-cookie'

import { Navigation } from '@/widgets/navigation'
import { SidebarNav } from '@/widgets/sidebar'
import { TopBar } from '@/widgets/top-bar'
import { Card } from '@heroui/card'
import { userQueries } from '@/entities/user'

interface LayoutProps {
  children?: ReactNode
}


export function GenericLayout({ children }: LayoutProps) {
  return (
    <div className=" mx-auto">
      <Card className="max-w-[400px] pb-[60px] mx-auto border rounded-md shadow-none">
        <TopBar />
        {children || <Outlet />}
        <Navigation />
      </Card>
    </div>
  )
}

export function MentorLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen">
      <SidebarNav />
      <main className="flex-1 p-10 overflow-y-auto">
        {children || <Outlet />}
      </main>
    </div>
  )
}

export function IntroLayout() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen min-w-screen bg-no-repeat bg-cover mx-auto bg-[url('/images/bg.png')]">
      <Outlet />
    </div>
  )
}

interface ProtectedRouteProps {
  isAuthenticated: boolean
  redirectPath?: string
}

export function ProtectedRoute({
  isAuthenticated,
  redirectPath = '/auth',
}: ProtectedRouteProps) {
  return isAuthenticated ? <Outlet /> : <Navigate replace to={redirectPath} />
}

export function RoleBasedLayout() {
  const {
    data: userData,
    isLoading,
    isError,
  } = userQueries.useLoginUserQuery()

  if (isLoading) return <div className="text-center mt-10">Загрузка...</div>

  if (isError || !userData?.data) {
    return <Navigate to="/auth" replace />
  }
  if (userData.data.role === 'mentor') {
    return <MentorLayout />
  }

  return <GenericLayout />
}
