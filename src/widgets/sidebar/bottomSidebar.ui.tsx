import { Link } from 'react-router-dom'
import { BookCopy, CalendarCheck2, CircleUser, Home } from 'lucide-react'

export function BottomSidebar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-md">
      <div className="flex justify-around items-center h-14">
        <Link to="/mentor" className="flex flex-col items-center text-xs">
          <Home size={20} />
          Главная
        </Link>
        <Link
          to="/mentor/subjects"
          className="flex flex-col items-center text-xs"
        >
          <BookCopy size={20} />
          Предметы
        </Link>
        <Link
          to="/mentor/timetable"
          className="flex flex-col items-center text-xs"
        >
          <CalendarCheck2 size={20} />
          График
        </Link>
        <Link
          to="/mentor/profile"
          className="flex flex-col items-center text-xs"
        >
          <CircleUser size={20} />
          Профиль
        </Link>
      </div>
    </div>
  )
}
