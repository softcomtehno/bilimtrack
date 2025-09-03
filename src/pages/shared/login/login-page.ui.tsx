import { userQueries, userTypes } from '@/entities/user';
import { Card, CardBody, Input, Button, InputOtp } from '@heroui/react';
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
          <img src="/images/girl.svg" alt="Login illustration" className="max-w-xs" />
        </div>

        <Card className="shadow-none p-4 w-full md:max-w-sm overflow-x-hidden">
          <CardBody className='overflow-x-hidden'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
              <div className="mb-4">
                <Input
                className='max-w-[200px] min-w-[200px]'
                  placeholder="Логин"
                  value={form.username}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, username: e.target.value }))
                  }
                />
              </div>

              <div className="mb-4 flex justify-center">
                <InputOtp
                  placeholder="Пароль"
                  className="max-w-[200px] min-w-[200px]"
                  length={4}
                  value={form.password}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, password: value }))
                  }
                />
              </div>

              <Button
                type="submit"
                className="bg-sky-500 max-w-[200px] min-w-[200px] font-medium text-white w-full mb-4"
                disabled={isPending}
              >
                {isPending ? 'Входим...' : 'Войти в систему'}
              </Button>

              <div className="text-center">
                <a target='_blank' href="https://t.me/kuma_original" className="text-sm text-blue-600 hover:underline">
                  Забыли пароль?
                </a>
              </div>

              {isError && (
                <p className="text-red-500 text-sm mt-2">
                  Ошибка авторизации. Проверьте данные.
                </p>
              )}
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
