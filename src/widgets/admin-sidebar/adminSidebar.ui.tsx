import {
  CalendarCheck2,
  GraduationCap,
  LayoutDashboard,
} from 'lucide-react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

export function AdminSidebarNav() {
  return (
    <Sidebar
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
              BilimTrack-Admin
            </div>
            <MenuItem
              component={<Link to="/admin/dashboard" />}
              icon={<LayoutDashboard />}
            >
              Главная
            </MenuItem>
            <MenuItem
              component={<Link to="/admin/schedule" />}
              icon={<CalendarCheck2 />}
            >
              Расписание
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
