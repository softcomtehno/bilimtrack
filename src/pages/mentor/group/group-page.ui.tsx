import { GradeBook } from '@/widgets/grade-book';
import { useParams } from 'react-router-dom';

export const GroupPage = () => {
  const { subjectId, groupId } = useParams<{
    subjectId: string;
    groupId: string;
  }>();

  return (
    <div>
      <GradeBook groupId={groupId} subjectId={subjectId} />
    </div>
  );
};
