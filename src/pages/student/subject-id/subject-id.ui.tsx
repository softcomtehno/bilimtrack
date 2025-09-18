import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, Tabs, Tab } from '@heroui/react';
import { BookCopy, NotebookText } from 'lucide-react';

export const SubjectIDPage = () => {
  const iconClasses = 'text-xl text-default-500 pointer-events-none shrink-0';
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
            <div className="flex flex-col">
              <p className="text-md">Backend</p>
              <p className="text-xs text-default-500">
                Разработка серверной части
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs
        defaultValue="topics"
        className="w-full flex justify-between"
        orientation="horizontal"
      >
        <Tab
          value="topics"
          className="flex-1 text-center"
          title={
            <div className="flex justify-center items-center gap-2 w-full">
              <BookCopy className={iconClasses} />
              Темы
            </div>
          }
        >
          <div className="p-4">Здесь будет список тем.</div>
        </Tab>

        <Tab
          value="journal"
          className="flex-1 text-center"
          title={
            <div className="flex justify-center items-center gap-2 w-full">
              <NotebookText className={iconClasses} />
              Журнал
            </div>
          }
          onClick={handleClickJournal} // если нужно редиректить
        >
          <div className="p-4">Журнал успеваемости открывается по клику.</div>
        </Tab>
      </Tabs>
    </div>
  );
};
