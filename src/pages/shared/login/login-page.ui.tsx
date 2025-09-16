import { userQueries, userTypes } from '@/entities/user';
import {
  Card,
  CardBody,
  Input,
  Button,
  InputOtp,
  Tabs,
  Tab,
} from '@heroui/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function LoginPage() {
  const [form, setForm] = useState<userTypes.LoginUserDto>({
    username: '',
    password: '',
  });

  const {
    mutate: loginToken,
    isPending,
    isError,
  } = userQueries.useGetTokenMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.username || form.password.length < 4) {
      toast.error('Пожалуйста, заполните все поля корректно');
      return;
    }

    loginToken({ user: form });
  };

  return (
    <div className="flex items-center justify-center   p-4">
      <div className="bg-white flex gap-5 shadow-xl rounded-xl p-6 max-w-4xl w-full">
        <div className="hidden md:block">
          <h2 className="text-2xl font-bold text-center mb-6">
            Вход в BilimTrack
          </h2>
          <img
            src="/images/girl.svg"
            alt="Login illustration"
            className="max-w-xs"
          />
        </div>

        <div>
          <Tabs aria-label="Login options" fullWidth>
            <Tab key="student" title="Студент">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-4"
              >
                <Input
                  className="max-w-[220px] min-w-[200px]"
                  placeholder="Логин"
                  value={form.username}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, username: e.target.value }))
                  }
                />

                <InputOtp
                  placeholder="Пароль"
                  className="max-w-[220px] min-w-[200px]"
                  length={4}
                  value={form.password}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, password: value }))
                  }
                />

                <Button
                  type="submit"
                  className="bg-sky-500 max-w-[220px] min-w-[200px] font-medium text-white w-full"
                  disabled={isPending}
                >
                  {isPending ? 'Входим...' : 'Войти'}
                </Button>

                <a
                  target="_blank"
                  href="https://t.me/kuma_original"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Забыли пароль?
                </a>

                {isError && (
                  <p className="text-red-500 text-sm mt-2">
                    Ошибка авторизации. Проверьте данные.
                  </p>
                )}
              </form>
            </Tab>
            <Tab key="mentor" title="Ментор">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-4"
              >
                <Input
                  className="max-w-[220px] min-w-[200px]"
                  placeholder="Логин"
                  value={form.username}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, username: e.target.value }))
                  }
                />

                <Input
                  type="password"
                  className="max-w-[220px] min-w-[200px]"
                  placeholder="Пароль"
                  value={form.password}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, password: e.target.value }))
                  }
                />

                <Button
                  type="submit"
                  className="bg-emerald-500 max-w-[220px] min-w-[200px] font-medium text-white w-full"
                  disabled={isPending}
                >
                  {isPending ? 'Входим...' : 'Войти'}
                </Button>

                <a
                  target="_blank"
                  href="https://t.me/kuma_original"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Забыли пароль?
                </a>

                {isError && (
                  <p className="text-red-500 text-sm mt-2">
                    Ошибка авторизации. Проверьте данные.
                  </p>
                )}
              </form>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
