import { GradeBook } from '@/widgets/grade-book';
import { useParams } from 'react-router-dom';
import ScoreMemo from './ScoreMemo.ui';

export const GroupPage = () => {
  const { subjectId, groupId } = useParams<{
    subjectId: string;
    groupId: string;
  }>();

  return (
    <div>
      <ScoreMemo/>
      <GradeBook groupId={groupId} subjectId={subjectId} />
      
    </div>
  );
};
