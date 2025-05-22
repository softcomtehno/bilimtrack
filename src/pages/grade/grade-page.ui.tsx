import { userQueries, userTypes } from '@/entities/user';
import { QrCreate } from '@/features/qr-create.ui';
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/react';
import { QrCode } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function GradePage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <CardBody>
      <Title title="Основы экономики и менеджмента в IT" />
            <Button color='primary' onPress={onOpen} endContent={<QrCode/>}>Сгенерировать QR-code</Button>
      <GradeBook />

      <Modal isOpen={isOpen} placement='bottom-center' onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                QR-Code для отметки посещаемости
              </ModalHeader>
              <ModalBody>
                <QrCreate/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Закрыть
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </CardBody>
  );
}
