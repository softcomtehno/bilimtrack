import {
  Book,
  CalendarCheck2,
  CircleUser,
  GraduationCap,
  UsersRound,
} from 'lucide-react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

export function SidebarNav() {
  return (
    <Sidebar
      defaultCollapsed={false}
      style={{
        height: '100vh',
        position: 'sticky',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // чтобы низ был внизу
      }}
    >
      <div className="min-h-[100vh] flex flex-col justify-between">
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
            <MenuItem
              className="mb-5 mt-5 font-medium hover:bg-[none]"
              icon={<GraduationCap />}
            >
              BilimTrack
            </MenuItem>
            <MenuItem component={<Link to="/workspace" />} icon={<Book />}>
              Предметы
            </MenuItem>
            <MenuItem
              component={<Link to="/schedule" />}
              icon={<CalendarCheck2 />}
            >
              График работы
            </MenuItem>
            <MenuItem component={<Link to="/profile" />} icon={<CircleUser />}>
              Профиль
            </MenuItem>
          </Menu>
        </div>

        <div className="px-4 py-2 text-[12px] text-gray-500">
          Разработано 💙 OurEra Team
        </div>
      </div>
    </Sidebar>
  );
}
