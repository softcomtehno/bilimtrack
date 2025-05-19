import { useState } from 'react';
import QRCode from 'react-qr-code';

export const QrCreate = () => {
  const [url, setUrl] = useState<string>('');
  const [showQR, setShowQR] = useState(false);

  const generateQR = () => {
    setUrl(window.location.href);
    setShowQR(true);
  };
  return (
    <div className="p-4">
      <button onClick={generateQR}>Сгенерировать QR</button>
      {showQR && <QRCode value={url} size={320} />}
    </div>
  );
};
