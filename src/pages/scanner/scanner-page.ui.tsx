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
  const [scannedData, setScannedData] = useState([]);

  const handleScan = (results) => {
    if (results && Array.isArray(results)) {
      const filteredResults = results.map((result) => ({
        format: result.format,
        value: result.rawValue,
        coordinates: result.boundingBox,
      }));
      setScannedData(filteredResults);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <Card className="w-full max-w-md">
        <CardBody>
          <Title title="Сканер" Icon={ScanQrCode} />
          <Scanner
            onScan={handleScan}
            onError={(error) => console.error(error)}
          />
        </CardBody>
      </Card>

      {scannedData.length > 0 ? (
        scannedData.map((data, index) => (
          <Card key={index} className="w-full max-w-md">
            <CardHeader>
              <h2 className="text-xl font-semibold">Результат {index + 1}</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <p className="text-gray-600">
                <strong>Формат:</strong> {data.format}
              </p>
              <p className="text-gray-600">
                <strong>Значение:</strong> {data.value}
              </p>
              <p className="text-gray-600">
                <strong>Координаты:</strong> X: {data.coordinates.x}, Y: {data.coordinates.y}, Width: {data.coordinates.width}, Height: {data.coordinates.height}
              </p>
            </CardBody>
          </Card>
        ))
      ) : (
        <Card className="w-full max-w-md">
          <CardBody>
            <p className="text-gray-600">Нет результата</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
