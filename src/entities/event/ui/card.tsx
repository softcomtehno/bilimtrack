import { Image } from "@heroui/react";

export function EventCard() {
  return (
    <div className="py-4 shadow-none border flex justify-between p-2 rounded-md">
      <div className=" flex-col items-start shadow-none">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <h4 className="font-bold text-large">Frontend Radio</h4>
        <small className="text-default-500">12 Tracks</small>
      </div>
      <Image
        alt="Card background"
        className="object-cover rounded-xl w-[150px] h-[100px]"
        src="https://heroui.com/images/hero-card-complete.jpeg"
      />
    </div>
  );
}
