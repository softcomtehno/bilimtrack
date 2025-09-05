import { Progress } from '@heroui/react';

export function Loading() {
  return (
    <div className="mx-auto flex flex-col items-center my-3 ">
      <Progress
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
        size="sm"
      />
      <h3 className='mt-1 text-[18px] font-semibold text-gray-800'>Загрузка</h3>
    </div>
  );
}
