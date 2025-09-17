import { ReactNode } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { Navigation } from '@/widgets/navigation'
import { BottomSidebar, SidebarNav } from '@/widgets/sidebar'
import { TopBar } from '@/widgets/top-bar'
import { Card } from '@heroui/card'
import { userQueries } from '@/entities/user'
import { AdminSidebarNav } from '@/widgets/admin-sidebar'

interface LayoutProps {
  children?: ReactNode
}

export function GenericLayout({ children }: LayoutProps) {
  return (
    <div className="mx-auto">
      <Card className="max-w-[400px]  pb-[60px] mx-auto border-none rounded-none shadow-none">
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
      <div className="hidden md:block">
        <SidebarNav />
      </div>
      <Card className=" border shadow-none flex-1 rounded-none  m-0 overflow-y-auto pb-16 md:pb-0">
        <TopBar/>
        {children || <Outlet />}
      </Card>
      <div className="block md:hidden">
        <BottomSidebar />
      </div>
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

export function AdminLayout() {
  return (
    <div className="flex h-screen">
      <div>
        <AdminSidebarNav/>
      </div>
      <Card className="border shadow-none flex-1 m-10  overflow-y-auto pb-16 md:pb-0">
        <Outlet />
      </Card>
    </div>
  );
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
  const { data: userData, isLoading, isError } = userQueries.useLoginUserQuery()

  if (isLoading) return <div>Загрузка...</div>

  if (isError || !userData?.data) {
    return <Navigate to="/auth" replace />
  }

  if (userData.data.role === 'mentor') {
    return <MentorLayout />
  }

  return <GenericLayout />
}
