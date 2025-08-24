import { Navigate } from 'react-router-dom'
import { userQueries } from '@/entities/user'

export function HomeRedirect() {
  const { data: userData, isLoading, isError } = userQueries.useLoginUserQuery()

  if (isLoading) return <div>Загрузка...</div>

  if (isError || !userData?.data) {
    return <Navigate to="/auth" replace />
  }

  const role = userData.data.role

  if (role === 'mentor') return <Navigate to="/mentor" replace />
  if (role === 'student') return <Navigate to="/student" replace />

  return <Navigate to="/auth" replace />
}
