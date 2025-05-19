import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Avatar,
} from '@heroui/react';

import { Title } from '@/shared/ui/title';
import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { ScanQrCode } from 'lucide-react';

export const ScannerPage = () => {
  const [data, setData] = useState('Нет результата');

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <Card className="w-full max-w-md shadow-none border">
        <CardBody className='shadow-none'>
          <Title title="Сканер" Icon={ScanQrCode} />
          <Scanner
            onScan={(result) => {
              if (result) {
                setData(result);
              }
            }}
            onError={(error) => console.error(error)}
          />
        </CardBody>
      </Card>

      <Card className="w-full max-w-md shadow-none border">
        <CardHeader>
          <h2 className="text-xl font-semibold">Результат сканирования</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="text-gray-600">{data}</p>
        </CardBody>
      </Card>
    </div>
  );
};

