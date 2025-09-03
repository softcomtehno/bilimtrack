import { useNavigate, useParams } from 'react-router-dom'; 
import { Card, CardHeader, Listbox, ListboxItem, Image } from "@heroui/react";
import { BookCopy, NotebookText } from 'lucide-react';

export const ListboxWrapper = ({ children }) => (
  <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export const SubjectIDPage = () => {
  const iconClasses = "text-xl text-default-500 pointer-events-none shrink-0";
  const { subjectID } = useParams();
  const navigate = useNavigate(); 

  const handleClickJournal = () => {
    navigate(`/student/student-grade/${subjectID}/`);
  };

  return (
    <div className="my-2">
      <Card className="w-full shadow-none border mb-3">
        <CardHeader className="flex justify-between items-center">
          <div className="flex gap-3 items-start">
            {/* <Image
              alt="heroui logo"
              height={40}
              radius="full"
              src="/default-avatar.png"
              width={40}
            /> */}
            <div className="flex flex-col">
              <p className="text-md">Backend</p>
              <p className="text-xs text-default-500">Разработка серверной части</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <ListboxWrapper>
        <Listbox variant="faded">
          <ListboxItem
            key="new"
            className="h-[50px]"
            startContent={<BookCopy className={iconClasses} />}
          >
            Темы
          </ListboxItem>

          <ListboxItem
            key="copy"
            className="h-[50px]"
            startContent={<NotebookText className={iconClasses} />}
            onClick={handleClickJournal} 
          >
            Журнал успеваемости
          </ListboxItem>
        </Listbox>
      </ListboxWrapper>
    </div>
  );
};
