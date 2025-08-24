import { useParams } from 'react-router-dom'

export const SubjectIDPage = () => {
  const { subjectID } = useParams()
  return <div>Subject Page {subjectID}</div>
}
