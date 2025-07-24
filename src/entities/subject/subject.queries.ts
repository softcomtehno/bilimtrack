import { useQuery } from '@tanstack/react-query'
import { getSubjects, getSubjectsMentor } from './subject.api'

const keys = {
  root: () => ['subjects'],
  byMentor: () => [...keys.root(), 'mentor'],
}

export function useGetSubjects() {
  return useQuery({
    queryKey: keys.root(),
    queryFn: getSubjects,
  })
}

export function useGetSubjectsMentor() {
  return useQuery({
    queryKey: keys.byMentor(),
    queryFn: getSubjectsMentor,
  })
}
