import { Navigate } from 'react-router-dom'
import { getCookie } from 'typescript-cookie'

export const RootRedirect = () => {
  const isAuth = !!getCookie('access')
  const role = getCookie('role') // 'mentor' или 'student'

  if (!isAuth) return <Navigate to="/login" />
  if (role === 'mentor') return <Navigate to="/mentor" />
  return <Navigate to="/student" />
}
