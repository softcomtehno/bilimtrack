import { subjectQueries } from '@/entities/subject'
import {
  BookCopy,
  Bubbles,
  CalendarCheck2,
  ChevronUp,
  GraduationCap,
  Home,
} from 'lucide-react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'

export function SidebarNav() {
  const { data: subjectsData, isSuccess: isSubjectSuccess } =
    subjectQueries.useGetSubjectsMentor()


    if(isSubjectSuccess) {
      
      const groupedSubjects = subjectsData.data.reduce((acc, subject) => {
        const courseNumber = subject.course.number
        if (!acc[courseNumber]) {
          acc[courseNumber] = []
        }
        acc[courseNumber].push(subject)
        return acc
      }, {})
    
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
                  component={<Link to="/mentor/timetable" />}
                  icon={<CalendarCheck2 />}
                >
                  График работы
                </MenuItem>
    
                <MenuItem component={<Link to="/mentor/more" />} icon={<Bubbles />}>
                  Еще
                </MenuItem>
    
                {/* Предметы рендерим только если есть данные */}
                {isSubjectSuccess && subjectsData?.data?.length > 0 && (
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
                      <div>
                        {Object.entries(groupedSubjects).map(
                          ([courseNumber, subjects]) => (
                            <div
                              key={courseNumber}
                              className="max-h-[370px] overflow-y-auto scroll-container"
                            >
                              <div className="w-[100%] pl-[40px] font-medium my-2 text-xs whitespace-normal break-words leading-snug">
                                {courseNumber} курс
                              </div>
    
                              {subjects.map((subject) => (
                                <MenuItem
                                  key={subject.id}
                                  component={
                                    <Link to={`/mentor/subjects/${subject.id}`} />
                                  }
                                >
                                  <div className="w-[100%] text-xs whitespace-normal break-words leading-snug">
                                    {subject.name}
                                  </div>
                                </MenuItem>
                              ))}
                            </div>
                          )
                        )}
                      </div>
                    </SubMenu>
                  </Menu>
                )}
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