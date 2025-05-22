import { userQueries, userTypes } from '@/entities/user';
import { Title } from '@/shared/ui/title';
import { GradeBook } from '@/widgets/grade-book';
import {
  Card,
  CardBody,
  Input,
  Button,
  InputOtp,
  Image,
  CardHeader,
} from '@heroui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export function SubjectPage() {
  return (
    <CardBody>
      <div className="flex items-start gap-[10px]">
        <Image
          alt="Woman listing to music"
          className="object-cover w-full"
          height={150}
          src="https://heroui.com/images/hero-card.jpeg"
          width={150}
        />
        <div>
          <Title title="Основы экономики и менеджмента в IT" />
          <p className="w-[500px]">
            Основы экономики, менеджмента и маркетинга в IT Как разрабатывать
            успешные бизнес-стратегии и продвигать IT-решения на рынке.
          </p>
        </div>
      </div>
      <div className="mt-[20px]  flex gap-[10px] flex-wrap">
        <Link to="/grade">
        <Card className="w-[150px] shadow-none border rounded-md hover:shadow-lg cursor-pointer">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">ПОВТ-1-22</p>
              <p className="text-small text-default-500">22 студента</p>
            </div>
          </CardHeader>
        </Card>
        </Link>
        <Card className="w-[150px] shadow-none border rounded-md hover:shadow-lg cursor-pointer">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">ПОВТ-1-22</p>
              <p className="text-small text-default-500">22 студента</p>
            </div>
          </CardHeader>
        </Card>
        <Card className="w-[150px] shadow-none border rounded-md hover:shadow-lg cursor-pointer">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">ПОВТ-1-22</p>
              <p className="text-small text-default-500">22 студента</p>
            </div>
          </CardHeader>
        </Card>
        <Card className="w-[150px] shadow-none border rounded-md hover:shadow-lg cursor-pointer">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">ПОВТ-1-22</p>
              <p className="text-small text-default-500">22 студента</p>
            </div>
          </CardHeader>
        </Card>
        <Card className="w-[150px] shadow-none border rounded-md hover:shadow-lg cursor-pointer">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">ПОВТ-1-22</p>
              <p className="text-small text-default-500">22 студента</p>
            </div>
          </CardHeader>
        </Card>
      </div>

    </CardBody>
  );
}
