import { Card, CardHeader, CardBody, Divider } from '@heroui/react'
import { useState } from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'
import { ScanQrCode } from 'lucide-react'

import { Title } from '@/shared/ui/title'

export const ScannerPage = () => {
  const [scannedData, setScannedData] = useState([])
  const [hasRedirected, setHasRedirected] = useState(false)

  const handleScan = (results) => {
    if (results && Array.isArray(results)) {
      const filteredResults = results.map((result) => ({
        format: result.format,
        value: result.rawValue,
        coordinates: result.boundingBox,
      }))

      setScannedData(filteredResults)

      const first = filteredResults[0]?.value
      if (first && !hasRedirected && isValidUrl(first)) {
        setHasRedirected(true)
        window.location.href = first
      }
    }
  }

  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch (_) {
      return false
    }
  }

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <Card className="w-full max-w-md">
        <CardBody>
          <Title Icon={ScanQrCode} title="Сканер" />
          <Scanner
            onError={(error) => console.error(error)}
            onScan={handleScan}
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
                <strong>Координаты:</strong> X: {data.coordinates.x}, Y:{' '}
                {data.coordinates.y}, Width: {data.coordinates.width}, Height:{' '}
                {data.coordinates.height}
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
  )
}
