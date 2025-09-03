import { Image, Button } from '@heroui/react';

interface MakalaboxCardProps {
  id: number;
  title: string;
  photo: string;
}

export function MakalaboxCard({ id, title, photo }: MakalaboxCardProps) {
  const truncatedTitle =
    title.length > 80 ? title.slice(0, 55).trim() + '…' : title;

  return (
    <div className="py-4 shadow-none border flex justify-between p-2 rounded-md">
      <div className="flex-col items-start shadow-none">
        <p className="text-[12px] font-bold mb-2 uppercase leading-[150%]">
          {truncatedTitle}
        </p>
        <a
          target="_blank"
          href={`https://makalabox.com/article/${id}`}
          className="bg-sky-500 px-6 rounded-md mt-2 text-white py-[3px]"
        >
          Читать
        </a>
      </div>
      <Image
        alt="Card background"
        className="object-cover rounded-md min-w-[150px] h-[100px]"
        src={photo}
      />
    </div>
  );
}
