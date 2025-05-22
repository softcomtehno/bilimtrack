import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export const QrCreate = () => {
  const [qrValue, setQrValue] = useState<string>("");

  useEffect(() => {
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const slug = pathSegments[pathSegments.length - 1]; // последний сегмент URL
    const fullValue = `check/${slug}`;
    setQrValue(fullValue);
  }, []);

  return (
    <div className="p-4 flex flex-col items-center">
      {qrValue && <QRCode size={320} value={qrValue} />}
    </div>
  );
};
