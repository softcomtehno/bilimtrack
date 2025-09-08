import { Title } from '@/shared/ui/title';
import { Button } from '@heroui/button';
import { Moon, Settings, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export const SettingsPage = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-4">
      <Title Icon={Settings} title="Настройки" />
      <Button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="flex items-center gap-2"
      >
        {theme === 'light' ? (
          <>
            <Moon size={16} /> Темная
          </>
        ) : (
          <>
            <Sun size={16} /> Светлая
          </>
        )}
      </Button>
    </div>
  );
};
