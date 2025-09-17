import { useQuery } from '@tanstack/react-query'
import { getPerformanceBySubject, getSubjects, getSubjectsMentor } from './subject.api'

const keys = {
  root: () => ['subjects'],
  byMentor: () => [...keys.root(), 'mentor'],
  bySubject: (id: number) => [...keys.root(), "perfomance", id],
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

export function useGetPerformanceBySubject(subjectId: number) {
  return useQuery({
    queryKey: keys.bySubject(subjectId),
    queryFn: () => getPerformanceBySubject(subjectId),
    enabled: !!subjectId, 
  })
}