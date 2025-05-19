import { Card, CardBody, Input, Button, InputOtp } from '@heroui/react';
import { useState } from 'react';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [value, setValue] = useState('');

  return (
    <div className=" bg-white flex items-center gap-5 shadow-xl rounded-lg p-4">
      <div>
        <h2 className="text-xl font-bold text-center mb-6">
          Вход в BilimTrack
        </h2>
        <img src="/images/girl.svg" alt="" />
      </div>
      <Card className=" shadow-none p-2 overflow-x-hidden max-w-[230px] ">
        <CardBody className="overflow-x-hidden">
          <div className="mb-4">
            <Input
              placeholder="Логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <InputOtp
              placeholder="Пароль"
              className="w-full"
              length={4}
              value={value}
              onValueChange={setValue}
            />
          </div>
          <Button className="bg-sky-500 font-medium text-white  w-full mb-4">
            Войти в систему
          </Button>

          <div className="text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Забыли пароль?
            </a>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
