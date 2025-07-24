import { subjectQueries } from '@/entities/subject'
import {
  BookCopy,
  CalendarCheck2,
  ChevronUp,
  CircleUser,
  GraduationCap,
  Home,
} from 'lucide-react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'

export function SidebarNav() {
  const {
    data: subjectsData,
    isLoading: isSubjectsLoading,
    isError: isSubjectsError,
    isSuccess: isSubjectSuccess,
  } = subjectQueries.useGetSubjectsMentor()
  if (isSubjectSuccess) {
    return (
      <Sidebar
        defaultCollapsed={false}
        style={{
          height: '100vh',
          position: 'sticky',
          top: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div className="min-h-[100vh] flex flex-col justify-between ">
          <div>
            <Menu
              menuItemStyles={{
                button: {
                  padding: '10px 20px',
                  [`&.active`]: {
                    backgroundColor: '#374151',
                    color: '#ffffff',
                  },
                  color: 'black',
                },
              }}
            >
              <div className="mb-7 mt-5 flex gap-[10px] px-[25px] font-medium hover:bg-[none]">
                <GraduationCap />
                BilimTrack
              </div>
              <MenuItem component={<Link to="/mentor" />} icon={<Home />}>
                Главная
              </MenuItem>
              <MenuItem
                component={<Link to="/schedule" />}
                icon={<CalendarCheck2 />}
              >
                График работы
              </MenuItem>
              <MenuItem
                component={<Link to="/profile" />}
                icon={<CircleUser />}
              >
                Профиль
              </MenuItem>
              <Menu
                renderExpandIcon={({ open }) => (
                  <span>
                    {open ? (
                      <ChevronUp size={15} />
                    ) : (
                      <ChevronUp className="rotate-180" size={15} />
                    )}
                  </span>
                )}
              >
                <SubMenu label="Предметы" icon={<BookCopy />}>
                  <div className="max-h-[370px] overflow-y-auto scroll-container">
                    <div className="w-[100%] pl-[40px] font-medium my-2   text-xs whitespace-normal break-words leading-snug">
                      1 курс
                    </div>
                    {subjectsData?.data?.map((subject) => (
                      <MenuItem
                        key={subject.id}
                        component={<Link to={`/subjects/${subject.id}`} />}
                      >
                        <div className="w-[100%]  text-xs whitespace-normal break-words leading-snug">
                          {subject.name}
                        </div>
                      </MenuItem>
                    ))}
                  </div>
                </SubMenu>
              </Menu>
            </Menu>
          </div>
          <div className="px-4 py-2 text-[12px] text-gray-500">
            Разработано 💙 OurEra Team
          </div>
        </div>
      </Sidebar>
    )
  }
}
