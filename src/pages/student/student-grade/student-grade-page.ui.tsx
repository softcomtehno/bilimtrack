import { GradeBookStudent } from '@/widgets/grade-book-student'
import { useParams } from 'react-router-dom'

export const StudentGradePage = () => {
  const { id } = useParams()

  return (
    <div className="pb-10">
      <GradeBookStudent subjectId={id} />
    </div>
  )
}
