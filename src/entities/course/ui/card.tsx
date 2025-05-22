import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from '@heroui/react';
import { ChartArea } from 'lucide-react';

export default function CourseCard() {
  return (
    <Card className="max-w-[350px] shadow-none border rounded-md">
      <CardHeader className="flex gap-3 items-start">
      <ChartArea />
        <div className="flex flex-col">
          <p className="text-md leading-[100%]">Основы экономики, менеджмента и маркетинга в IT</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className='leading-[100%]'>Как разрабатывать успешные бизнес-стратегии и продвигать IT-решения на рынке.</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/heroui-inc/heroui"
        >
        Просмотреть курс
        </Link>
      </CardFooter>
    </Card>
  );
}
