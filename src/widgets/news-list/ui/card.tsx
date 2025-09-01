import { Image } from "@heroui/react";

type Event = {
  id: number;
  title: string;
  photo: string;
  slug: string;
  category: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

interface EventCardProps {
  event: Event;
}

export function NewsCard({ event }: EventCardProps) {
  return (
    <div className="py-4 shadow-none border flex justify-between p-2 rounded-md">
      <div className="flex flex-col items-start shadow-none w-[60%]">
        <p className="text-tiny uppercase font-bold text-primary leading-2">
          {event.category?.name}
        </p>
        <h4 className="font-bold text-large line-clamp-2 leading-[20px]">
          {event.title}
        </h4>
        <a target="_blank" href={`https://comtehno.kg/news/${event.slug}`} className="bg-sky-500 px-6 rounded-md mt-2 text-white py-[3px]">Читать</a>
      </div>
      <Image
        alt={event.title}
        className="object-cover rounded-xl w-[150px] h-[100px]"
        src={event.photo}
      />
    </div>
  );
}
