import { GradeBook } from '@/widgets/grade-book';
import { useParams, useNavigate } from 'react-router-dom';
import ScoreMemo from './ScoreMemo.ui';
import { Button } from '@heroui/react';
import { ChevronRight, MoveLeft } from 'lucide-react';

export const GroupPage = () => {
  const { subjectId, groupId } = useParams<{
    subjectId: string;
    groupId: string;
  }>();

  const navigate = useNavigate();

  return (
    <div className='p-5'>
      <Button variant='light' onPress={() => navigate(-1)}> 
        <MoveLeft/>
        Назад
        </Button>
      <GradeBook groupId={groupId} subjectId={subjectId} />
      <ScoreMemo />
    </div>
  );
};
